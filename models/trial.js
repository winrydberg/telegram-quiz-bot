'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trial.init({
    question: DataTypes.STRING,
    ansa: DataTypes.STRING,
    ansb: DataTypes.STRING,
    ansc: DataTypes.STRING,
    ansd: DataTypes.STRING,
    cans: DataTypes.STRING,
    capoint: DataTypes.INTEGER,
    wapoint: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trial',
  });
  return Trial;
};