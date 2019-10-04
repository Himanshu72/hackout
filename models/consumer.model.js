const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewConsumerSchema = new Schema(
  {
    Fname: {
      type: String,
      unique: false,
      required: true
    },
    Lname: {
      type: String,
      unique: false,
      required: true
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
    }
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model("Consumer", NewConsumerSchema);
