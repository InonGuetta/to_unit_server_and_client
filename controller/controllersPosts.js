import {
    createOnePostService,
    getAllPostsService,
    getOnePostsService,
    deletePostService,
    updatePostService,
    addLikeService
} from '../service/postsServices.js';
import { getOneUserService } from '../service/usersServices.js';
import { getIO } from '../socket/index.js';


export async function createPost(req, res) {
    try {
        const createPost = await createOnePostService(req.body)
        if (!createPost) {
            res.status(400).send({ message: "The input does not meet the required conditions / does not exist" })
        }
        getIO().emit("posts:created", { post: createPost });
        res.status(201).send({ message: "post add", post: createPost })
        return
    } catch (e) {
        res.status(500).send({ message: "the added not working", error: e.message })
    }
}

export async function getAllPosts(req, res) {
    try {
        const allPostsInfo = await getAllPostsService()
        if (!allPostsInfo) {
            res.status(404).send({ message: "data not found" })
        }
        res.status(200).send({ message: "get all data succssefuly", posts: allPostsInfo })
        return
    } catch (e) {
        res.status(500).send({ message: "get all data failed", error: e.message })
    }
}

export async function getOnePost(req, res) {
    try {
        const onePostInfo = await getOnePostsService(req.params.id);
        if (!onePostInfo) {
            res.status(404).send({ message: "Post not found" });
        }
        res.status(200).send({ message: "the post found", post: onePostInfo })
        return
    } catch (e) {
        res.status(500).send({ message: 'get one post failed', error: e.message })
    }
}

export async function deletePost(req, res) {
    try {
        const deleteOnePost = await deletePostService(req.params.id)
        if (!deleteOnePost) {
            res.status(404).send({ message: "the post to delete not found" })
        }
        getIO().emit("posts:deleted", { postId: updated.postId || req.params.id, post: updated })
        res.status(200).send({ message: "the post deleted" })
        return
    } catch (e) {
        res.status(500).send({ message: "deleted failed" })
    }
}

export async function updatePost(req, res) {
    try {
        const updateOnePost = await updatePostService(req.params.id, req.body)
        if (!updateOnePost) {
            res.status(404).send({ message: "the post not found found" })
        }
        getIO().emit("posts:updatesd", { postId: updateOnePost._id || req.params.id, post: updateOnePost })
        res.status(200).send({ message: "update success", newPost: updateOnePost })
        return
    } catch (e) {
        return res.status(500).send({ message: "update failed", err: e.message })
    }
}

export async function toggleLike(req, res) {
    try {
        console.log("Insert post")
        const postId = req.params.id
        const { emailUserId } = req.body;
        const userInfo = await getOneUserService(emailUserId)
        const postInfo = await getOnePostsService(postId)

        if (!userInfo || !postInfo) {
            res.status(404).send({ message: "data of user or post not found" })
        }

        if (!addLikeService(userInfo.emailUserId, postInfo._id)) res.status(400).send({ message: "The command failed." })
        getIO().emit("posts:updated", { postId, post: refreshed, likesCount: Array.isArray(refreshed?.likes) ? refreshed.likes.length : 0
    });
        res.status(200).send({ message: "update likes work" })
    } catch (e) {
        res.status(500).send({ message: "update like failed", err: e.message })
    }
}