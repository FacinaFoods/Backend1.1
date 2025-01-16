/** @format */

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM("Atacado", "Varejo"),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      ean: {
        type: Sequelize.INTEGER(40),
        allowNull: true,
      },
      sku: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      ncm: {
        type: Sequelize.INTEGER(15),
        allowNull: true,
      },
      price: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      cost: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
