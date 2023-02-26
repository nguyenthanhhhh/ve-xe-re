const express = require("express");
const AdminController = require("../app/Controllers/AdminController");
const {
  authenticate,
} = require("../app/middlewares/authenticate/authenticate");
const { authorize } = require("../app/middlewares/authenticate/authorize");
const adminRouter = express.Router();

adminRouter.get(
  "/station-store",
  authenticate,
  authorize,
  AdminController.getListStations
);
adminRouter.get(
  "/trashStation",
  authenticate,
  authorize,
  AdminController.getTrashStations
);
adminRouter.get(
  "/trashTrip",
  authenticate,
  authorize,
  AdminController.getTrashTrips
);
adminRouter.get(
  "/trips-store",
  authenticate,
  authorize,
  AdminController.getListTrips
);

module.exports = adminRouter;
