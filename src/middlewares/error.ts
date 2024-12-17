import { NextFunction, Request, Response } from "express"


export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
    console.log(err)
    return res.status(500).json({ message: "Caiu no Middleware de erro global" });
} 