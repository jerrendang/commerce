'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sold: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      in_cart: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      sell_date: {
        type: Sequelize.DATE
      },
      photo_key: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      popularity_score: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      category: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  }
};