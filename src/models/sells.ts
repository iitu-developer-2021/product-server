import { DataTypes, Optional, Model } from 'sequelize'
import { sequelize } from '../core/db'
import { ClientSells as ClientSellsModel } from './clientSells'

export type SellAttributes = {
    id: number
    name: string
    sellPrice: number
    productPrice: number
    count: number
    typeName: string
    isWeightProduct: boolean
    barcode: string
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
        type: DataTypes.INTEGER,
    },
    productPrice: {
        type: DataTypes.INTEGER,
    },
    count: {
        type: DataTypes.INTEGER,
    },
    typeName: {
        type: DataTypes.STRING,
    },
    isWeightProduct: {
        type: DataTypes.BOOLEAN,
    },
    barcode: {
        type: DataTypes.STRING,
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
