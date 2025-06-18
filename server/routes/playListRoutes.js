const express = require("express");
const auth = require("../middleware/auth");
const {
  createPlayList,
  getPlayList,
  deletePlayList,
} = require("../controllers/playListController");

const router = express.Router();

router.post("/", auth, createPlayList);
router.get("/", auth, getPlayList);
router.delete("/", auth, deletePlayList);

module.exports = router;
