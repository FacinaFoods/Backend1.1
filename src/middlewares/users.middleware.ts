/** @format */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserJwt } from "../utils/user.model";
import dotenv from "dotenv";

dotenv.config();

// dotenv.config();

const accessTokenSecret = process.env
  .JWT_SECRET /*|| 'wugfy8wrr32ieuwh'*/ as string;

interface CustomRequest extends Request {
  user?: UserJwt;
}

export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  jwt.verify(token, accessTokenSecret, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    req.user = user;
    next();
  });
};
