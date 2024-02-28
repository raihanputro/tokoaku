'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      review.belongsTo(models.user, {
        as: 'user',
        foreignKey: 'user_id',
      });
      review.belongsTo(models.transaction, {
        as: 'transaction',
        foreignKey: 'transaction_id',
      });
      review.belongsTo(models.item, {
        as: 'item',
        foreignKey: 'item_id',
      });
    }
  }
  review.init({
    user_id: DataTypes.INTEGER,
    transaction_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};