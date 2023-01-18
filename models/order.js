'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Employee, Shop, User }) {
      // define association here
      this.belongsTo(Employee)
      this.belongsTo(User)
      this.belongsTo(Shop)
    }
  }
  Order.init({
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("PENDING", "SHARED", "CLAIMED", "DECLINED"),
      allowNull: false
    },
    deliveryId: {
      type: DataTypes.INTEGER
    },
    sharerId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'order'
  });

  return Order;
};