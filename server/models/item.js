'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      item.belongsTo(models.category, {
        as: 'category',
        foreignKey: 'category_id'
      })
      item.belongsTo(models.user, {
        as: 'author',
        foreignKey: 'author_id'
      });
      item.hasMany(models.review, {
        as: 'review',
        foreignKey: 'item_id'
      });
    }
  }
  item.init({
    category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    sold: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    img: DataTypes.TEXT,
    author_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'item',
  });
  return item;
};