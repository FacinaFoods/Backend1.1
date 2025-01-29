export interface SaleProduct {
  productId: number;
  quantity: number;
}

export interface SaleData {
  clientId: number;
  userId: number;
  payment?: string;
  commission?: string;
  saleDate?: Date;
  totalValue: string;
  products: SaleProduct[];
}

export interface UpdateSale {
  clientId?: number;
  payment?: string;
  userId?: number;
  commission?: string;
  saleDate?: Date;
  totalValue?: string;
}
