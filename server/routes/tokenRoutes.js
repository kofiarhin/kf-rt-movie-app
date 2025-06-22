const { Router } = require("express");
const { verifyToken } = require("../controllers/tokenController");

const router = Router();

router.get("/", (req, res) => {
  return res.json({ message: "get token" });
});

router.get("/:token", verifyToken);
module.exports = router;
