/** @format */

import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";
import Users from "./Users";

class Products extends Model {
  declare id: number;
  declare category: "Atacado" | "Varejo";
  declare name: string;
  declare ean: number;
  declare sku: string | null;
  declare ncm: number | null;
  declare price: string;
  declare cost: string | null;
}

Products.init(
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    category: {
      type: sequelize.ENUM("Atacado", "Varejo"),
      allowNull: false,
    },
    name: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    ean: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    sku: {
      type: sequelize.STRING(40),
      allowNull: true,
    },
    ncm: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
    price: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    cost: {
      type: sequelize.STRING(50),
      allowNull: true,
    },
    userId: {
      type: sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "products",
    timestamps: false,
  }
);

Products.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

export default Products;
