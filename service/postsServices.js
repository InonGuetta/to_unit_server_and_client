import postModel from "../models/postModel.js";

export async function createOnePostService(data) {
    if (!data || Object.keys(data).length === 0) {
        return null;
    }
    const insertDbOnePost = new postModel(data)
    return insertDbOnePost.save()
}

export async function getAllPostsService() {
    const allPostsInfo = await postModel.find({})
    if (!allPostsInfo) {
        return null;
    }
    return allPostsInfo
}

export async function getOnePostsService(req) {
    const onePostsInfo = await postModel.findOne({ id: req.params.id })
    if (!onePostsInfo) {
        return null;
    }
    return onePostsInfo
}

export async function deletePostService(req) {
    const deleteOnePost = await postModel.findOneAndDelete({ id: req.params.id })
    if (!deleteOnePost) {
        return null;
    }
    return deleteOnePost
}

export async function updatePostService(req) {
    const onePostInfoToUpdate = await postModel.findOne({ id: req.params.id });
    
    if (!onePostInfoToUpdate) {
        return null;
    }
    
    const { title, message, pictures, likes } = req.body;

    if (title !== undefined) onePostInfoToUpdate.title = title;
    if (message !== undefined) onePostInfoToUpdate.message = message;
    if (pictures !== undefined) onePostInfoToUpdate.pictures = pictures;
    if (likes !== undefined) onePostInfoToUpdate.likes = likes;

    await onePostInfoToUpdate.save()
    return onePostInfoToUpdate
}