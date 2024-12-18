import { ModelStatic } from "sequelize";
import Adresses from "../database/models/Adresses";
import schema from "./validations/schema";
import { resp, respMsg } from "../helpers/resp";
import { NewAddress } from "../utils/adress.model";
import Clients from "../database/models/Clients";

export default class AddressService {
  private model: ModelStatic<Adresses> = Adresses;

  async getAllAddresses() {
    const addresses = await this.model.findAll({
      include: {
        model: Clients,
        as: 'client',
        attributes: ['id', 'name', 'cpfCnpj', 'phone', 'email'],
      },
    });
    return resp(200, addresses);
  }

  async getAddressById(id: number) {
    const address = await this.model.findByPk(id);
    if (!address) {
      return respMsg(404, "Address not found");
    }
    return resp(200, address);
  }

  async createAddress(addressData: NewAddress) {
    const { error } = schema.address.validate(addressData);
    if (error) {
      return respMsg(422, error.message);
    }

    const createdAddress = await this.model.create({ ...addressData });
    return resp(201, createdAddress);
  }

  async updateAddress(id: number, updatedData: Partial<NewAddress>) {
    const { error } = schema.partialAddress.validate(updatedData);
    if (error) {
      return respMsg(422, error.message);
    }

    const address = await this.model.findByPk(id);
    if (!address) {
      return respMsg(404, "Address not found");
    }

    await address.update({ ...updatedData });
    return resp(200, address);
  }

  async deleteAddress(id: number) {
    const address = await this.model.findByPk(id);
    if (!address) {
      return respMsg(404, "Address not found");
    }

    await address.destroy();
    return respMsg(200, "Address deleted successfully");
  }
}
