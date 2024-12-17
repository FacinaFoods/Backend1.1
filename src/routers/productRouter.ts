import { Router } from "express";
import ProductController from "../controller/product.controller";

const productCtrl = new ProductController()

const productRouter = Router()

productRouter.get('/products', productCtrl.getAllProducts.bind(productCtrl))
productRouter.post('/product', productCtrl.createProduct.bind(productCtrl))

export default productRouter