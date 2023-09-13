import { DataTypes, Optional, Model } from 'sequelize'
import { sequelize } from '../core/db'

export type ProductAttributes = {
    id: number
    imageId?: number
    typeId: number
    name: string
    wholesalePrice: string
    retailPrice: string
    price: string
    isWeightProduct: boolean
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id' | 'imageId'>

interface ProductInstance
    extends Model<ProductAttributes, ProductCreationAttributes>,
        ProductAttributes {
    createdAt?: Date
    updatedAt?: Date
}

export const Products = sequelize.define<ProductInstance>('Products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    imageId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    typeId: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wholesalePrice: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    retailPrice: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isWeightProduct: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})
