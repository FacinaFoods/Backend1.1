import { Router } from "express";
import SellerController from "../controller/seller.controller";


const sellerCtrl = new SellerController();

const sellerRouter = Router()

sellerRouter.get('/sellers', sellerCtrl.getAllSellers.bind(sellerCtrl))

sellerRouter.post('/login', sellerCtrl.login.bind(sellerCtrl))

sellerRouter.post('/seller', sellerCtrl.create.bind(sellerCtrl))

export default sellerRouter