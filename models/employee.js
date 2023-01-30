'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Shop }) {
      // define association here
      this.hasOne(Shop, { foreignKey: 'ownerId' })
      this.hasMany(Order, { foreignKey: 'deliveryId' })
    }
  }
  Employee.init({
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: 'email cannot be null' },
        notEmpty: { msg: 'email cannot be empty' },
        isEmail: { msg: 'email is in the correct format' },
        async isUnique(value) {
          const user = await Employee.findOne(
            { where: { email: value } }
          )
          if (user !== null && user.id !== this.id) {
            throw new Error('Email is not unique.')
          }
        }
      }
    },
    tel: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'MANAGER', 'DELIVERY'),
      allowNull: false,
      defaultValue: 'DELIVERY'
    },
    username: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employee',
    deletedAt: false
  })

  return Employee;
};