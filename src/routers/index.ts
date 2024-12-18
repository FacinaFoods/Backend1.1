import { Router } from "express";
import sellerRouter from "./sellerRouter";
import productRouter from "./productRouter";
import clientRouter from "./clientRouter";
import addressRouter from "./addressRouter";
import salesRouter from "./saleRouter";


const router = Router()

router.use(sellerRouter)
router.use(productRouter)
router.use(clientRouter)
router.use(addressRouter)
router.use(salesRouter)

export default  router