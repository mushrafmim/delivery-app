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
      this.belongsTo(Employee, { foreignKey: 'deliveryId' })
      this.belongsTo(User, { foreignKey: 'sharerId' })
      this.belongsTo(Shop, { foreignKey: 'hotelId' })
    }
  }
  Order.init({
    hotelId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("PENDING", "SHARED", "CLAIMED", "DECLINED")
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