const Partner = require("../models/partner.model.js");

// Create and Save a new Partner
exports.create = (req, res) => {
  //   // Validate Request
  //   if (!req.body.content) {
  //     return res.status(400).send({
  //       message: "Partner content can not be empty"
  //     });
  //   }
  // Create a Partner
  const partner = new Partner({
    // Fname: req.body.Fname,
    // Lname: req.body.Lname
    Fname: "truhd",
    Lname: "bgcjdh",
    email: "jbkhubhg",
    aadhar: 3434232,
    phone: 878434367547
  });

  // Save Partner in the database
  partner
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Partner."
      });
    });
};

// Retrieve and return all Partners from the database.
exports.findAll = (req, res) => {
  Partner.find()
    .then(Partners => {
      res.send(Partners);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Partners."
      });
    });
};

// Find a single Partner with a PartnerId
exports.findOne = (req, res) => {
  Partner.findById(req.params.PartnerId)
    .then(Partner => {
      if (!Partner) {
        return res.status(404).send({
          message: "Partner not found with id " + req.params.PartnerId
        });
      }
      res.send(Partner);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Partner not found Partner id " + req.params.PartnerId
        });
      }
      return res.status(500).send({
        message: "Error retrieving Partner with id " + req.params.PartnerId
      });
    });
};

// Update a Partnerer identified by the PartnerId in the request
exports.update = (req, res) => {
  //   // Validate Request
  //   if (!req.body.content) {
  //     return res.status(400).send({
  //       message: "Partner content can not be empty"
  //     });
  //   }

  // Find Partner and update it with the request body
  Partner.findByIdAndUpdate(
    req.params.PartnerId,
    {
      Fname: "newone",
      Lname: "anotherone",
      email: "lastone",
      aadhar: 23234676,
      phone: 12466423
    },
    { new: true }
  )
    .then(Partner => {
      if (!Partner) {
        return res.status(404).send({
          message: "Partner not found with id " + req.params.PartnerId
        });
      }
      res.send(Partner);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Partner not found with id " + req.params.PartnerId
        });
      }
      return res.status(500).send({
        message: "Error updating Partner with id " + req.params.PartnerId
      });
    });
};

// Delete a Partner with the specified PartnerId in the request
exports.delete = (req, res) => {
  Partner.findByIdAndRemove(req.params.PartnerId)
    .then(Partner => {
      if (!Partner) {
        return res.status(404).send({
          message: "Partner not found with id " + req.params.PartnerId
        });
      }
      res.send({ message: "Partner deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Partner not found with id " + req.params.PartnerId
        });
      }
      return res.status(500).send({
        message: "Could not delete Partner with id " + req.params.PartnerId
      });
    });
};
