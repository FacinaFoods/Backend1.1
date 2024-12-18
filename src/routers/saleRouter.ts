import { Router } from "express";
import SalesController from "../controller/sale.controller";

const salesRouter = Router();

const salesCtrl = new SalesController();

salesRouter.get('/sales', salesCtrl.getAllSales.bind(salesCtrl));
salesRouter.get("/sales/:id", salesCtrl.getSaleById.bind(salesCtrl));
salesRouter.post('/sales', salesCtrl.createSale.bind(salesCtrl));
salesRouter.patch("/sales/:id", salesCtrl.updateSale.bind(salesCtrl));

export default salesRouter;
