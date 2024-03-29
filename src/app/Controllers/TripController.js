const { Trips, Station, vehicle, sequelize } = require("../models");
const crypto = require("crypto");
const { Op } = require("sequelize");
const { dataToObj } = require("../util/database");
const moment = require("moment");

class TripController {
  getAll(req, res, next) {
    Trips.findAll({
      include: [
        {
          model: Station,
          as: "from",
        },
        {
          model: Station,
          as: "to",
        },
        {
          model: vehicle,
          as: "infVehicle",
        },
      ],
    }).then((trips) => {
      // console.log(dataToObj(trips));
      res.render("trips/getAll", { trips: JSON.parse(JSON.stringify(trips)) });
    });
  }

  async getDetail(req, res, next) {
    const { id, vehicleID } = req.params;
    const query = `
      select name from (
        select * from seats where vehicle_id in (
	                    select id from vehicles where id = :id
                    ) 
        ) as seat2 where status = 1
        order by name ASC
    `;
    const tripDetail = await Trips.findOne({
      where: {
        id,
      },

      include: [
        {
          model: Station,
          as: "from",
        },
        {
          model: Station,
          as: "to",
        },
        {
          model: vehicle,
          as: "infVehicle",
          where: {
            id: vehicleID,
          },
        },
      ],
    });

    //format time
    let newData = dataToObj(tripDetail);
    let time = newData.startTime;
    time = moment(time).format("DD/MM/YYYY [lúc] HH [giờ] mm [phút] ");
    newData.startTime = time;

    //get seats available
    let [seatsAvailable] = await sequelize.query(query, {
      replacements: { id: tripDetail.infVehicle.id },
    });
    let arrSeats = new Array();

    seatsAvailable.forEach((val) => arrSeats.push(val.name));

    res.render("trips/getDetail", {
      tripDetail: dataToObj(newData),
      seatsAvailable: dataToObj(arrSeats),
    });
  }

  createGet(req, res, next) {
    res.render("trips/create");
  }

  createPost(req, res, next) {
    const newTrip = req.body;
    const slug = crypto.randomBytes(10).toString("hex");
    newTrip.slug = slug;
    console.log(newTrip);

    Trips.create(newTrip)
      .then((trip) => {
        res.status(201).redirect("/");
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }

  updateGet(req, res, next) {
    const { id } = req.params;
    Trips.findByPk(id)
      .then((trip) => {
        res.render("trips/update", { trip: JSON.parse(JSON.stringify(trip)) });
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }

  updatePut(req, res, next) {
    const { id } = req.params;
    const newTrip = req.body;
    Trips.update(newTrip, {
      where: {
        id,
      },
    })
      .then(() => {
        console.log("Cap nhat thanh cong");
        res.status(201).redirect("/admin/trips-store");
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }

  delete(req, res, next) {
    const { id } = req.params;
    Trips.destroy({
      where: { id },
    })
      .then(() => {
        res.status(200).redirect("back");
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }

  destroy(req, res, next) {
    const { id } = req.params;
    Trips.destroy({
      where: {
        id,
      },
      force: true,
    })
      .then(() => {
        res.status(200).redirect("back");
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }

  restore(req, res, next) {
    const { id } = req.params;
    Trips.restore({
      where: {
        id,
      },
    })
      .then(() => {
        res.status(200).redirect("back");
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  }

  formFindTrip(req, res, next) {
    res.render("trips/findTrip");
  }

  async findTrip(req, res, next) {
    const { noiDi, noiDen } = req.body;
    let tripList;
    const query = `
      select id from "Trips"
      where "fromStation" in ( select id from "Stations" where province like :noiDi)
        and "toStation" in (select id from "Stations" where province like :noiDen)
    `;
    try {
      [tripList] = await sequelize.query(query, {
        replacements: {
          noiDi: noiDi,
          noiDen: noiDen,
        },
      });
    } catch (error) {
      console.log("Coi loi");
      console.log(error);
    }
    let idList = new Array();
    tripList.forEach((id) => idList.push(id.id));
    Trips.findAll({
      where: {
        id: { [Op.in]: idList },
      },
      include: [
        {
          model: Station,
          as: "from",
        },
        {
          model: Station,
          as: "to",
        },
        {
          model: vehicle,
          as: "infVehicle",
        },
      ],
    })
      .then((trips) => {
        console.log(dataToObj(trips));
        res.render("trips/getAll", {
          trips: JSON.parse(JSON.stringify(trips)),
        });
        // console.log(dataToObj(trips));
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
    // res.send("HELLo");
  }
}

module.exports = new TripController();
