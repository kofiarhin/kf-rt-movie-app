import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createPlayList,
  getPlayList,
  deletePlayList,
} from "../controllers/playListController.js";

const router = Router();

router.post("/", auth, createPlayList);

router.get("/", auth, getPlayList);
router.delete("/", auth, deletePlayList);
export default router;
