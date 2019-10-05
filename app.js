// Express App Starts Here
const express = require("express");
const createError = require("http-errors");
const path = require("path");


// Required for authentication
const session = require("express-session");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const app = express();


// default options
app.use(fileUpload());

app.post("/upload", function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  let filename = "FILE" + Date.now().toString();
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(__dirname + "/public/img/FILE1570299498752.jpg", function(err) {
    if (err) return res.status(500).send(err);
    else {
      // OCR API
      const ocrSpaceApi = require("ocr-space-api");
      const Text = "";
      const options = {
        apikey: " 8d56bdab8188957",
        language: "eng", // language
        imageFormat: "image/png", // Image Type
        isOverlayRequired: true
      };

      // Image file to upload
      const imageFilePath = `./public/img/${filename}.png`;

      // Run and wait the result
      ocrSpaceApi
        .parseImageFromLocalFile(imageFilePath, options)
        .then(function(parsedResult) {
          Text = parsedResult.parsedText;
          console.log("parsedText: \n", parsedResult.parsedText);
          res.render("pages/upload", { filename: Text });
          // console.log("ocrParsedResult: \n", parsedResult.ocrParsedResult);
        })
        .catch(function(err) {
          console.log("ERROR:", err);
        });
    }
  });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    key: "user_key",
    secret: "mySecret",
    proxy: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 3600000 // Time in ms
    }
  })
);

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
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
