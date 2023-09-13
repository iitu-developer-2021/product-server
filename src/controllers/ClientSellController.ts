import { Request, Response } from 'express'
import { ClientSells as ClientSellsModel } from '../models/clientSells'

export const createClientSell = async (req: Request, res: Response) => {
    try {
        const { name } = req.body as { name: string }
        const clientSell = await ClientSellsModel.create({
            name,
        })

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                type: {
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
