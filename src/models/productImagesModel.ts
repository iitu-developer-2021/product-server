import { DataTypes, Optional, Model } from 'sequelize'
import { sequelize } from '../core/db'

export type ProductImagesAttributes = {
    id: number
    url: string
}

type ProductImagesCreationAttributes = Optional<ProductImagesAttributes, 'id'>

interface ProductImagesInstance
    extends Model<ProductImagesAttributes, ProductImagesCreationAttributes>,
        ProductImagesAttributes {
    createdAt?: Date
    updatedAt?: Date
}

export const ProductImages = sequelize.define<ProductImagesInstance>(
    'ProductImages',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
)
