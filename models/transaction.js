'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    name: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    type: DataTypes.STRING,
    note: DataTypes.STRING,
    trancDate:DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};