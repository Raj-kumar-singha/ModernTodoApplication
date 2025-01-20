const todos = require("../models/todos"),
    User = require("../models/users");

exports.getUsers = async (req, res) => {
    try {
        const isUserAdmin = req.user.role === 'admin';


        if (!isUserAdmin) {
            // If the user is not an admin, return an unauthorized response or specific user details
            return res.status(403).json({ error: 'Access denied, only admins can view user list' });
        }

        // Fetch the list of users excluding sensitive fields
        const users = await User.find({ role: 'user' })
            .select('-__v -password');

        const usersWithTodoCount = await Promise.all(users.map(async (user) => {
            const todoCount = await todos.countDocuments({ userId: user._id });
            return { ...user.toObject(), todoCount };
        }));

        res.status(200).json({ noOfUsers: users.length, Users: usersWithTodoCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};