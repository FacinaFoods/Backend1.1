import { ModelStatic, Transaction } from "sequelize";
import Sales from "../database/models/Sales";
import ProductSale from "../database/models/ProductSale";
import Products from "../database/models/Products";
import Clients from "../database/models/Clients";
import { resp, respMsg } from "../helpers/resp";
import db from "../database/models";
import schema from "../services/validations/schema";
import { SaleData, UpdateSale } from "../utils/sale.model";
import Users from "../database/models/Users";

export default class SalesService {
  private model: ModelStatic<Sales> = Sales;

  async getAllSales() {
    const sales = await this.model.findAll({
      include: [
        { model: Clients, as: "client" },
        { model: Users, as: "user" },
        { model: Products, as: "poductsss", through: { attributes: ["quantity"] } },
      ],
    });
    return resp(200, sales);
  }

  async getSaleById(id: number) {
    const sale = await this.model.findByPk(id, {
      include: [{ all: true }],
    });
    if (!sale) return respMsg(404, "Sale not found");
    return resp(200, sale);
  }

  async createSale(saleData: SaleData) {

    const transaction: Transaction = await db.transaction();
    try {
      const { clientId, userId, payment, commission, saleDate, totalValue, products } = saleData;

      console.log(saleData)

      const sale = await this.model.create(
        { clientId, userId, payment, commission, saleDate, totalValue },
        { transaction }
      );
      
      const productSalesData = products.map((product: any) => ({
        saleId: sale.id,
        productId: product.productId,
        quantity: product.quantity,
      }));
      
      console.log(productSalesData);
      
      await ProductSale.bulkCreate(productSalesData, { transaction });

      await transaction.commit();
      return resp(201, { sale, products: productSalesData });
    } catch (err) {
      await transaction.rollback();
      return respMsg(500, "Error while creating sale");
    }
  }

  async updateSale(id: number, updatedData: UpdateSale) {
    const { error } = schema.partialSale.validate(updatedData);
    if (error) {
      return respMsg(422, error.message);
    }
  
    const sale = await this.model.findByPk(id);
    if (!sale) {
      return respMsg(404, "Sale not found");
    }
  
    await sale.update({ ...updatedData });
  
    return resp(200, sale);
  }
}
