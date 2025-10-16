import express from 'express';
import { createPost, getAllPosts, getOnePost, deletePost, updatePost } from '../controller/controllers.js';
const router = express.Router();

router.post('/create-post', createPost);
router.get('/all-posts', getAllPosts);
router.get('/one-post', getOnePost);
router.delete('/delete-post', deletePost);
router.patch('/update-post/:id', updatePost);

export default router;