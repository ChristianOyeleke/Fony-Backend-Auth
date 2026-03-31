const Task = require("../models/tasksModel");

// Create a task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, progress } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate: dueDate || new Date(),
      progress: progress !== undefined ? progress : 0,
      user: req.user._id,
      image: req.file?.cloudinaryUrl || null,
    });

    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    console.error("Create task error:", error);
    res
      .status(500)
      .json({ message: "Failed to create task", error: error.message });
  }
};

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: error.message });
  }
};

// Mark task as complete
exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.progress = 100;
    await task.save();

    res.status(200).json({ message: "Task marked as complete", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to complete task", error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, progress } = req.body;

    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;
    if (progress !== undefined) task.progress = progress;
    if (req.file?.cloudinaryUrl) task.image = req.file.cloudinaryUrl;

    await task.save();
    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update task", error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete task", error: error.message });
  }
};
