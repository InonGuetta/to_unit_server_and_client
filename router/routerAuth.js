import express from 'express';
import { register, login } from '../controller/auth.controllers.js';
import { auth } from '../middleware/auth.middleware.js';

const routerAuth = express.Router();
 
routerAuth.post("/register", register);
routerAuth.post("/login", login);

export default routerAuth;
