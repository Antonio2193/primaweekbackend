import express from 'express';
import { getPosts, createPost, getSinglePost, editPost, deletePost, patchPost } from '../controllers/post.controller.js';
import uploadCloudinary from '../middleware/uploadCloudinary.js';

const router = express.Router();
router.get('/', getPosts )

router.post('/', createPost)

router.get('/:id', getSinglePost)

router.put('/:id', editPost)

router.delete('/:id', deletePost)

router.patch('/:blogPostId/cover', uploadCloudinary.single('cover'), patchPost)

export default router