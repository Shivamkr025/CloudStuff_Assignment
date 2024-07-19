import { Project } from "../model/projectModel.js";
import { Task } from "../model/taskModel.js";

const getDashboardData = async (req, res) => {
    try {
        const project = await Project.find({ email: req.user.email });
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

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

        res.status(200).json({
            message: "Project and tasks fetched successfully",
            project,
            tasks: groupedTasks
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while retrieving the dashboard data." });
    }
};

export { getDashboardData };
