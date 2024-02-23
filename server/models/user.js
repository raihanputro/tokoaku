'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.item, {
        as: 'item',
        foreignKey: 'author_id'
      });
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
    province_id: DataTypes.STRING,
    city_id: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    photo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};