import { Router } from "express";
import AddressController from "../controller/address.controller";
import { authenticateToken } from "../middlewares/users.middleware";

const addressRouter = Router();
const addressCtrl = new AddressController();

addressRouter.get("/addresses", authenticateToken, addressCtrl.getAll.bind(addressCtrl));
addressRouter.get("/addresses/:id", authenticateToken, addressCtrl.getById.bind(addressCtrl));
addressRouter.post("/addresses", authenticateToken, addressCtrl.create.bind(addressCtrl));
addressRouter.patch("/addresses/:id", authenticateToken, addressCtrl.update.bind(addressCtrl));
addressRouter.delete("/addresses/:id", authenticateToken, addressCtrl.delete.bind(addressCtrl));

export default addressRouter;
