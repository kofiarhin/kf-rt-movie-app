import { Router } from "express";

const router = Router();

router.post("/", async (req, res, next) => {
  return res.json({ message: "save to playlist" });
});
export default router;
