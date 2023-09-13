import { DataTypes, Optional, Model } from 'sequelize'
import { sequelize } from '../core/db'

export type TypeAttributes = {
    id: number
    name: string
}

type TypeCreationAttributes = Optional<TypeAttributes, 'id'>

interface TypesInstance
    extends Model<TypeAttributes, TypeCreationAttributes>,
        TypeAttributes {
    createdAt?: Date
    updatedAt?: Date
}

export const Types = sequelize.define<TypesInstance>('Types', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})
