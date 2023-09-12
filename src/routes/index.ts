import express from 'express'
import { verifyToken } from '../middlewares/auth'
import * as UserController from '../controllers/user/UsersController'

const router = express.Router()

router.get('/test', (req, res) => {
    res.json({
        msg: 'Test',
    })
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/test', verifyToken, () => {
    console.log('test')
})
export default router
