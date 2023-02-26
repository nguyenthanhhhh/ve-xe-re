"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, Trips, vehicle, seats }) {
      // define association here
      this.belongsTo(Trips, { foreignKey: "trip_id", as: "infTrip" });
      this.belongsTo(Users, { foreignKey: "user_id", as: "infUser" });
      this.belongsTo(vehicle, { foreignKey: "vehicle_id", as: "infVehicle" });
    }
  }
  tickets.init(
    {
      trip_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      vehicle_id: DataTypes.INTEGER,
      seat: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tickets",
      timestamps: true,
      deletedAt: true,
    }
  );
  return tickets;
};
