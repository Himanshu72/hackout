const express = require("express");
const consumerRouter = express.Router();

const consumer = require("../controllers/consumer.controller.js");

// Create a new Note
consumerRouter.post("/consumer", consumer.create);

// Retrieve all consumer
consumerRouter.get("/consumer", consumer.findAll);

// Retrieve a single Note with noteId
consumerRouter.get("/consumer/:consumerId", consumer.findOne);

// Update a Note with noteId
consumerRouter.put("/consumer/:consumerId", consumer.update);

// Delete a Note with noteId
consumerRouter.delete("/consumer/:consumerId", consumer.delete);

module.exports = consumerRouter;
