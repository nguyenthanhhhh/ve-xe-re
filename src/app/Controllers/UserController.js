const { Users, tickets, seats, Trips, vehicle, Station } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const cloneDeep = require("lodash.clonedeep");
const _ = require("lodash");
const { dataToObj, dataToObj2 } = require("../util/database");

class UserController {
  registerGet(req, res) {
    res.render("users/register");
  }

  async registerPOST(req, res) {
    const { userName, password, email } = req.body;
    const user = { userName, password, email };

    try {
      const newUser = await Users.build(user); // Tạo một đối tượng mô hình mới
      await newUser.validate();
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      Users.create({ userName, password: hash, email })
        .then(() => {
          res.send("Tao tai khoan thanh cong");
        })
        .catch((err) => {
          res.send({ message: err.message });
        });
    } catch (error) {
      let err = error.message;
      err = err.replace(/Validation error: /g, "");
      console.log(err);
      res.status(400).send(err + " <a href=/>Quay lại </a>");
    }
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(password, salt);

    // Users.create({ userName, password: hash, email })
    //   .then((user) => {
    //     console.log(user);
    //     res.status(201).redirect("/");
    //   })
    //   .catch((err) => {
    //     res.status(400).send({ message: err.message });
    //   });
  }

  loginGet(req, res) {
    res.render("users/login");
  }

  async loginPOST(req, res) {
    const token = req.cookies.auth;
    if (token) {
      res
        .status(401)
        .send(
          "Bạn đã đăng nhập rồi, không thể đăng nhập. <a href = />Quay lại </a>"
        );
    } else {
      const { userName, password } = req.body;
      const userLog = await Users.findOne({
        where: {
          userName,
        },
      });

      const timeExpire = process.env.JWT_EXPIRES_IN;
      console.log("TIME EXPIRED: " + timeExpire);

      if (userLog) {
        const auth = bcrypt.compareSync(password, userLog.password);
        if (auth) {
          const token = jwt.sign(
            { userName: userLog.userName, type: userLog.type },
            process.env.JWT_SECRET,
            { expiresIn: timeExpire }
          );

          res.cookie("auth", token);
          res.redirect("/");
          console.log("Dang nhap thanh cong");
        } else {
          res
            .status(401)
            .send(
              "Mật khẩu không chính xác. <a href = /users/loginGet>Quay lại </a>"
            );
        }
      } else {
        res
          .status(401)
          .send(
            "Tài khoản không tồn tại. <a href = /users/loginGet>Quay lại </a>"
          );
      }
    }
  }

  logout(req, res) {
    // res.clearCookie("token");
    // req.logOut();
    res.status(200).clearCookie("auth");
    res.redirect("/");
    console.log("Logout");
  }

  async buyTicket(req, res) {
    let { chooseSeat, trip_id, vehicle_id } = req.body;
    const { user } = req;

    trip_id = parseInt(trip_id);
    vehicle_id = parseInt(vehicle_id);

    try {
      const userBuy = await Users.findOne({
        where: {
          userName: user.userName,
        },
      });

      const newTicket = await tickets.create({
        trip_id,
        user_id: userBuy.id,
        vehicle_id,
        seat: chooseSeat,
      });

      const newSeat = await seats.findOne({
        where: {
          name: chooseSeat,
          vehicle_id,
        },
      });

      newSeat.status = 0;

      await newSeat.save();

      res.status(201).send("Mua vé thành công. <a href = />Quay lại </a>");
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async getTicket(req, res) {
    const { user } = req;
    const userBuy = await Users.findOne({
      where: {
        userName: user.userName,
      },
    });

    tickets
      .findAll({
        where: {
          user_id: userBuy.id,
        },
        include: [
          {
            model: Trips,
            as: "infTrip",
            include: [
              {
                model: Station,
                as: "to",
              },
              {
                model: Station,
                as: "from",
              },
            ],
          },
          {
            model: vehicle,
            as: "infVehicle",
          },
        ],
      })
      .then((tickets) => {
        res.render("users/ticket-store", { tickets: dataToObj(tickets) });
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  }

  getDetailTicket(req, res) {
    const { id } = req.params;
    tickets
      .findOne({
        where: {
          id,
        },
        include: [
          {
            model: Trips,
            as: "infTrip",
            include: [
              {
                model: Station,
                as: "to",
              },
              {
                model: Station,
                as: "from",
              },
            ],
          },
          {
            model: vehicle,
            as: "infVehicle",
          },
          {
            model: Users,
            as: "infUser",
          },
        ],
      })
      .then((ticket) => {
        let newData = dataToObj(ticket);
        let time = newData.infTrip.startTime;
        time = moment(time).format("DD/MM/YYYY [vào lúc] HH [giờ] mm [phút] ");
        newData.infTrip.startTime = time;
        res.status(200).render("users/detailTicket", { ticket: newData });
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  }

  async deleteTicket(req, res) {
    const { id } = req.params;
    const ticketDetail = await tickets.findOne({ where: { id } });
    console.log("ticket detail: ---------------");
    console.log(ticketDetail);
    const { seat, vehicle_id } = ticketDetail;

    tickets
      .destroy({
        where: {
          id,
        },
      })
      .then(async () => {
        const seatItem = await seats.findOne({
          where: {
            name: seat,
            vehicle_id,
          },
        });

        seatItem.status = 1;
        await seatItem.save();
        console.log("Seat item: ---------");
        console.log(seatItem);
        console.log("Xoa ve thanh cong");
        res.status(200).redirect("back");
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  }
}

module.exports = new UserController();
