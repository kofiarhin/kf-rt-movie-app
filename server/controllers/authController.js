const { createUser } = require("../utils/helper");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/emailService");

// register user
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "please fill out all fields" });
    }

    // check if user already exists
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({ error: "user already exists" });
    }

    const user = await createUser({ name, email, password });
    if (!user) {
      res.status(400);
      throw new Error("there was a problem creating user");
    }

    // generate token and and send email
    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    //  check if wer are in production or development
    const url =
      process.env.NODE_ENV === "production"
        ? `${process.env.PROD_BASE_URL}/api/verify-token/${token}`
        : `http://localhost:5000/api/verify-token/${token}`;

    // send email
    const info = await sendEmail({
      to: email,
      subject: "email verification",
      text: `verification link   ${process.env.PROD_BASE_URL}/api/verify-token/${token}`,
    });

    const { password: userPassword, ...rest } = user._doc;
    return res.status(201).json({ ...rest, token });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "please fill out all fields" });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ error: "user not found" });
    }

    const isAuth = await bcrypt.compare(password, foundUser.password);
    if (!isAuth) {
      return res.status(400).json({ error: "check credentials and try again" });
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    const { password: userPassword, ...rest } = foundUser._doc;
    return res.json({ ...rest, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
