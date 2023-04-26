"use strict";

const { Model, INTEGER, STRING } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class seats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ vehicle, tickets }) {
      // define association here
      this.belongsTo(vehicle, { foreignKey: "vehicle_id", as: "infSeats" });
    }
  }
  seats.init({
    name: { type: STRING, allowNull: false },
    vehicle_id: { type: INTEGER, allowNull: false },
    status: { type: INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: "seats",
    timestamps: true,
    deletedAt: true
  });
  return seats;
};