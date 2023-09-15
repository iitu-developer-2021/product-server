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

export const editType = async (req: Request, res: Response) => {
    try {
        const { typeId, name } = req.body as { typeId: string; name: string }

        const type = await TypesModel.findOne({
            where: {
                id: typeId,
            },
        })

        if (!type) {
            return res.status(404).json({
                message: 'Нет типа с таким id',
                status: 'error',
                result: null,
            })
        }

        type.name = name

        const upadateResponse = await type.save()

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                type: upadateResponse,
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

export const deleteType = async (req: Request, res: Response) => {
    try {
        const typeId = req.params.id

        const type = await TypesModel.destroy({
            where: {
                id: typeId,
            },
        })

        res.status(201).json({
            message: 'Тип успешно удален',
            status: 'success',
            result: {
                type: type,
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
