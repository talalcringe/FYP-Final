const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const verify = require("../utils/jwtgaurd");
const adminverify = require("../utils/adminguard");
const normalverify = require("../utils/normalguard");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const checkForErrors = require("../middlewares/Errors");

const {
  getPixabayImages,
  createProjectController,
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

// (2) CREATE PROJECT
router.post(
  "/create-project",
  verify,
  normalverify,
  [
    body("title")
      .notEmpty()
      .withMessage("Fullname is required")
      .isLength({ min: 2 })
      .withMessage("Fullname must be at least 2 characters long"),
    body("authors")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
  ],
  checkForErrors,
  createProjectController
);

// ---------- MUSIC RELATED STUFF-----------------------------
// (1) GET MUSIC RESULTS
router.get("/getDefaultMusic", getDefaultMusic);

// (2) GET MUSIC RESULTS
router.get("/searchMusicSound", searchFreesoundAudio);

router.put("/askourbot", askGemini);

router.get("/getAllChats", getAllChats);

router.get("/getOneChat/:chatid", getOneChat);

router.get("/newChat/:chatid", initiateNewChat);

module.exports = router;
