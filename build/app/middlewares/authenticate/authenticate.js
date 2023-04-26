const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.auth;
  // const token = req.header("token") || req.headers.token;
  try {
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
      } catch (error) {
        res.status(200).clearCookie("auth");
        res.status(401).send("Đăng nhập đã hết hạn, vui lòng đăng nhập lại. <a href = /users/loginGet>Đăng nhập </a>");
      }
    } else {
      res.status(403).send("Bạn chưa đăng nhập hoặc đăng nhập đã hết hạn. <a href = /users/loginGet>Đăng nhập </a>");
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = {
  authenticate
};