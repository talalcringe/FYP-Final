const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const CustomError = require("../ErrorHandling/Error");
const User = require("../models/User");
const {
  generateResponseWithPayload,
  generateResponseWithoutPayload,
} = require("../utils/helpers");

//=> Register Controller
exports.registrationController = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new CustomError(400, "Invalid inputs, validation failed"));
  }

  const { fullname, email, token } = req.body;

  const userWithSameEmail = await User.findOne({ email });

  if (userWithSameEmail) {
    throw new CustomError(400, "User With Same Email exists");
  }

  const newUser = await User.create({ fullname, email, token });

  const response = generateResponseWithoutPayload(
    201,
    true,
    "User Created successfully"
  );

  res.status(200).json(response);
};

exports.loginController = async (req, res, next) => {
  const errors = validationResult(req);
  const ip = req.ip; // Get the user's IP address

  try {
    if (!errors.isEmpty()) {
      throw new CustomError(400, "Invalid inputs, validation failed");
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    let newToken = user.token;

    try {
      if (user.token) {
        const decodedToken = jwt.verify(user.token, process.env.SECRET_KEY);
        if (!decodedToken) {
          throw new jwt.TokenExpiredError("Token expired");
        }
      } else {
        newToken = jwt.sign(
          {
            userId: user._id,
            email: user.email,
            personRole: user.role,
            personDepartment: user.department,
          },
          process.env.SECRET_KEY,
          { expiresIn: "7d" }
        );
        await User.findByIdAndUpdate(user._id, { token: newToken });
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        newToken = jwt.sign(
          {
            userId: user._id,
            email: user.email,
            personRole: user.role,
            personDepartment: user.department,
          },
          process.env.SECRET_KEY,
          { expiresIn: "7d" }
        );
        await User.findByIdAndUpdate(user._id, { token: newToken });
      } else {
        throw error;
      }
    }

    const dataToBeSent = {
      _id: user._id,
      email: user.email,
      role: user.role,
      fullname: user.fullname,
      department: user.department,
      allDepartments: user.children,
      category: user.category,
    };

    // Reset the login attempts after a successful login
    loginAttempts[ip] = 0;

    const response = generateResponseWithPayload(
      200,
      true,
      "Login successful",
      dataToBeSent
    );

    return res.status(201).cookie("access_token", newToken).json(response);
  } catch (err) {
    return next(err);
  }
};

exports.changePasswordController = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new CustomError(400, "Invalid inputs, validation failed");
    }

    const { password, confirmPassword, targetDepartment } = req.body;
    const { role, department, children } = req.user;

    if (password !== confirmPassword) {
      throw new CustomError(400, "Password and confirm passwords don't match");
    }

    const isPersonHimSelf = targetDepartment === department;
    const isHeAdmin = role === "admin";
    const isTheTargetChild = children.find(
      (item) => item.name === targetDepartment
    );

    if (isPersonHimSelf || isHeAdmin || isTheTargetChild) {
      const user = await User.findOne({ department: targetDepartment });

      if (!user) {
        throw new CustomError(500, "Invalid credentials");
      }

      user.password = password;
      user.allowed = true;

      await user.save();

      const response = generateResponseWithoutPayload(
        200,
        true,
        "Password updated successfully"
      );

      return res.status(200).json(response);
    } else {
      throw new CustomError(402, "You are not authorized to change password");
    }
  } catch (err) {
    return next(err);
  }
};

exports.fetchingController = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new CustomError(400, "Invalid inputs, validation failed");
    }

    const { _id, email, role, fullname, department, children, category } =
      req.user;

    const dataToBeSent = {
      _id,
      email,
      role,
      fullname,
      department,
      allDepartments: children,
      category: category,
    };

    const response = generateResponseWithPayload(
      200,
      true,
      "Fetching successful",
      dataToBeSent
    );

    return res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};
