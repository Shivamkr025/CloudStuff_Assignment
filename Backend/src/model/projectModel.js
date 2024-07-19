import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        ref: 'User',
        require: true,
    },
    status: {
        type: String,
        enum: ['active', 'canceled'],
        default: 'active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Project = mongoose.model('Project', projectSchema)