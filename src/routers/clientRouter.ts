import { Router } from "express";
import ClientController from "../controller/client.controller";

const clientCtrl = new ClientController()

const clientRouter = Router()

clientRouter.get('/clients', clientCtrl.getAllClients.bind(clientCtrl))
clientRouter.post('/client', clientCtrl.createClient.bind(clientCtrl))
clientRouter.get('/client/:id', clientCtrl.getClientById.bind(clientCtrl));
clientRouter.put('/client/:id', clientCtrl.updateClient.bind(clientCtrl));
clientRouter.delete('/client/:id', clientCtrl.deleteClient.bind(clientCtrl));

export default clientRouter