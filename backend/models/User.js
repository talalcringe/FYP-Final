const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    token: {
      type: Object,
      required: true,
    },
    cookies: {
      type: String,
      default: "",
    },
    projects: {
      type: [String],
      default: [],
    },
    chats: {
      type: [
        {
          id: String,
          name: String,
          history: [{ role: String, parts: [{ text: String }] }],
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
