'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Response.init({
    userid: DataTypes.STRING,
    response: DataTypes.STRING,
    chatid: DataTypes.STRING,
    responsetype: DataTypes.STRING,
    isanswer: DataTypes.BOOLEAN,
    date: DataTypes.STRING,
    type: DataTypes.STRING,
    firstname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Response',
  });
  return Response;
};