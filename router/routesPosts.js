import express from 'express';
import {
    createPost,
    getAllPosts,
    getOnePost,
    deletePost,
    updatePost
} from '../controller/controllersPosts.js';
const routerPosts = express.Router();

routerPosts.post('/create-post', createPost);
routerPosts.get('/get-all-posts', getAllPosts);
routerPosts.get('/get-one-post/:id', getOnePost);
routerPosts.delete('/delete-post/:id', deletePost);
routerPosts.patch('/update-post/:id', updatePost);

export default routerPosts;