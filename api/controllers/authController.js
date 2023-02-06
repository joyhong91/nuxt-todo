const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.postSignin = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existUser = await userModel.findOne({ email: email });
    if (existUser) {
      const error = new Error(
        "Eamil already exist, please pick another email!"
      );
      res.status(409).json({
        error: "Eamil already exist, please pick another email! ",
      });
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const result = await user.save();
    res.status(200).json({
      message: "User created",
      user: { id: result._id, email: result.email },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    req.session.currentUser = user;
    if (!user) {
      const error = new Error("user with this email not found!");
      error.statusCode = 401;
      throw error;
    }
    
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      const error = new Error("password is not match!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ email: user.email }, "expressnuxtsecret", {
      expiresIn: "50m",
    });
    res.status(200).json({ token, user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
