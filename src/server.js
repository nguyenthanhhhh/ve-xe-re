const express = require("express");
require("dotenv").config();
const { sequelize } = require("./app/models");
const path = require("path");
const { engine } = require("express-handlebars");
const rootRouter = require("./router");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cookieSession = require("cookie-session");
const cors = require("cors");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const port = process.env.PORT;

const app = express();

const publicPath = path.join(__dirname, "/public");
app.use(express.static(publicPath));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// app.use(
//   session({
//     secret: "thanh",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

app.use(
  cookieSession({
    keys: "thanh",
  })
);

app.use(methodOverride("_method"));
app.use(express.json());
app.use(rootRouter);
app.use(cors());

// Template Engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "view"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, async () => {
  console.log(`App run on http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log("Ket noi thanh cong");
  } catch (e) {
    console.log("Ket noi that bai, " + e);
  }
});
