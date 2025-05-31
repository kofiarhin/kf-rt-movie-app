import { createUser } from "../utils/helper";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "please fill out all fields" });
    }

    // check if user already exist
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({ error: "user alraedy exist" });
    }
    const user = await createUser({ name, email, password });
    if (!user) {
      res.status(400);
      throw new Error("there was a problem creating user");
    }
    const { password: userPassword, ...rest } = user._doc;
    return res.status(201).json(rest);
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

    res.cookie("jwt", token);
    const { password: userPassword, ...rest } = foundUser._doc;
    return res.json(rest);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser };
