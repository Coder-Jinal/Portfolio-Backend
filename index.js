const express = require("express");
const path = require("path");
const sessions = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors"); 

dotenv.config();
const app = express();
const port = process.env.PORT || 8888;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use(sessions({
    secret: process.env.SESSIONSECRET,
    name: "sessionID",
    saveUninitialized: false,
    resave: false,
    cookie: {}
}));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API backend!" });
});

// API routes
app.use("/admin", require("./components/admin/routes"));
app.use("/projects", require("./components/projects/routes"));
app.use("/skills", require("./components/skills/routes"));
app.use("/experience", require("./components/experience/routes")); 
app.use("/api", require("./components/api/routes")); 

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
