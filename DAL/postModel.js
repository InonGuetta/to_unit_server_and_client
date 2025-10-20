import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false,
        trim: true
    },
    message: {
        type: String,
        required: false,
        trim: true
    },
    pictures: {
        type: String,
        trim: true,
        required: false
    }
}, {
    timestamps: true,
    versionKey: '__v',
    optimisticConcurrency: true
});

const Post = mongoose.model('Post', postSchema, 'posts');

export default Post;
