const express = require("express");
const router = express.Router();

const {
  exportToPdf,
  exportToEpub,
} = require("../controllers/exportController");

router.post("/exportToPdf", exportToPdf);
router.post("/exportToEpub", exportToEpub);

module.exports = router;
