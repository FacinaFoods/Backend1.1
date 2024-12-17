'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sellers', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      level: {
        type: Sequelize.STRING(60),
        allowNull: true,
      }
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('sellers');

  }
};
