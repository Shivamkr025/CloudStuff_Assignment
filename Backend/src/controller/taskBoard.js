import { Task } from "../model/taskModel.js";


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


export {findTaskByUser}