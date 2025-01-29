export interface NewAddress {
  city: string;
  uf: string | null;
  street: string;
  number: number;
  cep: string;
  clientId: number;
}

export interface UpdateAddress {
  city?: string;
  uf?: string | null;
  street?: string;
  number?: number;
  cep?: string;
  clientId?: number;
}