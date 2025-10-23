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
        const { title, message, pictures, likes } = req.body;

        if (title !== undefined) onePostInfoToUpdate.title = title;
        if (message !== undefined) onePostInfoToUpdate.message = message;
        if (pictures !== undefined) onePostInfoToUpdate.pictures = pictures;

        // create function of likes
        // if (likes !== undefined) onePostInfoToUpdate.likes = likes;
        await onePostInfoToUpdate.save()
        return onePostInfoToUpdate
    } catch (e) {
        console.error("Error update post", e.message);
        throw e;
    }
}

export async function addLikeService(req, res) {
    // אבחון ה user וההוצאה של emailId שלו על מנת להוסיף אותו למערך של הלייקים 
    // אבחון ה post שלמערך של הלייקים שלו אתה צריך להוסיף את המייל שלו 
    // אחרי שמצאת את הפוסטט ואת היוזר
    // אני צריך לעדכן את ה מערך הלייק של הpot
    // בערך הסטרינג של ה user 
}