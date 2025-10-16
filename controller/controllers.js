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
        const { title } = req.body;
        if (!title || title.length == 0) {
            return res.status(400).send({ message: "you insert empty" })
        }

        const result = await post.findOneAndDelete({ title })
        if (!result) {
            return res.status(404).send({ message: "title not found" })
        }
        return res.status(200).send({ message: "deleted seccessed" })
    } catch (e) {
        res.status(500).send({ message: "deleted failed" })
    }
}

export async function updatePost(req, res) {
    try {
        const { id } = req.params;
        const { title, msg } = req.body;

        if(!title || !msg || title.length === 0 || msg.length === 0){
            return res.status(400).send({message:"input not legal"})
        }
        const toUpdate = await post.findOneAndUpdate(
            { _id: id },
            { $set: { title, msg } },
            {new:true}
        );
        return res.status(200).send({message:"update success",newPost: toUpdate})

    } catch (e) {
        return res.status(500).send({ message: "update failed", err: e.message })
    }
}