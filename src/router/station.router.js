const express = require("express");
const StationController = require("../app/Controllers/StationController");
const {
  authenticate,
} = require("../app/middlewares/authenticate/authenticate");
const { authorize } = require("../app/middlewares/authenticate/authorize");

const stationRouter = express.Router();

stationRouter.get("/home", (req, res) => {
  res.render("stations/stations");
});

stationRouter.get("/getAllStation", StationController.getAllStation);
stationRouter.get(
  "/createGet",
  authenticate,
  authorize,
  StationController.createGet
);
stationRouter.post(
  "/createPost",
  authenticate,
  authorize,
  StationController.createPost
);
stationRouter.get(
  "/:id/updateGet",
  authenticate,
  authorize,
  StationController.updateGet
);
stationRouter.put(
  "/:id/updatePut",
  authenticate,
  authorize,
  StationController.updatePut
);
stationRouter.delete(
  "/:id/delete",
  authenticate,
  authorize,
  StationController.delete
);
stationRouter.delete(
  "/:id/destroy",
  authenticate,
  authorize,
  StationController.destroy
);
stationRouter.patch(
  "/:id/restore",
  authenticate,
  authorize,
  StationController.restore
);

module.exports = stationRouter;
