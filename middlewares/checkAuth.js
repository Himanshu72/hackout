const session = require("express-session");

module.exports = checkAuth = (req, res, next) => {
  if (req.session.admin && req.cookies.admin_key) {
    //res.redirect("/");
    next();
  } else {
    res.render("pages/login", {
      succ: false,
      err: true
    });
  }
};