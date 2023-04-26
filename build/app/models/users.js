"use strict";

const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ tickets }) {
      // define association here
      this.hasMany(tickets, { foreignKey: "user_id" });
    }
  }
  Users.init({
    userName: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isUnique: function (value, next) {
          Users.findOne({ where: { userName: value } }).then(function (user) {
            // Reject if a different user wants to use the same email
            if (user) {
              return next("Tên đăng nhập đã tồn tại");
            }
            return next();
          }).catch(function (err) {
            return next(err);
          });
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, Infinity],
          msg: "Độ dài mật khẩu không hợp lệ"
        },
        is: {
          args: /^(?=.*[!@#$%^&*])/,
          msg: "Mật khẩu phải có ký tự đặc biệt"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isUnique: function (value, next) {
          Users.findOne({ where: { email: value } }).then(function (user) {
            // Reject if a different user wants to use the same email
            if (user) {
              return next("Email đã tồn tại");
            }
            return next();
          }).catch(function (err) {
            return next(err);
          });
        }
      }
    },
    type: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: "Users",
    timestamps: true,
    deletedAt: true
  });
  return Users;
};