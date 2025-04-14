// const projectModel = require("./model");
// const listProject = async (request, response) => {
//     try {
//         let projectData = await projectModel.getProject();
//         console.log("Fetched Projects:", projectData); 
//         if (!projectData.length) {
//             await projectModel.initializeProject();
//             projectData = await projectModel.getProject();
//             console.log("After initialization:", projectData); 
//         }
//         response.render("projects/list", { projects: projectData });
//     } catch (error) {
//         console.error("Error fetching projects:", error);
//         response.status(500).send("Error fetching projects");
//     }
// };

// const showAddForm = async (request, response) => {
//     response.render("projects/add");
// };

// const addNewProject = async (request, response) => {
//     let result = await projectModel.addProject(
//         request.body.name,
//         request.body.description,
//         request.body.technology
//     );

//     console.log("New project added:", result);
//     response.redirect("../list");
// };

// const deleteProjectById = async (request, response) => {
//     let id = request.query.projId;
//     await projectModel.deleteProject(id);
//     console.log("Project deleted with ID:", id);
//     response.redirect("../list");
// };

// module.exports = {
//     listProject,
//     showAddForm,
//     addNewProject,
//     deleteProjectById
// };


const projectModel = require("./model");

const listProjects = async (request, response) => {
    try {
        let projectData = await projectModel.getProject();

        if (!projectData.length) {
            await projectModel.initializeProject();
            projectData = await projectModel.getProject();
        }

        response.status(200).json({ success: true, projects: projectData });
    } catch (error) {
        console.error("Error fetching projects:", error);
        response.status(500).json({ success: false, message: "Error fetching projects" });
    }
};

const addNewProject = async (request, response) => {
    try {
        const { name, description, githubUrl, techStack } = request.body;
        
        // Assuming image is uploaded through multer and is available in req.file
        const imageBuffer = request.file ? request.file.buffer : null;  // Buffer for image file
        const imageType = request.file ? request.file.mimetype : '';  // Image MIME type

        const result = await projectModel.addProject(
            name,
            description,
            imageBuffer,  // Store the image as binary data
            imageType,  // Store the MIME type of the image
            githubUrl,
            techStack.split(',')  // Convert techStack from comma-separated string to an array
        );

        response.status(201).json({ success: true, message: "Project added", project: result });
    } catch (error) {
        console.error("Error adding project:", error);
        response.status(500).json({ success: false, message: "Error adding project" });
    }
};

const deleteProjectById = async (request, response) => {
    try {
        const id = request.query.projId;
        await projectModel.deleteProject(id);

        response.status(200).json({ success: true, message: `Project with ID ${id} deleted` });
    } catch (error) {
        console.error("Error deleting project:", error);
        response.status(500).json({ success: false, message: "Error deleting project" });
    }
};

const updateProjectById = async (request, response) => {
    try {
        const { projId } = request.query;
        const { name, description, imageUrl, projectUrl, githubUrl, techStack } = request.body;

        // Assuming image is uploaded through multer and is available in req.file
        const imageBuffer = request.file ? request.file.buffer : null;  // Buffer for image file
        const imageType = request.file ? request.file.mimetype : '';  // Image MIME type

        const updatedProject = await projectModel.updateProject(
            projId,
            name,
            description,
            imageBuffer,  // Update the image as binary data
            imageType,
            projectUrl,
            githubUrl,
            techStack.split(',')
        );

        if (updatedProject) {
            response.status(200).json({ success: true, message: "Project updated", project: updatedProject });
        } else {
            response.status(404).json({ success: false, message: "Project not found" });
        }
    } catch (error) {
        console.error("Error updating project:", error);
        response.status(500).json({ success: false, message: "Error updating project" });
    }
};

module.exports = {
    listProjects,
    addNewProject,
    deleteProjectById,
    updateProjectById,
};

