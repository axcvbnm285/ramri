import { CustomerRepository } from "./customer.repository";
import {
  CustomerSignupDto,
  CustomerLoginDto,
  AddressDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ChangePasswordDto,
} from "./customer.types";
import { hashPassword, comparePassword } from "@/utils/password";
import { getDefaultStore } from "@/lib/store";
import { createResetToken, hashResetToken } from "@/utils/resetToken";
import { sendPasswordResetEmail, sendPasswordChangedEmail } from "@/utils/passwordEmails";

export class CustomerService {
  private repository = new CustomerRepository();

  async checkPhone(phone: string) {
    const existing = await this.repository.findByPhone(phone);
    return { exists: !!existing };
  }

  async signup(data: CustomerSignupDto) {
    const existing = await this.repository.findByPhone(data.phone);

    if (existing) {
      throw new Error("An account with this phone number already exists.");
    }

    // Customer accounts are platform-wide (not tied to one store), but the
    // column is still required — record whichever store's signup form they
    // used first. Purely informational, not used for auth or scoping.
    const store = await getDefaultStore();
    const hashedPassword = await hashPassword(data.password);

    const customer = await this.repository.create({
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: hashedPassword,
      storeId: store.id,
    });

    const { password, resetToken, resetTokenExpiresAt, ...safeCustomer } = customer;
    return safeCustomer;
  }

  async login(data: CustomerLoginDto) {
    const customer = await this.repository.findByPhone(data.phone);

    if (!customer) {
      throw new Error("Invalid phone number or password.");
    }

    const valid = await comparePassword(data.password, customer.password);

    if (!valid) {
      throw new Error("Invalid phone number or password.");
    }

    const { password, resetToken, resetTokenExpiresAt, ...safeCustomer } = customer;
    return safeCustomer;
  }

  async getAll(storeId: string, query: any) {
    return this.repository.findAll(storeId, {
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 10,
      search: query.search,
    });
  }

  async getDetail(id: string, storeId: string) {
    const customer = await this.repository.findDetail(id, storeId);

    if (!customer) {
      throw new Error("Customer not found.");
    }

    const { password, resetToken, resetTokenExpiresAt, ...safeCustomer } = customer;
    return safeCustomer;
  }

  async listAddresses(customerId: string) {
    return this.repository.listAddresses(customerId);
  }

  async addAddress(customerId: string, data: AddressDto) {
    return this.repository.createAddress(customerId, data);
  }

  async updateAddress(
    addressId: string,
    customerId: string,
    data: Partial<AddressDto>
  ) {
    const existing = await this.repository.findAddress(addressId, customerId);

    if (!existing) {
      throw new Error("Address not found.");
    }

    return this.repository.updateAddress(addressId, customerId, data);
  }

  async deleteAddress(addressId: string, customerId: string) {
    const existing = await this.repository.findAddress(addressId, customerId);

    if (!existing) {
      throw new Error("Address not found.");
    }

    return this.repository.deleteAddress(addressId);
  }

  async forgotPassword(data: ForgotPasswordDto) {
    const customer = await this.repository.findByPhone(data.phone);

    if (customer?.email) {
      const { token, hashedToken, expiresAt } = createResetToken();
      await this.repository.setResetToken(customer.id, hashedToken, expiresAt);

      sendPasswordResetEmail({
        to: customer.email,
        name: customer.name,
        resetUrl: `${process.env.CLIENT_URL}/shop/reset-password?token=${token}`,
      }).catch((error) => {
        console.error("Failed to send password-reset email:", error);
      });
    }

    return {
      message: "If that phone number is registered and has an email on file, we've sent a password reset link.",
    };
  }

  async resetPassword(data: ResetPasswordDto) {
    const hashedToken = hashResetToken(data.token);
    const customer = await this.repository.findByResetToken(hashedToken);

    if (!customer) {
      throw new Error("This reset link is invalid or has expired.");
    }

    const hashedPassword = await hashPassword(data.newPassword);
    await this.repository.updatePassword(customer.id, hashedPassword);

    if (customer.email) {
      sendPasswordChangedEmail({
        to: customer.email,
        name: customer.name,
        loginUrl: `${process.env.CLIENT_URL}/shop/login`,
      }).catch((error) => {
        console.error("Failed to send password-changed email:", error);
      });
    }

    return { message: "Password reset successfully." };
  }

  async changePassword(customerId: string, data: ChangePasswordDto) {
    const customer = await this.repository.findByPk(customerId);

    if (!customer) {
      throw new Error("Customer not found.");
    }

    const valid = await comparePassword(data.currentPassword, customer.password);

    if (!valid) {
      throw new Error("Current password is incorrect.");
    }

    const hashedPassword = await hashPassword(data.newPassword);
    await this.repository.updatePassword(customer.id, hashedPassword);

    if (customer.email) {
      sendPasswordChangedEmail({
        to: customer.email,
        name: customer.name,
        loginUrl: `${process.env.CLIENT_URL}/shop/login`,
      }).catch((error) => {
        console.error("Failed to send password-changed email:", error);
      });
    }

    return { message: "Password changed successfully." };
  }
}
