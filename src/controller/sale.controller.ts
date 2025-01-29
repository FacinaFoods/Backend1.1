/** @format */

import { NextFunction, Request, Response } from "express";
import SalesService from "../services/sales.service";
import schema from "../services/validations/schema";
import { UserJwt } from "../utils/user.model";
import { SaleData } from "../utils/sale.model";

interface CustomRequest extends Request {
  user: UserJwt;
}

export default class SalesController {
  private service = new SalesService();

  async getAllSales(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllSales();
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async getSaleById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.getSaleById(Number(id));
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async createSale(req: Request, res: Response, next: NextFunction) {
    const userId = (req as CustomRequest).user.id;
    if (!userId) {
      res.status(400).json({ message: "UserId is required" });
      return;
    }

    const saleData: SaleData = {...req.body, userId}

    // console.log(saleData);

    try {
      const { error } = schema.sale.validate(saleData);
      if (error) {
        res.status(422).json(error.message);
        return;
      }

      const { status, message } = await this.service.createSale(saleData);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async updateSale(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.updateSale(
        Number(id),
        req.body
      );
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }
}
