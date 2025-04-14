const mongoose = require("mongoose");
const db = require("../../db");

// Creating the schema for skills
const SkillSchema = new mongoose.Schema({
    name: String,
    proficiency: String, 
    yearsOfExperience: Number
});

const Skill = mongoose.model("Skill", SkillSchema);

// Function to initialize the skills collection with some sample data
async function initializeSkills() {
    const skillData = [
        {
            name: "JavaScript",
            proficiency: "Advanced",
            yearsOfExperience: 5
        },
        {
            name: "Python",
            proficiency: "Intermediate",
            yearsOfExperience: 3
        }
    ];

    await Skill.insertMany(skillData);
}

// Fetch all skills from the database
async function getSkills() {
    await db.connect();
    return await Skill.find({});
}

// Add a new skill to the database
async function addSkill(name, proficiency, yearsOfExperience) {
    await db.connect();
    let newSkill = new Skill({
        name: name,
        proficiency: proficiency,
        yearsOfExperience: yearsOfExperience
    });

    let result = await newSkill.save();
    console.log(result);
}

// Delete a skill by ID
async function deleteSkill(id) {
    await db.connect();
    let result = await Skill.deleteOne({ _id: id });
    console.log(result);
}

// Update a skill in the database
async function updateSkill(skillId, name, proficiency, yearsOfExperience) {
    await db.connect();

    try {
        const updatedSkill = await Skill.findByIdAndUpdate(
            skillId,
            { name, proficiency, yearsOfExperience },
            { new: true } 
        );

        return updatedSkill;
    } catch (error) {
        console.error("Error updating skill:", error);
        throw error;
    }
}

// Export functions for use in other files
module.exports = {
    initializeSkills,
    getSkills,
    addSkill,
    deleteSkill,
    updateSkill
};
