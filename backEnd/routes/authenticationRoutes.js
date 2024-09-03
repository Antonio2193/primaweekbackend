import express from 'express';
import { login, register, me } from '../controllers/authentication.controller.js';
import authorization from '../middleware/authorization.js';
/* import passport from 'passport'; */
import uploadCloudinary from '../middleware/uploadCloudinary.js';

const authenticationRouter = express.Router();

authenticationRouter.post('/register', uploadCloudinary.single('avatar'), register);
authenticationRouter.post('/login', login);
authenticationRouter.get('/me', authorization, me);

export default authenticationRouter