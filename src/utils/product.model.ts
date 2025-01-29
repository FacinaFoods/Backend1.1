/** @format */

export interface ProductView {
  id: number;
  category: "Atacado" | "Varejo";
  name: string;
  sku: string | null;
  ncm: number | null;
  price: string;
  cost: string | null;
  userId: number
}

export interface NewProduct {
  category: "Atacado" | "Varejo";
  name: string;
  sku?: string | null;
  ncm?: number | null;
  price: string;
  cost?: string | null;
  userId: number
}

export interface UpdateProduct {
  id: number;
  category?: "Atacado" | "Varejo";
  name?: string;
  sku?: string | null;
  ncm?: number | null;
  price?: string;
  cost?: string | null;
  userId: number
}
