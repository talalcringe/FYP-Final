const logger = require("./logger");

const logSuccessfulLogin = (email, req) => {
  logger.info(`User ${email} logged in successfully from IP ${req.ip}`);
};

const logGuard = (req, res, next) => {
  try {
    logger.info(`User ${req.user.userId} logged in from IP ${req.ip}`);
  } catch (error) {
    logger.error("Error logging login:", error);
  }
  next();
};

module.exports = { logGuard, logSuccessfulLogin };
