import { DataTypes, Optional, Model } from 'sequelize'
import { sequelize } from '../core/db'
import { Types as TypesModel } from './typesModel'
import { ProductImages as ProductImagesModel } from './productImagesModel'

export type ProductAttributes = {
    id: number
    name: string
    wholesalePrice: string
    retailPrice: string
    price: string
    isWeightProduct: boolean
    typesId?: number
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

ProductImagesModel.hasMany(Products, {
    foreignKey: {
        name: 'productsId',
    },
})

Products.belongsTo(ProductImagesModel, {
    foreignKey: {
        name: 'productsId',
    },
})
