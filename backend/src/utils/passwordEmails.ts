import { sendMail } from "./mailer";
import { renderBrandedEmail } from "./emailTemplates";

export function sendPasswordResetEmail(params: { to: string; name: string; resetUrl: string }) {
  return sendMail({
    to: params.to,
    subject: "Reset your SandroNepal password",
    html: renderBrandedEmail({
      heading: `Hi ${params.name}, reset your password`,
      bodyHtml: `
        <p>We received a request to reset your SandroNepal password. This link expires in 1 hour.</p>
        <p>If you didn't request this, you can safely ignore this email — your password won't change.</p>
      `,
      ctaText: "Reset password",
      ctaUrl: params.resetUrl,
    }),
  });
}

export function sendPasswordChangedEmail(params: { to: string; name: string; loginUrl: string }) {
  return sendMail({
    to: params.to,
    subject: "Your SandroNepal password was changed",
    html: renderBrandedEmail({
      heading: `Hi ${params.name}, your password was changed`,
      bodyHtml: `
        <p>This confirms your SandroNepal password was just changed.</p>
        <p>If this wasn't you, please contact us immediately at sandronepal15@gmail.com.</p>
      `,
      ctaText: "Log in",
      ctaUrl: params.loginUrl,
    }),
  });
}
