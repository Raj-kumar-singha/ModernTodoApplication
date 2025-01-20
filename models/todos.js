const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending', },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model("Todos", todoSchema);