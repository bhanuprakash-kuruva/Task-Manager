const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedBy:{
        type:String,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Completed"], 
        default: "To Do", 
      },
}, { timestamps: true });

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
