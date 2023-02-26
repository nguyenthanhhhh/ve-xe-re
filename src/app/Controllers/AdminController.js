const { Station, Trips } = require("../models");
const { Op } = require("sequelize");

class AdminController {
  getListStations(req, res, next) {
    Station.findAll({})
      .then((stationList) => {
        res.render("admin/station-store", {
          stationList: JSON.parse(JSON.stringify(stationList)),
        });
      })
      .catch(next);
  }

  getTrashStations(req, res, next) {
    Station.findAll({
      paranoid: false,
      where: {
        deletedAt: {
          [Op.ne]: null,
        },
      },
    }).then((stationList) => {
      res.render("admin/trashStation", {
        stationList: JSON.parse(JSON.stringify(stationList)),
      });
    });
  }

  getListTrips(req, res, next) {
    Trips.findAll()
      .then((trips) => {
        res.render("admin/trips-store", {
          listTrips: JSON.parse(JSON.stringify(trips)),
        });
      })
      .catch((error) => {
        res.status(400).send({ message: error.message });
      });
  }
  getTrashTrips(req, res, next) {
    Trips.findAll({
      paranoid: false,
      where: {
        deletedAt: {
          [Op.ne]: null,
        },
      },
    }).then((tripList) => {
      res.render("admin/trashTrip", {
        tripList: JSON.parse(JSON.stringify(tripList)),
      });
    });
  }
}

module.exports = new AdminController();
