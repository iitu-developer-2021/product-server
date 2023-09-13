import express from 'express'
import * as UserController from '../controllers/UsersController'
import * as TypeController from '../controllers/TypeController'
import * as ProductImagesController from '../controllers/ProductImageController'
import * as ClientSellController from '../controllers/ClientSellController'
import * as ProductController from '../controllers/ProductController'
import * as SellController from "../controllers/SellController"

const router = express.Router()

router.get('/test', (req, res) => {
    res.json({
        msg: 'Test',
    })
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.post('/types', TypeController.createType)
router.get('/types', TypeController.getAllTypes)

router.post('/productImages', ProductImagesController.createProductImage)
router.get('/productImages', ProductImagesController.getAllProductImagesById)

router.post('/clientSell', ClientSellController.createClientSell)

router.post('/products', ProductController.createProduct)
router.get('/products', ProductController.getAllProducts)


router.post('/sells', SellController.createSell)
router.get('/products', SellController.getAllProductSellsByClientSellId)

export default router
