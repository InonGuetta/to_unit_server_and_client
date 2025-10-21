import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    userFirstName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailUserId: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true,
    versionKey: '__v',
    optimisticConcurrency: true
});

const userModel = mongoose.model('userModel', usersSchema, 'users')

export default userModel;