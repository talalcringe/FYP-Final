const CustomError = require("../ErrorHandling/Error");
const { validationResult } = require("express-validator");

const checkForErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new CustomError(400, "Invalid inputs, validation failed"));
  }
  next();
};

module.exports = checkForErrors;
