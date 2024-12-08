import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.get("/:userId", getUser);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.post("/signout", signout);

export default router;
