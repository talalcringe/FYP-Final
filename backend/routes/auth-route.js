const express = require("express");
const router = express.Router();
const {
  loginController,
  registrationController,
  changePasswordController,
  fetchingController,
} = require("../controllers/auth-controller");

const verify = require("../utils/jwtgaurd");

const { body } = require("express-validator");
const normalverify = require("../utils/normalguard");

router.post(
  "/register",
  [
    body("fullname")
      .notEmpty()
      .withMessage("Fullname is required")
      .isLength({ min: 2 })
      .withMessage("Fullname must be at least 2 characters long"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("token")
      .notEmpty()
      .withMessage("Token is required")
      .isLength({ min: 7 }),
  ],
  registrationController
);

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginController
);

router.put(
  "/changepassword",
  [
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 7 })
      .withMessage("Password must be at least 7characters long")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2,})/)
      .withMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, and two digits"
      ),
    body("targetDepartment")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 2 })
      .withMessage("Password must be at least 2 characters long"),
    body("confirmPassword")
      .notEmpty()
      .withMessage("confirmpassword is required")
      .isLength({ min: 7 })
      .withMessage("confirmpassword must be at least 7 characters long")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{2,})/)
      .withMessage(
        "confirmpassword must contain at least one lowercase letter, one uppercase letter, and two digits"
      ),
  ],
  verify,
  normalverify,
  changePasswordController
);

router.get("/getData", verify, normalverify, fetchingController);

module.exports = router;
