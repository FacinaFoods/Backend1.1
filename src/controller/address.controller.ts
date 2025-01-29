import { UpdateAddress } from './../utils/adress.model';
/** @format */

import { Request, Response, NextFunction } from "express";
import AddressService from "../services/addresses.service";
import schema from "../services/validations/schema";
import { UserJwt } from "../utils/user.model";
import { NewAddress } from "../utils/adress.model";

interface CustomRequest extends Request {
  user: UserJwt;
}

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
      const addressData: NewAddress = { ...req.body };

      const { error } = schema.address.validate(addressData);
      if (error) {
        res.status(422).json(error.message);
        return;
      }
      const { status, message } = await this.service.createAddress(req.body);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const addressData: UpdateAddress = { ...req.body };

      const { error } = schema.partialAddress.validate(addressData);
      if (error) {
        res.status(422).json(error.message);
        return;
      }

      const { status, message } = await this.service.updateAddress(
        Number(id),
        req.body
      );

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
