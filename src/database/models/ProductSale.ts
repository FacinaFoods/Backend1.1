import { Model } from "sequelize";
import db from '.';
import sequelize from "sequelize";
import Products from "./Products";
import Sales from "./Sales";

class ProductSale extends Model {
    declare id: number;
    declare productId: number;
    declare saleId: number;
    declare quantity: number;
}

ProductSale.init({
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    productId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    saleId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'sales',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    quantity: {
        type: sequelize.SMALLINT,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize: db,
    tableName: 'product_sale',
    timestamps: false,
    underscored: true,
});

Products.belongsToMany(Sales, {
    foreignKey: 'productId',
    otherKey: 'saleId',
    as: 'salessss',
    through: ProductSale
})

Sales.belongsToMany(Products, {
    foreignKey: 'saleId',
    otherKey: 'productId',
    as: 'poductsss',
    through: ProductSale
})

export default ProductSale;
