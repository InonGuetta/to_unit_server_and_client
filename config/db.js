import mongoose from "mongoose";

export async function connectDB(url) {
    if (mongoose.connection.readyState >= 1) return;
    mongoose.set('strictQuery', true);
    await mongoose.connect(url,{
        dbName:'POSTS_DB',
    });
}