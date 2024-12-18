import { Router } from "express";
import sellerRouter from "./sellerRouter";
import productRouter from "./productRouter";
import clientRouter from "./clientRouter";


const router = Router()

router.use(sellerRouter)
router.use(productRouter)
router.use(clientRouter)

export default  router