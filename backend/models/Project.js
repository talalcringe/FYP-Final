const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    seriesInfo: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    genre: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    pages: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "onhold", "completed", "cancelled"],
      default: "active",
    },
    sprints: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
