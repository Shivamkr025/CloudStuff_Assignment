import { Project } from "../Model/projectModel.js";

const createProject = async (req, res) => {
    const { name, description } = req.body;

    try {
        const project = await Project.findOne({ name, email: req.user.email });
        if (project) {
            return res.status(400).json({ message: 'Project with this name already exists for the user.' });
        }
        
        const newProject = new Project({
            name,
            description,
            email: req.user.email,
        });

        await newProject.save();
        res.status(201).json({ project: newProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while creating the project." });
    }
};

const getProject = async (req, res) => {
    try {
        const project = await Project.findOne({email: req.user.email });
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        res.status(200).json({ project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while retrieving the project." });
    }
};


const getAllProject = async (req, res) => {
    try {
        const project = await Project.find({ });
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        res.status(200).json({ project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while retrieving the project." });
    }
};


const updateProject = async (req, res) => {
    const { name, newName, description } = req.body
    try {
        const updateProject = await Project.findOne({ name, email: req.user.email })
        if (!updateProject) {
            return res.status(401).json({ message: "Project not found" })
        }

        const submit = await Project.findOneAndUpdate(
            { name, email: req.user.email },
            {
                name: newName || updateProject.name,
                description: description || updateProject.description
            },
            { new: true }
        )

        res.status(201).status({ submit })


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while retrieving the update project" });
    }
}

const cancelProject = async (req, res) => {
    const { name } = req.body;

    try {
        const project = await Project.findOne({ name, email: req.user.email });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const canceledProject = await Project.findOneAndUpdate(
            { name, email: req.user.email },
            { status: 'canceled' },
            { new: true }
        );

        res.status(200).json({ project: canceledProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while canceling the project." });
    }
};

export {createProject , getProject ,getAllProject, updateProject , cancelProject}