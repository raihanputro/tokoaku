'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsTo(models.transaction, {
        as: 'transaction',
        foreignKey: 'transaction_id'
      });
      order.belongsTo(models.item, {
        as: 'item',
        foreignKey: 'item_id'
      })
    }
  }
  order.init({
    transaction_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    item_name: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};