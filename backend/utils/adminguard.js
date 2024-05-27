require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const CustomError = require("../ErrorHandling/Error"); // Assuming CustomError is defined elsewhere

const adminverify = async (req, res, next) => {
  try {
    const {role} = req.user;
    const isAdmin = role === 'admin';
    if (!isAdmin){
        throw new CustomError(402,"You are not authorized to access this route");
    }
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = adminverify;
