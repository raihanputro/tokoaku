'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user, {
        as: 'customer',
        foreignKey: 'user_id'
      });
      transaction.hasMany(models.order, {
        as: 'order',
        foreignKey: 'transaction_id'
      });
      transaction.hasMany(models.review, {
        as: 'review',
        foreignKey: 'transaction_id'
      });
    }
  }
  transaction.init({
    user_id: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    service: DataTypes.STRING,
    shippingCost: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING,
    orderAt: DataTypes.DATE,
    expiryAt: DataTypes.DATE,
    snap_token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};