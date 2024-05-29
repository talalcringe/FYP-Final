const mongoose = require("mongoose");

const sprintSchema = new mongoose.Schema(
  {
    numberOfWords: {
      type: Number,
      required: true,
    },
    targetTime: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failure", "ongoing"],
      default: "ongoing",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sprint", sprintSchema);
