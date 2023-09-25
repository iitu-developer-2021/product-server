import { Request, Response } from 'express'
import { Sells as SellsModel } from '../models/sells'
import type { SellAttributes } from '../models/sells'
import { Products as ProductModel } from '../models/productsModel'

export const createSell = async (req: Request, res: Response) => {
    try {
        const sellProduct = req.body as Omit<SellAttributes, 'id'> & {
            clienSellsId: number
            productId: number | null
        }

        const createdSellProduct = await SellsModel.create(sellProduct)

        if (sellProduct.productId) {
            const foundProduct = await ProductModel.findOne({
                where: {
                    id: sellProduct.productId,
                },
            })

            if (foundProduct) {
                const count = +foundProduct.count
                foundProduct.count =
                    +count - +sellProduct.count >= 0
                        ? +count - +sellProduct.count
                        : 0

                await foundProduct.save()
            }
        }

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                sell: {
                    id: createdSellProduct.id,
                    ...sellProduct,
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
