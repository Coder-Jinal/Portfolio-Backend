const mongoose = require("mongoose");
const db = require("../../db");

const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: Buffer,  // This will store the image as binary data
    imageType: String,  
    projectUrl: String,
    githubUrl: String,
    techStack: [String]
});

const Project = mongoose.model("Project", ProjectSchema);

async function initializeProject() {
    const projectData = [
        {
            name: "Event Management System",
            description: "A platform where users can create, manage, and register for events efficiently.",
            image: null,  // Initially no image
            imageType: '',
            projectUrl: "https://example.com/event-system",
            githubUrl: "https://github.com/yourusername/event-system",
            techStack: ["ASP.NET Core", "C#", "Entity Framework", "SQL Server", "HTML", "CSS"]
        },
        {
            name: "QuitBuddy",
            description: "An interactive platform that encourages smokers to quit smoking.",
            image: null,  // Initially no image
            imageType: '',
            projectUrl: "https://example.com/quitbuddy",
            githubUrl: "https://github.com/yourusername/quitbuddy",
            techStack: ["HTML", "CSS", "jQuery"]
        }
    ];

    try {
        await Project.deleteMany({}); // Clear existing projects
        const result = await Project.insertMany(projectData);
        console.log("Projects initialized:", result);
    } catch (error) {
        console.error("Error initializing projects:", error);
        throw error;
    }
}

async function getProject() {
    try {
        await db.connect();
        const projects = await Project.find({});
        console.log("Fetched Projects:", projects);
        return projects;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
}

async function addProject(name, description, imageBuffer, imageType, projectUrl, githubUrl, techStack) {
    try {
        await db.connect();
        const newProject = new Project({ name, description, imageBuffer, imageType, projectUrl, githubUrl, techStack });
        const result = await newProject.save();
        console.log("New Project Added:", result);
        return result;
    } catch (error) {
        console.error("Error adding project:", error);
        throw error;
    }
}

async function deleteProject(id) {
    try {
        await db.connect();
        const result = await Project.deleteOne({ _id: id });
        console.log("Delete result:", result);
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
    }
}

async function updateProject(id, name, description, imageBuffer, imageType, projectUrl, githubUrl, techStack) {
    try {
        await db.connect();
        
        // Find and update the project with the new values
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { name, description, imageBuffer, imageType, projectUrl, githubUrl, techStack },
            { new: true }  
        );

        console.log("Updated Project:", updatedProject);
        return updatedProject;
    } catch (error) {
        console.error("Error updating project:", error);
        throw error;
    }
}

module.exports = {
    initializeProject,
    getProject,
    addProject,
    deleteProject,
    updateProject
};