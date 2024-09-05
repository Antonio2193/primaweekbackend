import express from 'express';
import { getAuthors, createAuthor, getSingleAuthor, editAuthor, deleteAuthor, patchAuthor } from '../controllers/author.controller.js';
import uploadCloudinary from '../middleware/uploadCloudinary.js';


const router = express.Router();
router.get('/', getAuthors )

router.post('/', uploadCloudinary.single('avatar'), createAuthor)

router.get('/:id', getSingleAuthor)

router.put('/:id', editAuthor)

router.delete('/:id', deleteAuthor)

router.patch('/:authorId/avatar', uploadCloudinary.single('avatar'), patchAuthor)

export default router