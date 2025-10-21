import express from 'express';
import { register, login, me } from '../controller/auth.controllers.js';
import { auth } from '../middleware/auth.middleware.js';

const routerAuth = express.Router();

routerAuth.post("/api/auth/register", register);
routerAuth.post("/api/auth/login", login);
routerAuth.get("/api/auth/me", auth, me);

export default routerAuth;
