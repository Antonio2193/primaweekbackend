import express from 'express';
import { getAuthors, createAuthor, getSingleAuthor, editAuthor, deleteAuthor } from '../controllers/author.controller.js';


const router = express.Router();
router.get('/', getAuthors )

router.post('/', createAuthor)

router.get('/:id', getSingleAuthor)

router.put('/:id', editAuthor)

router.delete('/:id', deleteAuthor)

export default router