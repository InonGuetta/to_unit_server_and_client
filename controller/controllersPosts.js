import postModel from '../DAL/postModel.js';

export async function createPost(req, res) {
    try {
        const createNewPost = req.body;

        if (!createNewPost) {
            res.status(400).send({ message: "input invalid" })
        }

        const createPost = new postModel(createNewPost);
        await createPost.save()

        res.status(200).send({ message: "new post created", post: createPost })
        return

    } catch (e) {
        res.status(500).send({ message: "the added not working", error: e.message })
    }
}

export async function getAllPosts(req, res) {
    try {
        const allPostsInfo = await postModel.find({})
        res.status(200).send({ message: "get all data succssefuly", posts: allPostsInfo })
        return allPostsInfo
    } catch (e) {
        res.status(500).send({ message: 'get all data failed' })
    }
}

export async function getOnePost(req, res) {
    try {
        const onePostInfo = await postModel.findOne({ title: req.params.title });
        if (!onePostInfo) {
            res.status(404).send({ message: "Post not found" });
        }
        return res.status(200).send(onePostInfo)
    } catch (e) {
        res.status(500).send({ message: 'get one post failed' })
    }
}

export async function deletePost(req, res) {
    try {
        const { id } = req.params;
        if (id.length === 0) {
            return res.status(400).send({ message: "id its empty" })
        }
        const deleteOnePost = await postModel.findOneAndDelete({ _id: id })
        if (!deleteOnePost) {
            return res.status(404).send({ message: "id its not found" })
        }
        res.status(200).send({ message: "the post deleted" })

    } catch (e) {
        console.log("delete");
        res.status(500).send({ message: "deleted failed" })
    }
}

export async function updatePost(req, res) {
    try {
        const { id } = req.params;
        const { title, message, pictures, likes } = req.body;

        const postInfo = await postModel.findOne({ _id: id });
        if (!postInfo) return res.status(404).send({ message: 'not found' });

        if (title !== undefined) postInfo.title = title;
        if (message !== undefined) postInfo.message = message;
        if (pictures !== undefined) postInfo.pictures = pictures;
        if (likes !== undefined) postInfo.likes = likes;

        await postInfo.save()
        return res.status(200).send({ message: "update success", newPost: postInfo })

    } catch (e) {
        return res.status(500).send({ message: "update failed", err: e.message })
    }
}