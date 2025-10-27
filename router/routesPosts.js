
import express from 'express';
import {
    createPost,
    getAllPosts,
    getOnePost,
    deletePost,
    updatePost,
    toggleLike
} from '../controller/controllersPosts.js';
const routerPosts = express.Router();

routerPosts.post('/create-post', createPost);
/**
 * @swagger
 * /posts/get-all-posts:
 *   get:
 *     summary: מחזיר את כל הפוסטים
 *     description: הפונקציה מחזירה מערך של כל הפוסטים הקיימים במסד הנתונים.
 *     responses:
 *       200:
 *         description: רשימת הפוסטים הוחזרה בהצלחה
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "68f636696224b535b2530358"
 *                   userId:
 *                     type: string
 *                     example: "132"
 *                   title:
 *                     type: string
 *                     example: "hello worlde"
 *                   message:
 *                     type: string
 *                     example: "12345"
 *                   pictures:
 *                     type: string
 *                     example: "url image"
 *                   likes:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["1"]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-20T13:17:29.046Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-26T09:27:16.056Z"
 *                   __v:
 *                     type: number
 *                     example: 4
 */
routerPosts.get('/get-all-posts', getAllPosts);
routerPosts.get('/get-one-post/:id', getOnePost);
routerPosts.delete('/delete-post/:id', deletePost);
routerPosts.patch('/update-post/:id', updatePost);
routerPosts.patch('/toggle-like/:id', toggleLike);

export default routerPosts;