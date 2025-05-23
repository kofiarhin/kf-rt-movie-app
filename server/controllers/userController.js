const getUsers = async (req, res, next) => {
  return res.json({ message: "get users" });
};

module.exports = {
  getUsers,
};
