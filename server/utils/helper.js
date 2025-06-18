// utils/helper.js

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const createUser = async (userData) => {
  try {
    const { password, ...rest } = userData;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
      ...rest,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    // Let the caller handle the error (controller should catch this)
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
};
