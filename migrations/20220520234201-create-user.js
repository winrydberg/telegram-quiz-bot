'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      userid: {
        type: Sequelize.STRING
      },
      point: {
        type: Sequelize.INTEGER
      },
      chatid: {
        type: Sequelize.STRING
      },
      lastqid: {
        type: Sequelize.INTEGER
      },
      intlastqid: {
        type: Sequelize.INTEGER
      },
      advlastqid: {
        type: Sequelize.INTEGER
      },
      lastpaydate: {
        type: Sequelize.DATE
      },
      mode: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      paymentaccount: {
        type: Sequelize.STRING
      },
      trialpoint: {
        type: Sequelize.INTEGER
      },
      paymentid: {
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
    await queryInterface.dropTable('Users');
  }
};