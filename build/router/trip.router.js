const express = require("express");
const TripController = require("../app/Controllers/TripController");
const {
  authenticate
} = require("../app/middlewares/authenticate/authenticate");
const { authorize } = require("../app/middlewares/authenticate/authorize");

const tripRouter = express.Router();

tripRouter.get("/createGet", authenticate, authorize, TripController.createGet);
tripRouter.get("/findTrip", TripController.findTrip);

tripRouter.post("/createPost", authenticate, authorize, TripController.createPost);
tripRouter.get("/getAll", TripController.getAll);
tripRouter.get("/getDetail/:id/:vehicleID", TripController.getDetail);
tripRouter.get("/formFindTrip", TripController.formFindTrip);
tripRouter.post("/findTrip", TripController.findTrip);
tripRouter.get("/:id/updateGet", authenticate, authorize, TripController.updateGet);
tripRouter.put("/:id/updatePut", authenticate, authorize, TripController.updatePut);
tripRouter.delete("/:id/delete", authenticate, authorize, TripController.delete);
tripRouter.delete("/:id/destroy", authenticate, authorize, TripController.destroy);
tripRouter.patch("/:id/restore", authenticate, authorize, TripController.restore);

module.exports = tripRouter;