import { Router} from "express";
import multer from 'multer'

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductsController } from "./controllers/products/CreateProductsController";
import { ListByCategoryController } from "./controllers/products/ListByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from './config/multer'

const router = Router()
const upload = multer(uploadConfig.upload("./tmp"))

// Rotas Users
router.post('/users', new CreateUserController().handle) // Criar usuarios.
router.post('/login', new AuthUserController().handle) // Logar usuarios.
router.get('/info', isAuthenticated, new DetailUserController().handle) // Informação dos usuarios.

// Rotas Categorys
router.post('/category', isAuthenticated, new CreateCategoryController().handle) // Criar uma categoria
router.get('/category', isAuthenticated, new ListCategoryController().handle) // Lista categorias

// Rotas Products
router.post('/products', isAuthenticated, upload.single('file'), new CreateProductsController().handle) // Criar produtos
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle) // lista produtos por categorias

// Rotas Order
router.post('/order', isAuthenticated, new CreateOrderController().handle) // Criar uma pedido
router.delete('/order', isAuthenticated, new RemoveOrderController().handle) // Deletar um pedido
router.post('/order/add', isAuthenticated, new AddItemController().handle) // Criar itens de um pedido
router.delete('/order/delete', isAuthenticated, new RemoveItemController().handle) // Remover itens do pedido.
router.put('/order/send', isAuthenticated, new SendOrderController().handle) // Mudar o Status draft do pedido
router.get('/order', isAuthenticated, new ListOrderController().handle) // lista os pedidos com status 'false'
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle) // Lista os detalhes de um pedido
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle) // Mudar o Status status do pedido


export {router}