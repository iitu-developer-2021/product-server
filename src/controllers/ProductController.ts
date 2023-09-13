import { Request, Response } from 'express'
import { Products as ProductModel } from '../models/productsModel'
import type { ProductAttributes } from '../models/productsModel'

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body as Omit<ProductAttributes, 'id'>

        const createdProduct = await ProductModel.create(product)

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                product: {
                    id: createdProduct.id,
                    ...product,
                },
            },
        })
    } catch (err) {
        res.status(500).json({
            message:
                'Запрос завершился неудачно:' +
                (err as { message: string }).message,
            status: 'error',
            result: null,
        })
        console.log(err)
    }
}

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.findAll()

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                products: products,
            },
        })
    } catch (err) {
        res.status(500).json({
            message:
                'Запрос завершился неудачно:' +
                (err as { message: string }).message,
            status: 'error',
            result: null,
        })
        console.log(err)
    }
}
