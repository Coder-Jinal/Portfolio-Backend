const express = require("express");
const router = express.Router();
const skillModel = require("../skills/model");
const projectModel = require("../projects/model");
const experienceModel = require("../experience/model");

// Get all skills
router.get("/skills", async (req, res) => {
    try {
        const skills = await skillModel.getSkills();
        res.json(skills);
    } catch (error) {
        console.error("Error fetching skills:", error);
        res.status(500).json({ error: "Failed to fetch skills" });
    }
});

// Get all projects
router.get("/projects", async (req, res) => {
    try {
        const projects = await projectModel.getProject();
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

// Get all experiences
router.get("/experiences", async (req, res) => {
    try {
        const experiences = await experienceModel.getExperiences();
        res.json(experiences);
    } catch (error) {
        console.error("Error fetching experiences:", error);
        res.status(500).json({ error: "Failed to fetch experiences" });
    }
});

// Add Portfolio Information endpoint
router.get("/portfolio-info", (req, res) => {
    const portfolioInfo = {
        name: "Your Name",
        role: "Full Stack Web Developer",
        summary: "Passionate web developer with expertise in building modern, responsive web applications using the latest technologies.",
        location: "Vancouver, BC",
        email: "your.email@example.com",
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername"
    };
    res.json(portfolioInfo);
});

module.exports = router;