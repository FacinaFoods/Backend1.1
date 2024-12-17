'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('clients', 'email', {
      type: Sequelize.STRING(30),
      unique: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('clients', 'email', {
      type: Sequelize.STRING(30),
      unique: true,
    });
  }
};
