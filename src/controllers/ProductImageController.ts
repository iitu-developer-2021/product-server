import { Request, Response } from 'express'
import { ProductImages as ProductImagesModel } from '../models/productImagesModel'

export const createProductImage = async (req: Request, res: Response) => {
    try {
        const { url } = req.body as { url: string }
        const productImage = await ProductImagesModel.create({
            url,
        })

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                type: {
                    id: productImage.id,
                    url: url,
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

export const getAllProductImagesById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.body as { productId: string }

        const productImages = await ProductImagesModel.findAll({
            where: {
                id: productId,
            },
        })

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                productImages: productImages,
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
