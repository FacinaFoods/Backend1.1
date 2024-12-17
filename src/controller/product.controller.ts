import { NextFunction, Request, Response } from "express";
import ProductService from "../services/products.service";


export default class ProductController {
  private service = new ProductService();

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllProducts();
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.getProductById(Number(id));
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.createProduct(req.body);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const productData = { id: Number(id), ...req.body };
      const { status, message } = await this.service.updateProduct(productData);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.deleteProduct(Number(id));
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }
}
