import { Server } from 'socket.io';
import registerPostHandlers from './handlers/postsHandlers.js';

let io;
export function initIO(httpServer) {
    io = new Server(httpServer, {
        cors:
        {
            origin: "*",
            methods: ['GET', 'POST']
        }
    });
    io.on('connection', (socket) => {
        registerPostHandlers(io, socket);
    });
    return io;
}

export function getIO() {
    if (!io) throw new Error("IO not initialized");
    return io;
}