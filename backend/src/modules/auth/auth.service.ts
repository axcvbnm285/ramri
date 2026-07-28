import { AuthRepository } from "./auth.repository";
import { SignupDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto } from "./auth.types";
import { hashPassword, comparePassword } from "@/utils/password";
import { sendMail } from "@/utils/mailer";
import { createResetToken, hashResetToken } from "@/utils/resetToken";
import { sendPasswordResetEmail, sendPasswordChangedEmail } from "@/utils/passwordEmails";

export class AuthService {
  private repository = new AuthRepository();

 async signup(data: SignupDto) {
  const existing = await this.repository.findUserByEmail(data.email);

  if (existing) {
    throw new Error("Email already exists.");
  }

  const hashedPassword = await hashPassword(data.password);

  const result = await this.repository.createOwnerWithStore(
    data,
    hashedPassword
  );

  const { password, resetToken, resetTokenExpiresAt, ...safeUser } = result.user;

  // Fire-and-forget — never let a slow/stuck SMTP connection hang signup.
  sendMail({
    to: process.env.PLATFORM_ADMIN_EMAIL!,
    subject: "New store signup needs approval — SandroNepal",
    html: `<p><strong>${result.store.name}</strong> (${result.user.email}) just signed up and needs approval.</p><p>Review it at <a href="${process.env.CLIENT_URL}/platform/dashboard">/platform/dashboard</a>.</p>`,
  }).catch((error) => {
    console.error("Failed to send store-approval email:", error);
  });

  return {
    user: safeUser,
    store: result.store,
  };
}

  async login(data: LoginDto) {
  const user = await this.repository.findUserWithStore(data.email);

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const valid = await comparePassword(
    data.password,
    user.password
  );

  if (!valid) {
    throw new Error("Invalid email or password.");
  }

  if (!user.store.isActive) {
    throw new Error("This store has been deactivated.");
  }

  if (user.store.status === "PENDING") {
    throw new Error("Your store is awaiting approval. We'll notify you once it's reviewed.");
  }

  if (user.store.status === "REJECTED") {
    throw new Error("Your store application wasn't approved. Contact support.");
  }

  const { password, resetToken, resetTokenExpiresAt, ...safeUser } = user;

  return safeUser;
}

  async forgotPassword(data: ForgotPasswordDto) {
    const user = await this.repository.findUserByEmail(data.email);

    if (user) {
      const { token, hashedToken, expiresAt } = createResetToken();
      await this.repository.setResetToken(user.id, hashedToken, expiresAt);

      sendPasswordResetEmail({
        to: user.email,
        name: user.name,
        resetUrl: `${process.env.CLIENT_URL}/reset-password?token=${token}`,
      }).catch((error) => {
        console.error("Failed to send password-reset email:", error);
      });
    }

    return { message: "If that email is registered, we've sent a password reset link." };
  }

  async resetPassword(data: ResetPasswordDto) {
    const hashedToken = hashResetToken(data.token);
    const user = await this.repository.findByResetToken(hashedToken);

    if (!user) {
      throw new Error("This reset link is invalid or has expired.");
    }

    const hashedPassword = await hashPassword(data.newPassword);
    await this.repository.updatePassword(user.id, hashedPassword);

    sendPasswordChangedEmail({
      to: user.email,
      name: user.name,
      loginUrl: `${process.env.CLIENT_URL}/login`,
    }).catch((error) => {
      console.error("Failed to send password-changed email:", error);
    });

    return { message: "Password reset successfully." };
  }

  async changePassword(userId: string, data: ChangePasswordDto) {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    const valid = await comparePassword(data.currentPassword, user.password);

    if (!valid) {
      throw new Error("Current password is incorrect.");
    }

    const hashedPassword = await hashPassword(data.newPassword);
    await this.repository.updatePassword(user.id, hashedPassword);

    sendPasswordChangedEmail({
      to: user.email,
      name: user.name,
      loginUrl: `${process.env.CLIENT_URL}/login`,
    }).catch((error) => {
      console.error("Failed to send password-changed email:", error);
    });

    return { message: "Password changed successfully." };
  }
}
