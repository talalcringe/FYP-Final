require("dotenv").config();
const { google } = require("googleapis");
const CustomError = require("../ErrorHandling/Error");
const jwt = require("jsonwebtoken");
const { oAuth2Client, SCOPE } = require("../utils/oAuth.js");
const { generateResponseWithPayload } = require("../utils/helpers");
const _ = require("lodash");

const User = require("../models/User");

//Request Controllers----------------------------------------------------------
exports.getAuthUrl = async (req, res, next) => {
  try {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      // prompt: "consent",
      scope: SCOPE,
    });
    return res.send({
      success: true,
      url: authUrl,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getToken = async (req, res, next) => {
  try {
    let receivedCode = req?.query?.code;

    if (!receivedCode) {
      throw new CustomError(402, "You are not authorized");
    }

    oAuth2Client.getToken(receivedCode, async (err, token) => {
      if (err) {
        console.error("Error retrieving access token", err);
        throw new CustomError(400, "Error retrieving access token");
      }

      oAuth2Client.setCredentials(token);
      const oauth2 = google.oauth2({ auth: oAuth2Client, version: "v2" });

      try {
        const response = await new Promise((resolve, reject) => {
          oauth2.userinfo.get((err, response) => {
            if (err) {
              reject(new CustomError(500, "Error retrieving user info"));
            }
            resolve(response);
          });
        });

        const userData = response.data;
        const { email, name, picture, verified_email } = userData;

        const user = await User.findOne({ email: email });

        if (user) {
          // throw new CustomError(402, "Duplicate email");
          // Sign the token using JWT
          const jwtToken = jwt.sign(
            { userId: user._id, token: token },
            process.env.SECRET_KEY
          );

          // Set the JWT token as a cookie
          res.cookie("access_token", jwtToken);
          const baseUrl = "http://localhost:5173/dashboard"; // Default to local URL
          // const payload = {
          //   userInfo: user,
          //   redirectUrl: baseUrl,
          // };
          // res.send(
          //   generateResponseWithPayload(200, true, "User logged in", payload)
          // );
          res.redirect(baseUrl);
        } else {
          const newUser = new User({
            fullname: name,
            email: email,
            profileImage: picture || "",
            token: token,
            cookies: "",
            projects: [],
            chats: [],
          });

          await newUser.save();

          // Sign the token using JWT
          const jwtToken = jwt.sign(
            { userId: newUser._id, token: token },
            process.env.SECRET_KEY
          );

          // Set the JWT token as a cookie
          res.cookie("access_token", jwtToken);
          const baseUrl = "http://localhost:5173/dashboard"; // Default to local URL
          // const payload = {
          //   userInfo: user,
          //   redirectUrl: baseUrl,
          // };
          // res.send(
          //   generateResponseWithPayload(200, true, "User logged in", payload)
          // );
          res.redirect(baseUrl);
        }
      } catch (err) {
        // throw new CustomError(500, "Error processing user data");
        console.log(err);
      }
    });
  } catch (err) {
    return next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { _id, fullname, profileImage } = req.user;
    const response = generateResponseWithPayload(
      200,
      true,
      "User data fetched successfully",
      { _id, fullname, profileImage }
    );
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};
