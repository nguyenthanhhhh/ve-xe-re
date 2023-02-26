const authorize = (req, res, next) => {
  const user = req.user;
  console.log(user);
  if (["ADMIN"].findIndex((ele) => ele === user.type) > -1) {
    return next();
  } else {
    res
      .status(403)
      .send("Bạn không có quyền truy cập!. <a href = />Quay lại </a>");
  }
};

module.exports = {
  authorize,
};
