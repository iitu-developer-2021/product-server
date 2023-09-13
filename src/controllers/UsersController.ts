import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from '../config'
import { Request, Response } from 'express'
import { Users as UsersModel } from '../models/usersModel'
import type { UserAttributes } from '../models/usersModel'

export const register = async (req: Request, res: Response) => {
    try {
        const { name, surname, login, password } = req.body as Omit<
            UserAttributes,
            'id'
        >

        if (!(login && password)) {
            return res.status(400).json({
                message:
                    'Запрос завершился ошибкой, логин и пароль обязательные поля',
                status: 'error',
                result: null,
            })
        }

        const oldUser = await UsersModel.findOne({ where: { login } })

        if (oldUser) {
            return res.status(409).json({
                message:
                    'Запрос завершился ошибкой, такой пользователь уже существует',
                status: 'error',
                result: null,
            })
        }

        const encryptedPassword = await bcrypt.hash(password, 10)

        const user = await UsersModel.create({
            name,
            surname,
            login: login.toLowerCase(),
            password: encryptedPassword,
        })

        const token = jwt.sign(
            { id: user.id, login, name, surname },
            config.JWT_SECRET as string
        )

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                token: token,
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

export const login = async (req: Request, res: Response) => {
    try {
        const { login, password } = req.body as {
            login: string
            password: string
        }

        if (!(login && password)) {
            return res.status(400).json({
                message:
                    'Запрос завершился ошибкой, логин и пароль обязательные поля',
                status: 'error',
                result: null,
            })
        }

        const user = await UsersModel.findOne({ where: { login: login } })

        if (user && (await bcrypt.compare(password, user.password as string))) {
            const token = jwt.sign(
                { id: user.id, login, name: user.name, surname: user.surname },
                config.JWT_SECRET as string
            )

            return res.status(200).json({
                message: 'Запрос успешно отработал',
                status: 'success',
                result: {
                    token: token,
                },
            })
        }

        res.status(400).json({
            message: 'Запрос завершился ошибкой, неверные данные',
            status: 'error',
            result: null,
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
