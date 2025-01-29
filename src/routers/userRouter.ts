import { Router } from "express";
import UserController from "../controller/user.controller";
import { authenticateToken } from "../middlewares/users.middleware";


const userCtrl = new UserController();

const userRouter = Router()

userRouter.get('/users', authenticateToken, userCtrl.getAllSellers.bind(userCtrl))

userRouter.post('/login', userCtrl.login.bind(userCtrl))

userRouter.post('/user', authenticateToken, userCtrl.create.bind(userCtrl))

export default userRouter