import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createPlayList,
  getPlayList,
} from "../controllers/playListController.js";

const router = Router();

router.post("/", auth, createPlayList);

router.get("/", auth, getPlayList);
export default router;
