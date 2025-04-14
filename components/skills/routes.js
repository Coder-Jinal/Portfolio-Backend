// const express = require("express");
// const router = express.Router();
// const { listSkills, showAddForm, addNewSkill, deleteSkillById } = require("./controller");

// router.get("/list", listSkills);
// router.get("/add", showAddForm);
// router.post("/add/submit", addNewSkill);
// router.get("/delete/submit", deleteSkillById);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
    listSkills,
    addNewSkill,
    deleteSkillById,
    updateSkill
} = require("./controller");
const verifyadmin = require("../admin/middleware/verifyadmin");

router.get("/list", listSkills);
router.post("/add",verifyadmin, addNewSkill);
router.delete("/delete",verifyadmin, deleteSkillById);
router.put("/update", verifyadmin, updateSkill); 


module.exports = router;

