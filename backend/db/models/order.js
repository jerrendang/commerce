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
    static associate(models) {
      // define association here
      Order.belongsTo(
        models.User,
        {
          foreignKey: 'buyer_id',
          onDelete: "CASCADE"
        }
      )
    }
  }
  Order.init({
    buyer_id: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    seller_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};