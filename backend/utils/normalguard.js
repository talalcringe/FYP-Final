require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CustomError = require("../ErrorHandling/Error");

const normalverify = async (req, res, next) => {
  try {
    const { userId } = req.userData;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new CustomError(402, "Invalid User");
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err.message);
    return next(err);
  }
};

module.exports = normalverify;
