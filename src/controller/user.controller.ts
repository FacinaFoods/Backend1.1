import { NextFunction, Request, Response } from "express";
import SellerService from "../services/users.service";
import { respMsg } from "../helpers/resp";
import schema from "../services/validations/schema";


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
            const { error } = schema.user.validate(req.body)
            if (error) {
                res.status(422).json( error.message )
                return
            }
            const { status, message } = await this.service.createUser(req.body)
            console.log(req.body)
            
            res.status(status).json(message)
        } catch (error) {
            next(error)
        }
    }
}