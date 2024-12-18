export interface ClientView {
  id: number;
  name: string;
  cpfCnpj: string;
  phone: string;
  email: string | null;
}

export interface NewClient {
  name: string;
  cpfCnpj: string;
  phone: string;
  email: string | null;
}
