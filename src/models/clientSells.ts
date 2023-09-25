import { DataTypes, Optional, Model } from 'sequelize'
import { sequelize } from '../core/db'
import type { SellAttributes } from './sells'

export type ClientSellAttributes = {
    id: number
    name: string
    totalPrice: number
}

type ClientSellCreationAttributes = Optional<ClientSellAttributes, 'id'>

interface ClientSellInstance
    extends Model<ClientSellAttributes, ClientSellCreationAttributes>,
        ClientSellAttributes {
    sells?: SellAttributes[]
    createdAt?: Date
    updatedAt?: Date
}

export const ClientSells = sequelize.define<ClientSellInstance>('clientSells', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.INTEGER,
    },
})
