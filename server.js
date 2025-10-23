import express from 'express';
import dotenv from 'dotenv';
import routerPosts from './router/routesPosts.js';
import routerUsers from './router/routesUsers.js';
import routerAuth from './router/routerAuth.js';
import { connectDB } from './config/db.js';

dotenv.config();
const server = express();

server.use(express.json());
server.use('/posts', routerPosts);
server.use('/users', routerUsers);
server.use('/auth', routerAuth);


(async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        server.listen(process.env.PORT, () => {
            console.log(`you listen to port ${process.env.PORT}`);
        })
    } catch (e) {
        console.error('Faild to start server', e);
        process.exit(1);
    }
})();
