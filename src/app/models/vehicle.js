"use strict";
const { Model, INET, INTEGER } = require("sequelize");
const seats = require("./seats");
module.exports = (sequelize, DataTypes) => {
  class vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Trips, seats, tickets }) {
      // define association here
      this.belongsTo(Trips, { foreignKey: "trip_id", as: "infVehicle" });
      this.hasMany(seats, { foreignKey: "vehicle_id", as: "infSeats" });
      this.hasMany(tickets, { foreignKey: "vehicle_id" });
    }
  }
  vehicle.init(
    {
      name: DataTypes.STRING,
      trip_id: { type: INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "vehicle",
      timestamps: true,
      deletedAt: true,
    }
  );
  return vehicle;
};
