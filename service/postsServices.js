import postModel from "../models/postModel.js";


export async function createOnePostService(data) {
    try {
        if (!data || Object.keys(data).length === 0) {
            return null;
        }
        const insertDbOnePost = new postModel(data)
        return insertDbOnePost.save()
    } catch (e) {
        console.error("Error create post", e.message);
        throw e;
    }
}

export async function getAllPostsService() {
    try {
        const allPostsInfo = await postModel.find({})
        if (!allPostsInfo) {
            return null;
        }
        return allPostsInfo
    } catch (e) {
        console.error("Error fetching post", e.message);
        throw e;
    }
}

export async function getOnePostsService(req) {
    try {
        const onePostsInfo = await postModel.findOne({ _id: req.params.id })
        if (!onePostsInfo) {
            return null;
        }
        return onePostsInfo
    } catch (e) {
        console.error("Error fetching post", e.message);
        throw e;
    }
}

export async function deletePostService(req) {
    try {
        const deleteOnePost = await postModel.findOneAndDelete({ _id: req.params.id })
        if (!deleteOnePost) {
            return null;
        }
        return deleteOnePost
    } catch (e) {
        console.error("Error delete post", e.message);
        throw e;
    }
}

export async function updatePostService(req) {
    try {
        const onePostInfoToUpdate = await postModel.findOne({ _id: req.params.id });
        if (!onePostInfoToUpdate) {
            return null;
        }
        const { title, message, pictures } = req.body;

        if (title !== undefined) onePostInfoToUpdate.title = title;
        if (message !== undefined) onePostInfoToUpdate.message = message;
        if (pictures !== undefined) onePostInfoToUpdate.pictures = pictures;

        await onePostInfoToUpdate.save()
        return onePostInfoToUpdate
    } catch (e) {
        console.error("Error update post", e.message);
        throw e;
    }
}

export async function addLikeService(userEmailiId, postId) {
    try {
        const onePost = await postModel.findOne({ _id: postId });
        if (!onePost) throw new Error("post not found");

        if (!onePost.likes.includes(userEmailiId)) {
            onePost.likes.push(userEmailiId);
            await onePost.save()
            return
        }
        
        onePost.likes = onePost.likes.filter(item => item !== userEmailiId);
        await onePost.save();
        return
    } catch (e) {
        console.error("Error update addLike post", e.message);
        throw e;
    }
}
