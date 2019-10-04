const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("pages/index", {});
});
const consumer = require("../controllers/consumer.controller.js");

// Create a new Note
router.post("/consumer", consumer.create);

// Retrieve all consumer
router.get("/consumer", consumer.findAll);

// Retrieve a single Note with noteId
router.get("/consumer/:consumerId", consumer.findOne);

// Update a Note with noteId
router.put("/consumer/:consumerId", consumer.update);

// Delete a Note with noteId
router.delete("/consumer/:consumerId", consumer.delete);

module.exports = router;
