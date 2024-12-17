import { Model } from "sequelize";
import db from '.';
import sequelize from "sequelize";
import Clients from "./Clients";
import Sellers from "./Sellers";

class Sales extends Model {
    declare id: number;
    declare clientId: number;
    declare payment: string | null;
    declare sellerId: number;
    declare commission: string | null;
    declare saleDate: Date;
    declare totalValue: string;
}

Sales.init({
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    clientId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'clients',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    payment: {
        type: sequelize.STRING(20),
        allowNull: true,
    },
    sellerId: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'sellers',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    commission: {
        type: sequelize.STRING(20),
        allowNull: true, 
    },
    saleDate: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
    },
    totalValue: {
        type: sequelize.STRING(20),
        allowNull: false,
    },
}, {
    sequelize: db,
    tableName: 'sales',
    timestamps: false,
    underscored: true,
});

Sales.belongsTo(Clients, {
    foreignKey: 'clientId',
    as: 'client'
})

Sales.belongsTo(Sellers, {
    foreignKey: 'sellerId',
    as: 'seller'
})

export default Sales;
