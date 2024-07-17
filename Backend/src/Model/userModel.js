import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, lowercase: true },
    password: { type: String, require: true }
})

export const User = mongoose.model('User' , userSchema)
