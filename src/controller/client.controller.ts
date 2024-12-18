import { NextFunction, Request, Response } from "express";
import ClientService from "../services/clients.service";

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
      const { status, message } = await this.service.createClient(req.body);
      res.status(status).json(message);
    } catch (err) {
      next(err);
    }
  }


  async updateClient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, message } = await this.service.updateClient(
        Number(id),
        req.body
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
