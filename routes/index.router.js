const express = require("express");
const indexRouter = express.Router();
 

//Middlewares for Auth
const checkAuth = require("../middlewares/checkAuth");
const Partner = require("../models/partner.model.js");
const Consumer = require("../models/consumer.model.js");


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

indexRouter.post("/partnerLogin", (req, res) => {
  const { email, password } = req.body;
  Partner.findOne(
    {
      email: email,
      password: password
    },
    (err, Partner) => {
      if (Partner) {
        let loginValues = [
          {
            email: email
          }
        ];
        req.session.user = loginValues;
        res.redirect("/partnerDashboard");
      } else {
        res.render("pages/login", {
          succ: false,
          err: true
        });
      }
    }
  );
});

indexRouter.post("/consumerLogin", (req, res) => {
  const { email, password } = req.body;

  Consumer.findOne(
    {
      email: email,
      password: password
    },
    (err, Consumer) => {
      if (Consumer) {
        let loginValues = [
          {
            email: email
          }
        ];
        req.session.user = loginValues;
        res.redirect("/consumerDashboard");
      } else {
        res.render("pages/login", {
          succ: false,
          err: true
        });
      }
    }
  );
});

indexRouter.get("/consumerLogin", (req, res) => {
  res.render("pages/consumerLogin", {});
});

indexRouter.get("/partnerLogin", (req, res) => {
  res.render("pages/partnerLogin", {});
});

indexRouter.get("/upload", (req, res) => {
    res.render("pages/upload",{filename : ''}), {parsedText : Text};
});


indexRouter.get("/partnerDashboard", checkAuth, (req, res) => {
  res.render("pages/partnerDashboard");
});

indexRouter.get("/consumerDashboard", checkAuth, (req, res) => {
  res.render("pages/consumerDashboard");
});

indexRouter.get("/userProfile", checkAuth, (req, res) => {
  res.render("pages/userProfile");
});

indexRouter.get("/partnerActivities", checkAuth, (req, res) => {
  res.render("pages/partnerActivities");
});

indexRouter.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});




module.exports = indexRouter;
