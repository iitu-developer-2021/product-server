import { DataTypes, Optional, Model } from 'sequelize'
import { sequelize } from '../core/db'

export type ClientSellAttributes = {
    id: number
    name: string
}

type ClientSellCreationAttributes = Optional<ClientSellAttributes, 'id'>

interface ClientSellInstance
    extends Model<ClientSellAttributes, ClientSellCreationAttributes>,
        ClientSellAttributes {
    createdAt?: Date
    updatedAt?: Date
}

export const ClientSells = sequelize.define<ClientSellInstance>('ClientSells', {
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
