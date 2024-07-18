import { Task } from "../Model/taskModel.js";
import { Project } from "../Model/projectModel.js";

const createTask = async (req, res) => {
    const { taskName, description, status, tags, project, dueDate} = req.body;

    try {
        const findProject = await Project.findOne({ name: project });

        if (!findProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        // if (req.user.email !== findProject.email) {
        //     return res.status(403).json({ message: "You do not have permission to add tasks to this project" });
        // }

        const task = await Task.findOne({ taskName, project: findProject.name, assignedUser:req.user.email });

        if (task) {
            return res.status(400).json({ message: "Task with this name already exists in this project" });
        }

        const newTask = new Task({
            taskName,
            description,
            status,
            tags,
            project: findProject.name,
            assignedUser: req.user.email ,
            dueDate
        });

        await newTask.save();
        res.status(201).json({ task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while creating the task" });
    }
};

const viewAllTask = async (req, res) => {
    const {email} = req.body

    try {
        const admin = await Task.findOne({email})
        if(!admin){
        res.status(404).json({message:"Task not available!"})
        }
        res.status(200).json({admin})

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while creating the task" });
    }
}

const findTaskByUser = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedUser: req.user.email });
        if (!tasks || tasks.length === 0) {
            return res.status(401).json({ message: "No tasks found for the assigned user" });
        }

        const groupedTasks = {
            Backlog: [],
            InDiscussion: [],
            InProgress: [],
            Done: []
        };

        tasks.forEach(task => {
            groupedTasks[task.status.replace(' ', '')].push(task);
        });

        res.status(200).json({ message: "Tasks grouped by status fetched successfully", tasks: groupedTasks });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while fetching the tasks" });
    }
};

const updateTask = async (req, res) => {
    const { taskName, description, status, tags, project, dueDate } = req.body;

    try {
        const task = await Task.findOne({ project, assignedUser: req.user.email });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (req.user.email !== task.assignedUser) {
            return res.status(403).json({ message: "You do not have permission to update this task" });
        }

        task.taskName = taskName || task.taskName;
        task.description = description || task.description;
        task.status = status || task.status;
        task.tags = tags || task.tags;
        task.dueDate = dueDate || task.dueDate;

        await task.save();
        res.status(200).json({ task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while updating the task" });
    }
};


const deleteTask = async (req, res) => {
    const {project} = req.body
    try {
        const task = await Task.findOneAndDelete({project });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (req.user.email !== task.assignedUser) {
            return res.status(403).json({ message: "You do not have permission to delete this task" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while deleting the task" });
    }
};

const getTasksByStatus = async (req, res) => {
    const { status } = req.params;

    try {
        const tasks = await Task.find({ status });
        res.status(200).json({ tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while fetching tasks" });
    }
};



export { createTask, viewAllTask, findTaskByUser , updateTask , deleteTask , getTasksByStatus};
