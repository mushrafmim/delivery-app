'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Order }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'ownerId' })
      this.hasMany(Order, { foreignKey: "hotelId" })
    }
  }
  Shop.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    addressNo: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    street: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    zipCode: {
      type: DataTypes.STRING(15),
    },
    coordinateLong: {
      type: DataTypes.STRING(20),
    },
    coordinateLat: {
      type: DataTypes.STRING(20),
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: 'email cannot be null' },
        notEmpty: { msg: 'email cannot be empty' },
        isEmail: { msg: 'email is in the correct format' }
      }
    },
  }, {
    sequelize,
    modelName: 'Shop',
    tableName: 'shop'
  });
  return Shop;
};