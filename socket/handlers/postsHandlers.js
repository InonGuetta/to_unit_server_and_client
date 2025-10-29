import { getAllPostsService } from '../../service/postsServices.js';

export default function registerPostHandlers(io, socket) {
    socket.on('posts.getAll', async (payload, cb) => {
        try {
            const posts = await getAllPostsService();
            if (cb) return cb({ ok: true, posts });
            socket.emit('posts:list', posts);
        } catch (e) {
            if (cb) return cb({ ok: false, error: e.message });
            socket.emit('posts:error', { action: 'getAll', error: e.message });
        }
    });
}