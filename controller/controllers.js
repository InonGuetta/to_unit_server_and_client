import post from '../DAL/postModel.js';

export async function createPost(req, res) {
    try {
        const newPost = req.body;
        if (!newPost || newPost.length == 0) {
            res.status(400).send({ message: "Empty or invalid " })
        }

        const Post = post;
        const toNewPost = new Post(newPost);
        await toNewPost.save()

        res.status(200).send({ message: "new post created", post: toNewPost })
        return

    } catch (e) {
        res.status(500).send({ message: "the function not working", error: e.message })
    }
}

export async function getAllPosts(req, res) {
    try {
        const AllData = await post.find({})
        res.status(200).send({ message: "get all data succssefuly", posts: AllData })
        return AllData
    } catch (e) {
        res.status(500).send({ message: 'get all data failed' })
    }
}

export async function getOnePost(req, res) {
    try {
        const allData = await post.findOne({ title: req.body.title });
        if (!allData) {
            res.status(404).send({ message: "Post not found" });
        }
        return res.status(200).send(allData)
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
        const toDelete = await post.findOneAndDelete({ _id: id })
        if (!toDelete) {
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
        const { title, message, pictures } = req.body;

        const updateNumber = await post.findOne({ _id: id });
        if (!updateNumber) return res.status(404).send({ message: 'not found' });

        //התנאי מקריס את הקוד 
        // if (!title || !message || pictures || title.length === 0 || message.length === 0 || pictures.length === 0) {
        //     return res.status(400).send({ message: "input not legal" })
        // }


        const toUpdate = await post.findOneAndUpdate(
            { _id: id },
            { $set: { title, message, pictures } },
            { new: true }
        );

        if (title !== undefined) updateNumber.title = title;
        if (message !== undefined) updateNumber.message = message;
        if (pictures !== undefined) updateNumber.pictures = pictures;

        await updateNumber.save()
        return res.status(200).send({ message: "update success", newPost: toUpdate, updates: updateNumber })

    } catch (e) {
        return res.status(500).send({ message: "update failed", err: e.message })
    }
}