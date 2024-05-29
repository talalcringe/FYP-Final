const express = require("express");
const router = express.Router();
const fs = require("fs");
const verify = require("../utils/JWTVerification");
const multer = require("multer");
const path = require("path");

const {
  // createPageFolder,
  createPageFilesAndUpload,
  ensureFoldersExist,
  handleFormSubmission,
} = require("../controllers/contentController");

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, image, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, image, cb) => {
    cb(null, `${Date.now()}-${image.originalname}`);
  },
});

// Initialize upload variable with multer configuration
const upload = multer({ storage: storage });

// router.get("/createPageFolder/:pagenumber", verify, createPageFolder);

router.post(
  "/createProject/:projectId",
  verify,
  ensureFoldersExist,
  upload.single("image"),
  handleFormSubmission
);

// router.get("/createProjectFolder/:projectId", verify, ensureFoldersExist);

router.post("/createPageFilesAndUpload", verify, createPageFilesAndUpload);

module.exports = router;
