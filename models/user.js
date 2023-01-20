'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Employee, Order, Shop }) {
      // define association here
      this.hasOne(Shop, { foreignKey: "ownerId" })
      this.hasMany(Order, { foreignKey: "deliveryId" })

      this.belongsTo(Employee, { foreignKey: 'empId' })
    }
  }
  User.init({
    empId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('SUPERADMIN', 'ADMIN', 'USER'),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  });
  return User;
};