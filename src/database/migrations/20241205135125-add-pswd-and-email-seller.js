'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('sellers', 'email', {
      type: Sequelize.STRING(60),
      allowNull: false,
      unique: true,
    });

    await queryInterface.addColumn('sellers', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('sellers', 'email');
    await queryInterface.removeColumn('sellers', 'password');
  },
};
