import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { config } from '../config/index'
import type { UserAttributes } from '../models/usersModel'

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authorization = req.headers['authorization']

    if (!authorization) {
        return res.status(403).json({
            message: 'Токен отсутствует',
            status: 'error',
            result: null,
        })
    }

    const token = authorization.split(' ')?.[1]

    if (!token) {
        return res.status(403).json({
            message: 'Токен отсутствует',
            status: 'error',
            result: null,
        })
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET as string)
        //@ts-ignore
        req.user = decoded as UserAttributes
    } catch (err) {
        return res.status(403).json({
            message: 'Невалидный токен',
            status: 'error',
            result: null,
        })
    }
    return next()
}
