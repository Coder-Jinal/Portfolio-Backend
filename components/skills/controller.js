// const skillModel = require("./model");

// // List all skills
// const listSkills = async (request, response) => {
//     let skillData = await skillModel.getSkills();

//     if (!skillData.length) {
//         await skillModel.initializeSkills();
//         skillData = await skillModel.getSkills();
//     }

//     response.render("skills/list", { skills: skillData });
// };

// // Show the add skill form
// const showAddForm = async (request, response) => {
//     response.render("skills/add");
// };

// // Add a new skill
// const addNewSkill = async (request, response) => {
//     let result = await skillModel.addSkill(
//         request.body.name,
//         request.body.proficiency,
//         request.body.yearsOfExperience
//     );

//     console.log(result);
//     response.redirect("../list");
// };

// // Delete a skill by ID
// const deleteSkillById = async (request, response) => {
//     let id = request.query.skillId;
//     await skillModel.deleteSkill(id);
//     console.log(id);
//     response.redirect("../list");
// };

// // Export controllers
// module.exports = {
//     listSkills,
//     showAddForm,
//     addNewSkill,
//     deleteSkillById
// };


const skillModel = require("./model");

const listSkills = async (request, response) => {
    try {
        let skillData = await skillModel.getSkills();

        if (!skillData.length) {
            await skillModel.initializeSkills();
            skillData = await skillModel.getSkills();
        }

        response.status(200).json({ success: true, skills: skillData });
    } catch (error) {
        console.error("Error fetching skills:", error);
        response.status(500).json({ success: false, message: "Error fetching skills" });
    }
};

const addNewSkill = async (request, response) => {
    try {
        const result = await skillModel.addSkill(
            request.body.name,
            request.body.proficiency,
            request.body.yearsOfExperience
        );

        response.status(201).json({ success: true, message: "Skill added", skill: result });
    } catch (error) {
        console.error("Error adding skill:", error);
        response.status(500).json({ success: false, message: "Error adding skill" });
    }
};

const deleteSkillById = async (request, response) => {
    try {
        const id = request.query.skillId;
        await skillModel.deleteSkill(id);

        response.status(200).json({ success: true, message: `Skill with ID ${id} deleted` });
    } catch (error) {
        console.error("Error deleting skill:", error);
        response.status(500).json({ success: false, message: "Error deleting skill" });
    }
};

const updateSkill = async (request, response) => {
    try {
        const { skillId, name, proficiency, yearsOfExperience } = request.body;

        // Ensure that all required fields are provided
        if (!skillId || !name || !proficiency || yearsOfExperience === undefined) {
            return response.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Update skill in the database
        const updatedSkill = await skillModel.updateSkill(skillId, name, proficiency, yearsOfExperience);

        // If no skill was found with the given ID, send an error
        if (!updatedSkill) {
            return response.status(404).json({ success: false, message: "Skill not found" });
        }

        // Send back the updated skill
        response.status(200).json({ success: true, message: "Skill updated successfully", skill: updatedSkill });
    } catch (error) {
        console.error("Error updating skill:", error);
        response.status(500).json({ success: false, message: "Error updating skill" });
    }
};

module.exports = {
    listSkills,
    addNewSkill,
    deleteSkillById,
    updateSkill
};

