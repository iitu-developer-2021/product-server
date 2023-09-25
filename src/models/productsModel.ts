import { DataTypes, Optional, Model } from 'sequelize'
import { sequelize } from '../core/db'
import { Types as TypesModel } from './typesModel'

export type ProductAttributes = {
    id: number
    name: string
    wholesalePrice: number
    retailPrice: number
    price: number
    isWeightProduct: boolean
    typesId?: number
    barcode?: string
    count: number
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id'>

interface ProductInstance
    extends Model<ProductAttributes, ProductCreationAttributes>,
        ProductAttributes {
    createdAt?: Date
    updatedAt?: Date
}

export const Products = sequelize.define<ProductInstance>('products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    barcode: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wholesalePrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    retailPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    isWeightProduct: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})

TypesModel.hasMany(Products, {
    foreignKey: {
        name: 'typesId',
    },
})

Products.belongsTo(TypesModel, {
    foreignKey: {
        name: 'typesId',
    },
})
