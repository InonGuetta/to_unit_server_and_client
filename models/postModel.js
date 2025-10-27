import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    pictures: {
        type: String,
        trim: true,
        required: false
    },
    likes: {
        type: [String],
        required: false,
        default: [],
        trim:true
    }
 
}, {
    timestamps: true,
    versionKey: '__v',
    optimisticConcurrency: true
});

const postModel = mongoose.model('postModel', postSchema, 'posts');

export default postModel;
