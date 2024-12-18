import { Router } from "express";
import sellerRouter from "./sellerRouter";
import productRouter from "./productRouter";
import clientRouter from "./clientRouter";
import addressRouter from "./addressRouter";


const router = Router()

router.use(sellerRouter)
router.use(productRouter)
router.use(clientRouter)
router.use(addressRouter)

export default  router