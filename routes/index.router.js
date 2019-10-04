const express = require("express");
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get("/", (req, res) => {
  res.render("pages/index", {});
});

module.exports = indexRouter;
