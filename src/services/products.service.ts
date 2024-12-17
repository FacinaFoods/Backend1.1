import { ModelStatic } from "sequelize";
import Products from "../database/models/Products";
import { NewProduct, ProductView, UpdateProduct } from "../utils/product.model";
import { resp, respMsg } from "../helpers/resp";

export default class ProductService {
  private model: ModelStatic<Products> = Products;

  async getAllProducts() {
    const products: ProductView[] = await this.model.findAll();
    return resp(200, products);
  }

  async getProductById(id: number) {
    const product = await this.model.findByPk(id);

    if (!product) return respMsg(404, "Product not found.");

    return resp(200, product);
  }

  async createProduct(product: NewProduct) {
    try {
      const createdProduct = await this.model.create({ ...product });
      return resp(201, createdProduct);
    } catch (error) {
      console.error(error);
      return respMsg(500, "Error creating product.");
    }
  }

  async updateProduct(product: UpdateProduct) {
    try {
      const productToUpdate = await this.model.findByPk(product.id);

      if (!productToUpdate) return respMsg(404, "Product not found.");

      await productToUpdate.update(product);

      return resp(200, productToUpdate);
    } catch (error) {
      console.error(error);
      return respMsg(500, "Error updating product.");
    }
  }

  async deleteProduct(id: number) {
    try {
      const productToDelete = await this.model.findByPk(id);

      if (!productToDelete) return respMsg(404, "Product not found.");

      await productToDelete.destroy();

      return respMsg(200, "Product successfully deleted.");
    } catch (error) {
      console.error(error);
      return respMsg(500, "Error deleting product.");
    }
  }
}
