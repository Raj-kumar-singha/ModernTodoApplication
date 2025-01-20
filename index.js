
const express = require("express"),
    app = express(),
    { connectDB } = require("./config/dbConfig"),
    { PORT } = require("./config/serverConfig"),
    routes = require("./routes/index"),
    { initializeDefaultUser } = require("./services/dbAdminUser");

app.use(express.json());
app.use(express.text());

app.use('/', routes);

// Error-handling
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Bad Request',
    });
});

connectDB().then(async () => {
    await initializeDefaultUser();
}).catch((err) => {
    console.error("Error connecting to the database:", err);
});

app.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`)
});