import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createPost, getPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/create', verifyToken, createPost);

export default router;
