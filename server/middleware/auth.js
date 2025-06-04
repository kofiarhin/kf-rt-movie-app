import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("no token");
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    if (!id) {
      res.status(401);
      throw new Error("invalid token");
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(401);
      throw new Error("invalid token user not found");
    }

    const { password, ...rest } = user._doc;
    req.user = rest;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default auth;
