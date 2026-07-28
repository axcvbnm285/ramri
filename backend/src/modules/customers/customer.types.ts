export interface CustomerSignupDto {
  name: string;
  phone: string;
  password: string;
  email?: string;
}

export interface CustomerLoginDto {
  phone: string;
  password: string;
}

export interface ForgotPasswordDto {
  phone: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface AddressDto {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}
