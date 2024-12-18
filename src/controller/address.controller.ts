import { Request, Response, NextFunction } from "express";
import AddressService from "../services/addresses.service";

export default class AddressController {
  private service = new AddressService();

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllAddresses();
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.getAddressById(Number(id));
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.createAddress(req.body);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.updateAddress(Number(id), req.body);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.deleteAddress(Number(id));
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }
}
