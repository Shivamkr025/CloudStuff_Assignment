import mongoose from "mongoose";
import moment from 'moment-timezone';

const indianTimeZone = 'Asia/Kolkata';

const getCurrentISTDateTime = () => moment().tz(indianTimeZone).format('YYYY-MM-DD HH:mm:ss');


const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        enum: ['Backlog', 'In Discussion', 'In Progress', 'Done'],
        default: 'Backlog',
    },
    tags: {
        type: [String],
        default: [],
    },
    assignedUser: {
        type: String,
        ref: 'User',
    },
    project: {
        type: String,
        ref: 'Project',
        require: true,
    },
    createdAt: {
        type: String,
        default: getCurrentISTDateTime,
        immutable: true,
    },
    dueDate: {
        type: String,
        required: [true, 'Due date is required'],
    },
});


export const Task = mongoose.model('Task', taskSchema)