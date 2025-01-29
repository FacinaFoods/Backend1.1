/** @format */

import { NextFunction, Request, Response } from "express";
import ClientService from "../services/clients.service";
import { UserJwt } from "../utils/user.model";
import schema from "../services/validations/schema";
import { NewClient } from "../utils/client.model";

interface CustomRequest extends Request {
  user: UserJwt;
}

export default class ClientController {
  private service = new ClientService();

  async getAllClients(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAllClients();
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async getClientById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.getClientById(Number(id));
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async createClient(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as CustomRequest).user.id;
      if (!userId) {
        res.status(400).json({ message: "UserId is required" });
        return;
      }
      const user: NewClient = { ...req.body, userId };

      const { error } = schema.client.validate(user);
      if (error) {
        res.status(422).json(error.message);
        return;
      }

      // console.log(user);
      const { status, message } = await this.service.createClient(user);

      res.status(status).json(message);
      return;
    } catch (err) {
      next(err);
    }
  }

  async updateClient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userId = (req as CustomRequest).user.id;

      if (!userId) {
        res.status(400).json({ message: "UserId is required" });
        return;
      }

      const updateUser = { ...req.body, userId }

      const { error } = schema.partialClient.validate(updateUser);
      if (error) {
        res.status(422).json(error.message);
        return;
      }

      const { status, message } = await this.service.updateClient(
        Number(id),
        updateUser
      );
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }

  async deleteClient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.deleteClient(Number(id));
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }
}
