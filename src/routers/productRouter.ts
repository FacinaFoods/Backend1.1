import { Router } from "express";
import ProductController from "../controller/product.controller";
import { authenticateToken } from "../middlewares/users.middleware";

const productCtrl = new ProductController()

const productRouter = Router()

productRouter.get('/products', authenticateToken, productCtrl.getAllProducts.bind(productCtrl))
productRouter.post('/product', authenticateToken, productCtrl.createProduct.bind(productCtrl))
productRouter.patch('/product/:id', authenticateToken, productCtrl.updateProduct.bind(productCtrl))
productRouter.delete('/product/:id', authenticateToken, productCtrl.deleteProduct.bind(productCtrl))

export default productRouter