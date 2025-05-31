import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const createUser = async (userData) => {
  try {
    const { password, ...rest } = userData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      ...rest,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    return { error: error.message };
  }
};

export { createUser };
