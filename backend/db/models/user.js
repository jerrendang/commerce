'use strict';
const bcrypt = require('bcryptjs');

const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject = () => {
      const { id, username, email, first_name, last_name, createdAt, updatedAt } = this;
      return { id, username, email, first_name, last_name, createdAt, updatedAt };
    }

    validatePassword = (password) => {
      return bcrypt.compareSync(password, this.hashedPassword.toString())
    }

    static getCurrentUserById = async (id) => {
      return await User.scope('currentUser').findByPk(id);
    }

    static login = async (credential, password) => {
      // verify password and username/credential
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      })

      if (user && user.validatePassword(password)){
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static signup = async (username, email, password) => {
      const hashedPassword = bcrypt.hashSync(password);
      const newUser = await User.create({
        username,
        email,
        hashedPassword
      })

      return await User.scope('currentUser').findByPk(newUser.id);
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(
        models.Item,
        {
          foreignKey: 'user_id',
          onDelete: 'CASCADE'
        }
      ),
      User.hasMany(
        models.PaymentMethod,
        {
          foreignKey: 'user_id',
          onDelete: 'CASCADE'
        }
      ),
      User.hasMany(
        models.Order,
        {
          foreignKey: 'buyer_id',
          onDelete: 'CASCADE'
        }
      )
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Username cannot be an email address.');
          }
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      unique: true,
      validate: {
        isEmail(value){
          if (!Validator.isEmail(value)){
            throw new Error('Invalid email.')
          }
        }
      }
    },
    hashedPassword: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    first_time: DataTypes.BOOLEAN,
    stripe_verified: DataTypes.BOOLEAN,
    stripe_account_id: DataTypes.STRING,
    user_photo: DataTypes.BLOB('long'),
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'createdAt', 'updatedAt', 'user_photo']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword', 'user_photo']
        }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};