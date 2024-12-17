'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('adresses', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      city: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      uf: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      street: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      number: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING(12),
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) { 
    await queryInterface.dropTable('adresses');
  }
};
