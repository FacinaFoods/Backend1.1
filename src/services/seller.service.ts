import { ModelStatic } from "sequelize";
import Sellers from "../database/models/Sellers";
import { BodyLogin, NewSeller } from "../utils/seller.model";
import md5 from "md5";
import { resp, respMsg } from "../helpers/resp";
import { sign } from "../jwt/jwt";
import schema from "./validations/schema";


export default class SellerService {
    private model: ModelStatic<Sellers> = Sellers

    async getAllSellers() {
        const sellers = await this.model.findAll()
        return resp(200, sellers)
    }

    async login(body: BodyLogin){
        const hashPass = md5(body.password)

        const user = await this.model.findOne({where: {
            email: body.email,
            password: hashPass
        }})

        if(!user) return respMsg(404, "Email or password invalid!")

        const { id, name, level, email } = user
        const token = sign({ id, name, email, level })
        return resp(200, { id, name, email, level, token })
    }

    async createSeller(seller: NewSeller) {
        try {
            const { error } = schema.seller.validate(seller)
            if (error) {
                return respMsg(422, error.message)
            }
            const hashPass = md5(seller.password);
            const createdSeller = await this.model.create({ ...seller, password: hashPass });
    
            return resp(201, createdSeller);
        } catch (error) {
            // if (error instanceof UniqueConstraintError) {
                return respMsg(409, "This email is already associated with another account.");
            // }
        }
    }
}

