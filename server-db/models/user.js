'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: 'authorId' })
      // User.belongsToMany(models.Category, { through: models.Post, foreignKey: 'authorId', otherKey: 'categoryId' })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email existed"
      },
      validate: {
        notNull: {
          msg: 'Kindly insert your email'
        },
        notEmpty: {
          msg: 'Kindly insert your email'
        },
        isEmail: {
          msg: "Format email tidak valid!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Kindly insert your password'
        },
        notEmpty: {
          msg: 'Kindly insert your password'
        },
        len: {
          args: [5],
          msg: "Password too short!"
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  })
  return User;
};