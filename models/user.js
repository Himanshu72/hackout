const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true
    },
    description: {
      type: String,
      unique: false,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model("User", userSchema);
