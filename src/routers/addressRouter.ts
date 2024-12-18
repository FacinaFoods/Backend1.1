import { Router } from "express";
import AddressController from "../controller/address.controller";

const addressRouter = Router();
const addressCtrl = new AddressController();

addressRouter.get("/addresses", addressCtrl.getAll.bind(addressCtrl));
addressRouter.get("/addresses/:id", addressCtrl.getById.bind(addressCtrl));
addressRouter.post("/addresses", addressCtrl.create.bind(addressCtrl));
addressRouter.patch("/addresses/:id", addressCtrl.update.bind(addressCtrl));
addressRouter.delete("/addresses/:id", addressCtrl.delete.bind(addressCtrl));

export default addressRouter;
