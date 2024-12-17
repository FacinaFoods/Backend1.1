import { Router } from "express";
import sellerRouter from "./sellerRouter";
import productRouter from "./productRouter";


const router = Router()

router.use(sellerRouter)
router.use(productRouter)

export default  router