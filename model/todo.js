const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    userId: {
        name: String,
        _id: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
}, {timestamps: true});

module.exports = mongoose.model('Todo', todoSchema);