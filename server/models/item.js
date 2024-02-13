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
      item.belongsTo(models.user, {
        as: 'author',
        foreignKey: 'author_id'
      });
    }
  }
  item.init({
    kategori_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    img: DataTypes.TEXT,
    author_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'item',
  });
  return item;
};