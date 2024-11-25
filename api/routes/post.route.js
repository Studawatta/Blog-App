import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createPost,
  getPosts,
  deletePost,
} from '../controllers/post.controller.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/create', verifyToken, createPost);
router.delete('/:id', verifyToken, deletePost);

export default router;
