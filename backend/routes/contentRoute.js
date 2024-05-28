const express = require("express");
const router = express.Router();
const fs = require("fs");
const verify = require("../utils/JWTVerification");

const {
  createPageFolder,
  createTextFilesAndUpload,
  ensureFoldersExist,
} = require("../controllers/contentController");

router.get("/createPageFolder/:pagenumber", verify, createPageFolder);

router.post("/createTextFilesAndUpload", verify, createTextFilesAndUpload);

router.get("/createProjectFolder/:projectId", verify, ensureFoldersExist);

module.exports = router;
