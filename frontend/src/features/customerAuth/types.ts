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

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
}
