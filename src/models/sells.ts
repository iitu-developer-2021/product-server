import { DataTypes, Optional, Model } from 'sequelize'
import { sequelize } from '../core/db'
import { ClientSells as ClientSellsModel } from './clientSells'

export type SellAttributes = {
    id: number
    name: string
    sellPrice: string
    productPrice: string
    count: string
    totalPrice: string
    typeName: string
    isWeightProduct: boolean
}

type SellCreationAttributes = Optional<SellAttributes, 'id'>

interface SellInstance
    extends Model<SellAttributes, SellCreationAttributes>,
        SellAttributes {
    createdAt?: Date
    updatedAt?: Date
}

export const Sells = sequelize.define<SellInstance>('sells', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    sellPrice: {
        type: DataTypes.STRING,
    },
    productPrice: {
        type: DataTypes.STRING,
    },
    count: {
        type: DataTypes.STRING,
    },
    totalPrice: {
        type: DataTypes.STRING,
    },
    typeName: {
        type: DataTypes.STRING,
    },
    isWeightProduct: {
        type: DataTypes.BOOLEAN,
    },
})

ClientSellsModel.hasMany(Sells, {
    foreignKey: {
        name: 'clientSellsId',
    },
})
Sells.belongsTo(ClientSellsModel, {
    foreignKey: {
        name: 'clientSellsId',
    },
})
