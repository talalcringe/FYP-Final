const express = require("express");
const router = express.Router();
const verify = require("../utils/JWTVerification");

const {
  // createPageFolder,
  createPageFilesAndUpload,
  ensureFoldersExist,
  handleFormSubmission,
} = require("../controllers/contentController");

// router.get("/createPageFolder/:pagenumber", verify, createPageFolder);

router.post(
  "/createProject/:projectId",
  verify,
  ensureFoldersExist,
  handleFormSubmission
);

// router.get("/createProjectFolder/:projectId", verify, ensureFoldersExist);

router.post("/createPageFilesAndUpload", verify, createPageFilesAndUpload);

module.exports = router;
