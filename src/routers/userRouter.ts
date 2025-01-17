import { Router } from "express";
import UserController from "../controller/user.controller";


const userCtrl = new UserController();

const userRouter = Router()

userRouter.get('/users', userCtrl.getAllSellers.bind(userCtrl))

userRouter.post('/login', userCtrl.login.bind(userCtrl))

userRouter.post('/user', userCtrl.create.bind(userCtrl))

export default userRouter