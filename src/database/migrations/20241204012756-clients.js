'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('clients', { 
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
      cpf_cnpj: {
        type: Sequelize.STRING(17),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(14),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: true,
        isEmail: true,
        len: [5, 30]
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('clients');
  }
};
