const express = require("express");
const UserController = require("../app/Controllers/UserController");
const {
  authenticate
} = require("../app/middlewares/authenticate/authenticate");
const userRouter = express.Router();

userRouter.get("/registerGet", UserController.registerGet);
userRouter.post("/registerPOST", UserController.registerPOST);
userRouter.get("/loginGet", UserController.loginGet);
userRouter.post("/loginPOST", UserController.loginPOST);
userRouter.get("/logout", UserController.logout);
userRouter.post("/buyTicket", authenticate, UserController.buyTicket);
userRouter.get("/ticket-store", authenticate, UserController.getTicket);
userRouter.get("/ticket-store", authenticate, UserController.getTicket);
userRouter.delete("/:id/delete-ticket", authenticate, UserController.deleteTicket);
userRouter.get("/:id/getDetailTicket", authenticate, UserController.getDetailTicket);

module.exports = userRouter;