import { ModelStatic, Op } from "sequelize";
import Clients from "../database/models/Clients";
import { NewClient } from "../utils/client.model";
import { resp, respMsg } from "../helpers/resp";
import schema from "./validations/schema";

export default class ClientService {
  private model: ModelStatic<Clients> = Clients;

  async getAllClients() {
    const clients = await this.model.findAll();
    return resp(200, clients);
  }

  async getClientById(id: number) {
    const client = await this.model.findByPk(id);

    if (!client) {
      return respMsg(404, "Client not found");
    }

    return resp(200, client);
  }

  async createClient(clientData: NewClient) {
    const { error } = schema.client.validate(clientData);
    if (error) {
      return respMsg(422, error.message);
    }

    const clientExists = await this.model.findOne({
      where: {
        [Op.or]: [
          { cpfCnpj: clientData.cpfCnpj },
          { email: clientData.email }
        ],
      },
    });
  
    if (clientExists) {
      const conflictField = clientExists.cpfCnpj === clientData.cpfCnpj ? "CPF/CNPJ" : "email";
      return respMsg(409, `This ${conflictField} is already registered in other client`);
    }

    const createdClient = await this.model.create({ ...clientData });
    return resp(201, createdClient);
  }

  async updateClient(id: number, clientData: Partial<NewClient>) {
    const client = await this.model.findByPk(id);

    if (!client) {
      return respMsg(404, "Client not found");
    }

    await client.update(clientData);
    return resp(200, client);
  }

  async deleteClient(id: number) {
    const client = await this.model.findByPk(id);

    if (!client) {
      return respMsg(404, "Client not found");
    }

    await client.destroy();
    return respMsg(200, "Client deleted successfully");
  }
}
