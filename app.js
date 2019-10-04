// Express App Starts Here

const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Set the bodyparser
const bodyParser = require("body-parser");

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/hackout", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    // mongoose connection error will be handled here
    console.error("App starting error:", err.stack);
  });

const indexRouter = require("./routes/index.router");
const consumerRouter = require("./routes/consumer.router");
const partnerRouter = require("./routes/partner.router");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", consumerRouter);
app.use("/", partnerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
<<<<<<< HEAD
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
=======
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
>>>>>>> origin/monarch
});

module.exports = app;
