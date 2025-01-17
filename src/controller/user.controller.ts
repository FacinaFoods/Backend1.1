import { NextFunction, Request, Response } from "express";
import SellerService from "../services/users.service";


export default class UserController {
    private service = new SellerService()    

    async getAllSellers(req: Request, res: Response, next: NextFunction){
        try {
            const {status, message} = await this.service.getAllUsers()
            res.status(status).json(message)

        } catch (err) {
            next(err)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {status, message} = await this.service.login(req.body)

            res.status(status).json(message)

        } catch (err) {
            next(err)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.createUser(req.body)
            console.log(req.body)
            
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }
}