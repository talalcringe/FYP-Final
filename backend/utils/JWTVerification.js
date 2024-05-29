require("dotenv").config();
const jwt = require("jsonwebtoken");
const CustomError = require("../ErrorHandling/Error");

const verify = (req, res, next) => {
  const cookie = req?.headers?.cookie;
  // console.log(cookie);
  if (!cookie) {
    // throw new CustomError(402, "You are not authorized");
    console.log('cookie not recieved');
  }
  const recievedToken = cookie.split("; ")[1].split("=")[1];
  // console.log(recievedToken);
  const data = jwt.verify(recievedToken, process.env.SECRET_KEY);
  // console.log(data);
  req.userData = data;
  next();
};

module.exports = verify;
