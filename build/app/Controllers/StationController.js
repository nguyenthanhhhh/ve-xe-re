const urlSlug = require("url-slug");
const { Station } = require("../models");
const { dataToObj } = require("../util/database");

class StationController {
  getAllStation(req, res, next) {
    Station.findAll({}).then(allStation => {
      res.render("stations/getAll", {
        allStation: dataToObj(allStation)
      });
    }).catch(next);
  }

  createPost(req, res, next) {
    const newStation = req.body;
    const slug = urlSlug.convert(newStation.name);
    newStation.slug = slug;
    Station.create(newStation).then(station => {
      console.log("Them thanh cong!");
      res.status(201).redirect("/");
    }).catch(next);
  }

  createGet(req, res, next) {
    res.render("stations/create");
  }

  updateGet(req, res, next) {
    const { id } = req.params;
    Station.findByPk(id).then(station => {
      res.render("stations/update", {
        station: JSON.parse(JSON.stringify(station))
      });
    }).catch(next);
  }

  updatePut(req, res, next) {
    const newStation = req.body;
    const { id } = req.params;
    Station.update(newStation, {
      where: {
        id
      }
    }).then(() => {
      console.log("Cap nhat thanh cong");
      res.status(201).redirect("/admin/station-store");
    }).catch(next);
  }

  delete(req, res, next) {
    const { id } = req.params;
    Station.destroy({
      where: {
        id
      }
    }).then(() => {
      res.status(200).redirect("back");
    }).catch(next);
  }

  destroy(req, res, next) {
    const { id } = req.params;
    Station.destroy({
      where: {
        id
      },
      force: true
    }).then(() => {
      res.status(200).redirect("back");
    }).catch(next);
  }

  restore(req, res, next) {
    const { id } = req.params;
    Station.restore({
      where: {
        id
      }
    }).then(() => {
      res.status(200).redirect("back");
    }).catch(next);
  }
}

module.exports = new StationController();