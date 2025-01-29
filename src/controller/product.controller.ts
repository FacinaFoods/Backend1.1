import { NextFunction, Request, Response } from "express";
import ProductService from "../services/products.service";
import { UserJwt } from "../utils/user.model";
import schema from "../services/validations/schema";
import { NewProduct, UpdateProduct } from "../utils/product.model";

interface CustomRequest extends Request {
  user: UserJwt;
}


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
      const userId = (req as CustomRequest).user.id;
      if (!userId) {
        res.status(400).json({ message: "UserId is required" });
        return;
      }

      const product: NewProduct = { ...req.body, userId };
      
      const { error } = schema.product.validate(product);
      if (error) {
        res.status(422).json(error.message);
        return;
      }

      const { status, message } = await this.service.createProduct(product);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userId = (req as CustomRequest).user.id;
      if (!userId) {
        res.status(400).json({ message: "UserId is required" });
        return;
      }

      const productData: UpdateProduct = { id: Number(id), ...req.body, userId };
      
      const { error } = schema.partialProduct.validate(productData);
      if (error) {
        res.status(422).json(error.message);
        return;
      }

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
