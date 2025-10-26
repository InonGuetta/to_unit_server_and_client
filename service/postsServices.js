import postModel from "../models/postModel.js";


export async function createOnePostService(data) {
    try {
        if (!data ||
            Object.keys(data).length === 0) {
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

export async function getOnePostsService(postId) {
    try {
        const onePostsInfo = await postModel.findOne({postId })
        if (!onePostsInfo) {
            return null;
        }
        return onePostsInfo
    } catch (e) {
        console.error("Error fetching post", e.message);
        throw e;
    }
}

export async function deletePostService(postId) {
    try {
        const deleteOnePost = await postModel.findOneAndDelete({postId})
        if (!deleteOnePost) {
            return null;
        }
        return deleteOnePost
    } catch (e) {
        console.error("Error delete post", e.message);
        throw e;
    }
}

export async function updatePostService(postId, data) {
    try {
        const onePostInfoToUpdate = await postModel.findOne({postId});
        if (!onePostInfoToUpdate) {
            return null;
        }
        const toUpdate = {}
        if (data.title !== undefined) toUpdate.title = data.title;
        if (data.message !== undefined) toUpdate.message = data.message;
        if (data.pictures !== undefined) toUpdate.pictures = data.pictures;

        onePostInfoToUpdate.set(toUpdate)
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
