import { DataTypes, Optional, Model } from 'sequelize'
import { sequelize } from '../core/db'

export type UserAttributes = {
    id?: number
    name?: string
    surname?: string
    login?: string
    password?: string
    image?: string
}

type UserCreationAttributes = Optional<
    UserAttributes,
    'id' | 'name' | 'surname' | 'image'
>

interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
        UserAttributes {
    createdAt?: Date
    updatedAt?: Date
}

export const Users = sequelize.define<UserInstance>('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: '',
    },
})
