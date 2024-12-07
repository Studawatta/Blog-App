import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { writeCommnet } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", verifyToken, writeCommnet);

export default router;
