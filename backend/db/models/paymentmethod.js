'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PaymentMethod.belongsTo(
        models.User,
        {
          foreignKey: 'user_id',
          onDelete: "CASCADE"
        }
      )
    }
  }
  PaymentMethod.init({
    user_id: DataTypes.INTEGER,
    card_number: DataTypes.STRING,
    cvv: DataTypes.INTEGER,
    expiry_year: DataTypes.INTEGER,
    expiry_month: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PaymentMethod',
    defaultScope: {
      attributes: {
        exclude: ['card_number', 'cvv', 'expiry_year', 'expiry_month']
      }
    },
    scopes: {
      verification: {
        attributes: {}
      }
    }
  });
  return PaymentMethod;
};