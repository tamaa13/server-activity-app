'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/hash');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Activity)
      User.hasMany(models.Project)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'Username is required'
        },
        notEmpty: {
          args: true,
          msg: 'Username is required'
        },
        len: {
          args: [3, 15],
          msg: 'Username must be between 3 and 15 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password is required'
        },
        notEmpty: {
          args: true,
          msg: 'Password is required'
        },
        len: {
          args: [8],
          msg: 'Password minimum 8 charackter'
        }
      }
    },
    rate: {
      type: DataTypes.INTEGER,
      defaultValue: 10000,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Rate is required'
        },
        notEmpty: {
          args: true,
          msg: 'Rate is required'
        },
        min: {
          args: 10000,
          msg: 'Rate minimum 10000'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    const hashedPassword = hashPassword(user.password);
    user.password = hashedPassword;
  })
  return User;
};