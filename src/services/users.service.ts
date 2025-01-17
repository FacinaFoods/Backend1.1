import { ModelStatic } from "sequelize";
import Sellers from "../database/models/Users";
import { BodyLogin, NewUser } from "../utils/user.model";
import md5 from "md5";
import { resp, respMsg } from "../helpers/resp";
import { sign } from "../jwt/jwt";
import schema from "./validations/schema";
import { password } from "../database/config/database";


export default class UserService {
    private model: ModelStatic<Sellers> = Sellers

    async getAllUsers() {
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
        const token = sign({ name, email, level })
        return resp(200, { id, name, email, level, token })
    }

    async createUser(user: NewUser) {
        try {
            const hashPass = md5(user.password)
            const { error } = schema.user.validate(user)
            if (error) {
                return respMsg(422, error.message)
            }
            const createdUser = await this.model.create({ ...user, password: hashPass});

            const { id, name, level, email } = createdUser
    
            return resp(201, { id, name, level, email });
        } catch (error) {
            // if (error instanceof UniqueConstraintError) {
                return respMsg(409, "This email is already associated with another account.");
            // }
        }
    }
}

