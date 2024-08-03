const checkUser = (req, res, next) => {
  const name = req.cookies.name;
  const topUp = req.cookies.topUp;

  if (!name || !topUp) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = checkUser;
