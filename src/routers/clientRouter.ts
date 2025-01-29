import { Router } from "express";
import ClientController from "../controller/client.controller";
import { authenticateToken } from "../middlewares/users.middleware";

const clientCtrl = new ClientController()

const clientRouter = Router()

clientRouter.get('/clients', authenticateToken, clientCtrl.getAllClients.bind(clientCtrl))
clientRouter.post('/client', authenticateToken, clientCtrl.createClient.bind(clientCtrl))
clientRouter.get('/client/:id', authenticateToken, clientCtrl.getClientById.bind(clientCtrl));
clientRouter.put('/client/:id', authenticateToken, clientCtrl.updateClient.bind(clientCtrl));
clientRouter.delete('/client/:id', authenticateToken, clientCtrl.deleteClient.bind(clientCtrl));

export default clientRouter