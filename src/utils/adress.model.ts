export interface NewAddress {
  city: string;
  uf: string | null;
  street: string;
  number: number;
  cep: string;
  clientsId: number;
}
