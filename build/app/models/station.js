"use strict";

const { Model, STRING } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Trips }) {
      // define association here
      this.hasMany(Trips, { foreignKey: "fromStation", as: "from" });
      this.hasMany(Trips, { foreignKey: "toStation", as: "to" });
    }
  }
  Station.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    province: DataTypes.STRING,
    avatar: DataTypes.STRING,
    slug: { type: STRING, unique: true }
  }, {
    sequelize,
    paranoid: true,
    modelName: "Station",
    timestamps: true,
    deletedAt: true
  });
  return Station;
};