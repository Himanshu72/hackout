const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewPartnerSchema = new Schema(
  {
    Fname: {
      type: String,
      unique: false,
      required: false
    },
    Lname: {
      type: String,
      unique: false,
      required: false
    },

    email: {
      type: String,
      unique: true,
      required: false
    },
    phone: {
      type: Number,
      unique: true,
      required: false
    },
    gender: {
      type: String,
      unique: false,
      required: false
    },
    age: {
      type: String,
      unique: false,
      required: false
    },

    address: {
      type: String,
      unique: false,
      required: false
    },

    qualification: {
      type: String,
      unique: false,
      required: false
    },
    bio: {
      type: String,
      unique: false,
      required: false
    },
    aadhar: {
      type: Number,
      unique: true,
      required: false
    },
    languages: {
      type: Array,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model("Partner", NewPartnerSchema);
