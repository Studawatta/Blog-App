import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  writeCommnet,
  getCommnets,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", verifyToken, writeCommnet);
router.get("/:postId", getCommnets);

export default router;
