const express = require("express");
const router = express.Router();
const verify = require("../utils/JWTVerification");
const normalverify = require("../utils/normalguard");

const {
  createPageFolder,
  createTextFilesAndUpload,
  ensureFoldersExist,
  handleFormSubmission,
  getAllProjects,
  getSprintHistoryOfAProject,
  createSprint,
  modifySprintStatus,
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

router.get("/getAllProjects", verify, normalverify, getAllProjects);

router.get(
  "/getSprintHistoryOfAProject/:projectid",
  verify,
  normalverify,
  getSprintHistoryOfAProject
);

router.put(
  "/modifySprintStatus/:sprintid",
  verify,
  normalverify,
  modifySprintStatus
);

router.post("/createSprint", verify, normalverify, createSprint);

module.exports = router;
