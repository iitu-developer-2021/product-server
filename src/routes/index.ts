import express from 'express'
import * as UserController from '../controllers/UsersController'
import * as TypeController from '../controllers/TypeController'
import * as ProductImagesController from '../controllers/ProductImageController'
import * as ClientSellController from '../controllers/ClientSellController'
import * as ProductController from '../controllers/ProductController'
import * as SellController from '../controllers/SellController'
import { verifyToken } from '../middlewares/auth'

const router = express.Router()

router.get('/test', (req, res) => {
    res.json({
        msg: 'Test',
    })
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.post('/types', verifyToken, TypeController.createType)
router.get('/types', verifyToken, TypeController.getAllTypes)
router.put('/types', verifyToken, TypeController.editType)
router.delete('/types/:id', verifyToken, TypeController.deleteType)

router.post(
    '/productImages',
    verifyToken,
    ProductImagesController.createProductImage
)
router.get(
    '/productImages',
    verifyToken,
    ProductImagesController.getAllProductImagesById
)

router.post('/clientSells', verifyToken, ClientSellController.createClientSell)
router.get('/clientSells', verifyToken, ClientSellController.getClientSells)
router.delete(
    '/clientSells/:id',
    verifyToken,
    ClientSellController.deleteClientSell
)

router.post('/products', verifyToken, ProductController.createProduct)
router.get('/products', verifyToken, ProductController.getAllProducts)
router.delete('/products/:id', verifyToken, ProductController.deleteProduct)
router.post('/products-init', ProductController.initProducts)

router.post('/sells', verifyToken, SellController.createSell)

export default router
