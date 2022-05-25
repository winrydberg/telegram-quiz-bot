'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.STRING
      },
      ansa: {
        type: Sequelize.STRING
      },
      ansb: {
        type: Sequelize.STRING
      },
      ansc: {
        type: Sequelize.STRING
      },
      ansd: {
        type: Sequelize.STRING
      },
      cans: {
        type: Sequelize.STRING
      },
      capoint: {
        type: Sequelize.INTEGER
      },
      wapoint: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Questions');
  }
};