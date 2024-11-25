import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from '../controllers/post.controller.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/create', verifyToken, createPost);
router.delete('/:id', verifyToken, deletePost);
router.put('/:id', verifyToken, updatePost);

export default router;
