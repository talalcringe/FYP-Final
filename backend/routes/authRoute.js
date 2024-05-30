const express = require("express");
const router = express.Router();
const verify = require("../utils/JWTVerification");
const normalguard = require("../utils/normalguard");

const {
  getAuthUrl,
  getToken,
  getUser,
} = require("../controllers/authController");

router.get("/getAuthURL", getAuthUrl);
router.get("/getToken", getToken);
router.get("/getUserInformation", verify, normalguard, getUser);

module.exports = router;
