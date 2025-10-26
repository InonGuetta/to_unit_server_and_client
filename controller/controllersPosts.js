import {
    createOnePostService,
    getAllPostsService,
    getOnePostsService,
    deletePostService,
    updatePostService,
    addLikeService
} from '../service/postsServices.js';
import postModel from '../models/postModel.js';
import userModel from '../models/usersModel.js';


export async function createPost(req, res) {
    try {
        const createPost = await createOnePostService(req.body)
        if (!createPost) {
            res.status(400).send({ message: "The input does not meet the required conditions / does not exist" })
        }
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
        const onePostInfo = await getOnePostsService(req);
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
        const deleteOnePost = await deletePostService(req)
        if (!deleteOnePost) {
            res.status(404).send({ message: "the post to delete not found" })
        }
        res.status(200).send({ message: "the post deleted" })
        return
    } catch (e) {
        res.status(500).send({ message: "deleted failed" })
    }
}

export async function updatePost(req, res) {
    try {
        const updateOnePost = await updatePostService(req)
        if (!updateOnePost) {
            res.status(404).send({ message: "the post not found found" })
        }
        res.status(200).send({ message: "update success", newPost: updateOnePost })
        return
    } catch (e) {
        return res.status(500).send({ message: "update failed", err: e.message })
    }
}

export async function toggleLike(req, res) {
    try {
        const { emailUserId, id } = req.body;
        const emailId = await userModel.findOne({ emailUserId: emailUserId })
        const postId = await postModel.findOne({ _id: id })

        if (!emailId || !postId) {
            res.status(404).send({ message: "data of user or post not found" })
        }

        if (!addLikeService(emailId.emailUserId, postId._id)) res.status(400).send({ message: "The command failed." })
        res.status(200).send({message:"update likes work"})
    } catch (e) {
        res.status(500).send({ message: "update like failed", err: e.message })
    }
}