'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(
        models.User,
        {
          foreignKey: 'user_id',
          onDelete: 'CASCADE'
        }
      )
    }
  }
  Item.init({
    user_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING
    },
    sold: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    sell_date: DataTypes.DATE,
    photo_key: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    popularity_score: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    category: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Item',
    defaultScope:{

    },
    scopes: {
      seller: {

      }      
    }
  });
  return Item;
};