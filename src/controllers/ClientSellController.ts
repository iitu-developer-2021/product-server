import { Request, Response } from 'express'
import { ClientSells as ClientSellsModel } from '../models/clientSells'
import { Sells as SellsModel } from '../models/sells'

export const createClientSell = async (req: Request, res: Response) => {
    try {
        const { name, totalPrice } = req.body as {
            name: string
            totalPrice: string
        }
        const clientSell = await ClientSellsModel.create({
            name,
            totalPrice,
        })

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                clientSell: {
                    id: clientSell.id,
                    name: name,
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

export const getClientSells = async (req: Request, res: Response) => {
    try {
        const clientSells = await ClientSellsModel.findAll({
            include: {
                model: SellsModel,
            },
        })

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                clientSells: clientSells,
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
