const mongoose = require("mongoose");
const { DB_URL } = require("./serverConfig");

exports.connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};