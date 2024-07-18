import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'canceled'],
        default: 'active',
    },
});

export const Project = mongoose.model('Project', projectSchema)