const AdminUser = require("../models/users"),
    bcrypt = require("bcryptjs");
const initializeDefaultUser = async () => {
    try {
        const email = "admin@todonetwork.com";
        const password = "admin1234##";
        const encryptedPassword = await bcrypt.hash(password, 10);
        const existingUser = await AdminUser.findOne({ email });

        if (!existingUser) {
            const newUser = await AdminUser.create({
                name: "Admin",
                email,
                role: "admin",
                password: encryptedPassword,

            });
            console.log("Default user created:", newUser);
        }
    } catch (error) {
        console.error("Error initializing default user:", error);
    }
};

module.exports = { initializeDefaultUser };