import express from 'express';
import { getPosts, createPost, getSinglePost, editPost, deletePost } from '../controllers/post.controller.js';


const router = express.Router();
router.get('/', getPosts )

router.post('/', createPost)

router.get('/:id', getSinglePost)

router.put('/:id', editPost)

router.delete('/:id', deletePost)

export default router