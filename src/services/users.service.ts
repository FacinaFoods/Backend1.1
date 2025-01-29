import { ModelStatic } from "sequelize";
import { BodyLogin, NewUser, UserFull } from "../utils/user.model";
import md5 from "md5";
import { resp, respMsg } from "../helpers/resp";
import { sign } from "../jwt/jwt";
import Users from "../database/models/Users";


export default class UserService {
    private model: ModelStatic<Users> = Users

    async getAllUsers() {
        const users = await this.model.findAll()
        const sanitizedUsers = users.map(({ id, name, level, email }) => ({
            id,
            name,
            level,
            email
        }));
        return resp(200, sanitizedUsers)
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

    async createUser(user: NewUser) {
        try {
            const hashPass = md5(user.password)
            
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

