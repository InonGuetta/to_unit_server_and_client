import express from 'express';
import dotenv from 'dotenv';
import { Server } from "socket.io";
import http from 'http';
import routerPosts from './router/routesPosts.js';
import routerUsers from './router/routesUsers.js';
import routerAuth from './router/routerAuth.js';
import { connectDB } from './config/db.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { initIO } from './socket/index.js';


dotenv.config();
const server = express();

const httpServer = http.createServer(server);
const io = initIO(httpServer)

io.on('connection', (socket) => {
  console.log("socket connected", socket.id);
  socket.on('ping', (data) => {
    socket.emit('pong', { ok: true, at: Date.now() });
  });
  socket.on('disconnect', (reason) => {
    console.log('socket disconnected:', reason);
  });
});

server.use(express.json());
server.use('/posts', routerPosts);
server.use('/users', routerUsers);
server.use('/auth', routerAuth);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Posts API',
      version: '1.0.0',
      description: 'API Documentation for Posts project',
    },
  },
  apis: ['./router/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    httpServer.listen(process.env.PORT, () => {
      console.log(`you listen to port ${process.env.PORT}`);
    });
  } catch (e) {
    console.error('Faild to start server', e);
    process.exit(1);
  }
})();