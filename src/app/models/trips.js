"use strict";
const { Model, STRING } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trips extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Station, vehicle, tickets }) {
      // define association here
      this.belongsTo(Station, { foreignKey: "fromStation", as: "from" });
      this.belongsTo(Station, { foreignKey: "toStation", as: "to" });
      this.hasOne(vehicle, { foreignKey: "trip_id", as: "infVehicle" });
      this.hasMany(tickets, { foreignKey: "trip_id", as: "infTrip" });
    }
  }
  Trips.init(
    {
      fromStation: {
        type: STRING,
        validate: {
          isDifferentToStation(value) {
            if (value === this.toStation) {
              throw new Error("From Station and to Station must different");
            }
          },
        },
      },
      toStation: DataTypes.INTEGER,
      startTime: DataTypes.DATE,
      price: DataTypes.FLOAT,
      avatar: DataTypes.STRING,
      slug: { type: STRING, unique: true },
    },
    {
      sequelize,
      modelName: "Trips",
      timestamps: true,
      paranoid: true,
      deletedAt: true,
    }
  );
  return Trips;
};
