const mongoose = require("mongoose");
const db = require("../../db");

const ExperienceSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    description: String,
    skills: [String]
});

const Experience = mongoose.model("Experience", ExperienceSchema);

async function initializeExperiences() {
    const experienceData = [
        {
            title: "Web Developer",
            company: "Tech Solutions Inc.",
            location: "Vancouver, BC",
            startDate: "January 2022",
            endDate: "Present",
            description: "Developed and maintained client websites using modern web technologies.",
            skills: ["React", "Node.js", "MongoDB"]
        },
        {
            title: "Junior Developer",
            company: "Digital Creations",
            location: "Vancouver, BC",
            startDate: "June 2020",
            endDate: "December 2021",
            description: "Assisted in developing web applications and gained experience in full-stack development.",
            skills: ["JavaScript", "HTML", "CSS", "PHP"]
        }
    ];

    try {
        await Experience.deleteMany({}); // Clear existing experiences
        const result = await Experience.insertMany(experienceData);
        console.log("Experiences initialized:", result);
    } catch (error) {
        console.error("Error initializing experiences:", error);
        throw error;
    }
}

async function getExperiences() {
    await db.connect();
    return await Experience.find({});
}

async function addExperience(title, company, location, startDate, endDate, description, skills) {
    await db.connect();
    const newExperience = new Experience({
        title,
        company,
        location,
        startDate,
        endDate,
        description,
        skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim())
    });
    return await newExperience.save();
}

async function deleteExperience(id) {
    await db.connect();
    return await Experience.deleteOne({ _id: id });
}

// Update an experience in the database
async function updateExperience(expId, title, company, location, startDate, endDate, description, skills) {
    await db.connect();

    try {
        const updatedExperience = await Experience.findByIdAndUpdate(
            expId,
            { title, company, location, startDate, endDate, description, skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()) },
            { new: true } 
        );

        return updatedExperience;
    } catch (error) {
        console.error("Error updating experience:", error);
        throw error;
    }
}

module.exports = {
    initializeExperiences,
    getExperiences,
    addExperience,
    deleteExperience,
    updateExperience
};