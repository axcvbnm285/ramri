export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto {
  ownerName: string;
  email: string;
  password: string;
  storeName: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}