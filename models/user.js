'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstname: DataTypes.STRING,
    userid: DataTypes.STRING,
    point: DataTypes.INTEGER,
    chatid: DataTypes.STRING,
    lastqid: DataTypes.INTEGER,
    intlastqid: DataTypes.INTEGER,
    advlastqid: DataTypes.INTEGER,
    lastpaydate: DataTypes.DATE,
    mode:DataTypes.STRING,
    category:DataTypes.STRING,
    paymentaccount:DataTypes.STRING,
    trialpoint: DataTypes.INTEGER,
    paymentid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};