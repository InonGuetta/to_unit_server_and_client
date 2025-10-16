import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    msg: {
        type: String,
        required: false
    }
}, {
    timestamps: false
});

const Post = mongoose.model('Post', postSchema, 'posts');
    
export default Post;
