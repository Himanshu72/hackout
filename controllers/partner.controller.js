const Partner = require("../models/partner.model.js");

// Create and Save a new Partner
exports.create = (req, res) => {
  // Create a Partner
  const partner = new Partner({
    // Fname: req.body.Fname,
    // Lname: req.body.Lname
    Fname: "h",
    Lname: "j",
    email: "hj",
    phone: 232,
    gender: "male",
    address: "wewe",
    qualification: "ba",
    bio: "hey",
    adhar: 1212,
    language: ["Eng", "Guj"]
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
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Partner content can not be empty"
    });
  }

  // Find Partner and update it with the request body
  Partnerser.findByIdAndUpdate(
    req.params.PartnerId,
    {
      title: req.body.title || "Untitled Partner",
      content: req.body.content
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
