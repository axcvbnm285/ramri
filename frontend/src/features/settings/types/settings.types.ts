export interface Store {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  logo?: string | null;
  logoPublicId?: string | null;
  isActive: boolean;
  address?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  whatsapp?: string | null;
  createdAt: string;
}

export interface UpdateStorePayload {
  name?: string;
  logo?: string;
  logoPublicId?: string;
}
