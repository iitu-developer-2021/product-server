import { Request, Response } from 'express'
import { Products as ProductModel } from '../models/productsModel'
import type { ProductAttributes } from '../models/productsModel'
import { productList } from '../mock/list'

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body as Omit<ProductAttributes, 'id'> & {
            typesId: number
        }

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

export const initProducts = async (req: Request, res: Response) => {
    try {
        const { start, end } = req.body as { start: number; end: number }
        const list = productList.slice(start, end)
        const mappedList = list.map((listItem) => ({
            ...listItem,
            typesId: +listItem.typesId,
            count: 0,
        }))
        const products = await ProductModel.bulkCreate(mappedList)

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                createdProducts: products,
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

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        await ProductModel.destroy({
            where: {
                id: id,
            },
        })

        res.status(201).json({
            message: 'Продукт успешно удален',
            status: 'success',
            result: {
                productId: id,
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

export const editType = async (req: Request, res: Response) => {
    try {
        const {
            id,
            name,
            retailPrice,
            wholesalePrice,
            isWeightProduct,
            price,
            typesId,
        } = req.body as ProductAttributes & {
            typesId: number
        }

        const product = await ProductModel.findOne({
            where: {
                id: id,
            },
        })

        if (!product) {
            return res.status(404).json({
                message: 'Нет продукта с таким id',
                status: 'error',
                result: null,
            })
        }

        product.update({
            id: id + 1000,
            name,
            retailPrice,
            wholesalePrice,
            isWeightProduct,
            price,
            typesId,
        })

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                product: product,
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
