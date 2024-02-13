'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart.belongsTo(models.user, {
        as: 'customer',
        foreignKey: 'user_id'
      });
      cart.belongsTo(models.item, {
        as: 'item',
        foreignKey: 'item_id'
      });
    }
  }
  cart.init({
    item_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};