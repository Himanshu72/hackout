const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("pages/index", {});
});
const user = require("../controllers/user.controller.js");

// Create a new Note
router.post("/user", user.create);

// Retrieve all user
router.get("/user", user.findAll);

// Retrieve a single Note with noteId
router.get("/user/:userId", user.findOne);

// Update a Note with noteId
router.put("/user/:userId", user.update);

// Delete a Note with noteId
router.delete("/user/:userId", user.delete);

module.exports = router;
