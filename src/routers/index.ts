import { Router } from "express";
import productRouter from "./productRouter";
import clientRouter from "./clientRouter";
import addressRouter from "./addressRouter";
import salesRouter from "./saleRouter";
import userRouter from "./userRouter";


const router = Router()

router.use(userRouter)
router.use(productRouter)
router.use(clientRouter)
router.use(addressRouter)
router.use(salesRouter)

export default  router