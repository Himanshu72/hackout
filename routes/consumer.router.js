const express = require("express");
const consumerRouter = express.Router();

const consumer = require("../controllers/consumer.controller.js");

// Create a new Note
//consumerRouter.post("/consumer", consumer.create);
consumerRouter.post("/consumer", consumer.create);
// Retrieve all consumer
consumerRouter.get("/showConsumers", consumer.findAll);

consumerRouter.get("/consumerRegisteration", (req, res) => {
  res.render("pages/consumerRegisteration");
});
// Retrieve a single Note with noteId
consumerRouter.get("/consumer/:ConsumerId", consumer.findOne);

// Update a Note with noteId
consumerRouter.put("/consumerDashboard/:ConsumerId", consumer.update);

// Delete a Note with noteId
consumerRouter.delete("/consumer/:ConsumerId", consumer.delete);

module.exports = consumerRouter;
