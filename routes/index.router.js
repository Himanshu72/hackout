const express = require("express");
const indexRouter = express.Router();
const mongoose = require("mongoose");

const Partner = require("../models/partner.model.js");
//Middlewares for Auth
const checkAuth = require("../middlewares/checkAuth");
indexRouter.get("/", (req, res) => {
  res.render("pages/index", {});
});
indexRouter.get("/contactUs", (req, res) => {
  res.render("pages/contactUs", {});
});

indexRouter.use((req, res, next) => {
  if (req.cookies.user_key && !req.session.user) {
    res.clearCookie("user_key");
  }
  next();
});

// Login Route
indexRouter.post("/login", (req, res) => {
  const PartnerSchema = new Partner({
    email: {
      type: String
    },
    password: {
      type: String
    }
  });

  const PartnerModel = mongoose.model("PartnerModel", PartnerSchema);
  PartnerModel.findOne(
    {
      email: req.body.email,
      password: req.body.password
    },
    (err, User) => {
      if (User) {
        let loginValues = [
          {
            email: email
          }
        ];
        req.session.user = loginValues;
        res.redirect("/profile");
      } else {
        res.render("pages/login", {
          succ: false,
          err: true
        });
      }
    }
  );
});

indexRouter.get("/login", (req, res) => {
  res.render("pages/login", {});
});
indexRouter.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
module.exports = indexRouter;
