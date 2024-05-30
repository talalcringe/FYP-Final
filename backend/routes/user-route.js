const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const verify = require("../utils/JWTVerification");
const adminverify = require("../utils/adminguard");
const normalverify = require("../utils/normalguard");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const checkForErrors = require("../middlewares/Errors");

const {
  getPixabayImages,
  getDefaultMusic,
  searchFreesoundAudio,
  askGemini,
  getAllChats,
  getOneChat,
  initiateNewChat,
} = require("../controllers/user-controller");

// ---------- IMAGES RELATED STUFF----------------------------
// (1) SEARCH PIXABAY IMAGES
router.get(
  "/images/:query",
  [param("query").notEmpty().withMessage("Search query is required")],
  checkForErrors,
  getPixabayImages
);

// ---------- MUSIC RELATED STUFF-----------------------------
// (1) GET MUSIC RESULTS
router.get("/getDefaultMusic", getDefaultMusic);

// (2) GET MUSIC RESULTS
router.get("/searchMusicSound", searchFreesoundAudio);

router.put("/askourbot", verify, normalverify, askGemini);

router.get("/getAllChats", verify, normalverify, getAllChats);

router.get("/getOneChat/:chatid", verify, normalverify, getOneChat);

router.get("/newChat/:chatid", verify, normalverify, initiateNewChat);

module.exports = router;
