const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user");

// ✅ Create a new task
router.post("/", async (req, res) => {
  console.log('hi')
  try {
    const { title, description, assignedBy, assignedTo, deadline, status } = req.body;

    if (!title || !description || !assignedBy || !assignedTo || !deadline) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the assigned user exists
    const user = await User.findOne({ name: assignedTo });
    if (!user) {
      return res.status(404).json({ message: "User not available to assign task" });
    }

    // Create the new task
    const newTask = new Task({
      title,
      description,
      assignedBy,
      assignedTo,
      deadline,
      status,
    });

    // Save the task to the database
    await newTask.save();

    // ✅ Push the task to the assigned user's `tasks` array
    user.tasks.push(newTask._id);
    await user.save();

    res.status(201).json({ message: "Task created and assigned successfully!", task: newTask });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ message: error.message });
  }
});


// ✅ Get all tasks
router.get("/get-all", async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get tasks assigned to a specific user
router.get("/user/:assignedTo", async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.assignedTo });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update-task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = req.body;
    // ✅ Check if the task exists
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    // ✅ Update the task
    const newTask = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
    console.log(newTask)
    res.status(200).json({ message: "Task updated successfully", task: newTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Update task status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["To Do", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id',async(req,res)=>{
  try{
    const taskName = req.params.id;
    console.log(taskName)
    const task = await Task.find({title:taskName})
    console.log(task)
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ✅ Return the task
    res.status(200).json(task);
  }catch(err){
    console.error("Error fetching task:", err);
    res.status(500).json({ message: "Server error" });
  }
})

// ✅ Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
