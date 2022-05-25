'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Responses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.STRING
      },
      response: {
        type: Sequelize.STRING
      },
      chatid: {
        type: Sequelize.STRING
      },
      responsetype: {
        type: Sequelize.STRING
      },
      isanswer: {
        type: Sequelize.BOOLEAN
      },
      date: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      firstname: {
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
    await queryInterface.dropTable('Responses');
  }
};