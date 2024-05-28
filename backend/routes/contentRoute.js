const express = require("express");
const router = express.Router();
const fs = require("fs");
const verify = require("../utils/JWTVerification");

const {
  // createPageFolder,
  createPageFilesAndUpload,
  ensureFoldersExist,
} = require("../controllers/contentController");

// router.get("/createPageFolder/:pagenumber", verify, createPageFolder);

router.get("/createProjectFolder/:projectId", verify, ensureFoldersExist);

router.post("/createPageFilesAndUpload", verify, createPageFilesAndUpload);

module.exports = router;
