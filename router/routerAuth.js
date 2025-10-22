import express from 'express';
import { register, login } from '../controller/auth.controllers.js';
import { auth } from '../middleware/auth.middleware.js';

const routerAuth = express.Router();

// לבדוק האם זה שונה מהחלק השני  
// routerAuth.post("/api/auth/register", register);
// routerAuth.post("/api/auth/login", login);
// routerAuth.get("/api/auth/me", auth, me);


// לבדוק האם יש הבדל בין זה לבין 
routerAuth.post("/register-to-web", register);
// routerAuth.post("/api-auth-login", login);
// routerAuth.get("/api-auth-me", auth);

export default routerAuth;
