import { Request, Response } from 'express'
import { Types as TypesModel } from '../models/typesModel'

export const createType = async (req: Request, res: Response) => {
    try {
        const { name } = req.body as { name: string }
        const type = await TypesModel.create({
            name,
        })

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                type: {
                    id: type.id,
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

export const getAllTypes = async (req: Request, res: Response) => {
    try {
        const types = await TypesModel.findAll()

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                types: types,
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
