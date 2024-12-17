'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('products', { 
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    category: {
      type: Sequelize.ENUM('Atacado', 'Varejo'),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
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
      type: Sequelize.DECIMAL(15),
      allowNull: false,
    },
    cost: {
      type: Sequelize.DECIMAL(15),
      allowNull: true,
    },
   });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products'); 
  }
};
