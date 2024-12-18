import { NextFunction, Request, Response } from "express";
import SalesService from "../services/sales.service";

export default class SalesController {

  private service = new SalesService;

  
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
    try {
      const { status, message } = await this.service.createSale(req.body);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async updateSale(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.updateSale(Number(id), req.body);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }
}
