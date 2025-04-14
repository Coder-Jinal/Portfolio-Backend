const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/${process.env.DBNAME}`;

async function connect() {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

connect(); 

module.exports = { connect };
