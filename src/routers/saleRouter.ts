import { Router } from "express";
import SalesController from "../controller/sale.controller";
import { authenticateToken } from "../middlewares/users.middleware";

const salesRouter = Router();

const salesCtrl = new SalesController();

salesRouter.get('/sales', authenticateToken, salesCtrl.getAllSales.bind(salesCtrl));
salesRouter.get("/sales/:id", authenticateToken, salesCtrl.getSaleById.bind(salesCtrl));
salesRouter.post('/sales', authenticateToken, salesCtrl.createSale.bind(salesCtrl));
salesRouter.patch("/sales/:id", authenticateToken, salesCtrl.updateSale.bind(salesCtrl));

export default salesRouter;
