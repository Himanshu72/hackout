const express = require("express");
const partnerRouter = express.Router();

const partner = require("../controllers/partner.controller.js");

// Create a new Note
partnerRouter.post("/partner", partner.create);

// Retrieve all partner
partnerRouter.get("/partner", partner.findAll);

// Retrieve a single Note with noteId
partnerRouter.get("/partner/:PartnerId", partner.findOne);

// Update a Note with noteId
partnerRouter.put("/partner/:PartnerId", partner.update);

// Delete a Note with noteId
partnerRouter.delete("/partner/:PartnerId", partner.delete);

module.exports = partnerRouter;
