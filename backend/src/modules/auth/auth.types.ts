export interface SignupDto {
  storeName: string;
  ownerName: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface JwtPayload {
  id: string;
}