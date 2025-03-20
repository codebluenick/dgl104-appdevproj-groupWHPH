const Task = require('../models/taskModel');
const subject = require('../patterns/observer'); // to notify on updates

// Create Task
async function createTask(req, res) {
  try {
    const { title, description, priority, dueDate, assignedTo } = req.body;
    const newTask = new Task({ title, description, priority, dueDate, assignedTo });
    await newTask.save();
    return res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

// Get All Tasks
async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name email');
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

// Get Single Task
async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.taskId).populate('assignedTo', 'name email');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

// Update Task
async function updateTask(req, res) {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    // Notify observers (observer pattern)
    subject.notify({ taskId: updatedTask._id, status: updatedTask.status });

    return res.status(200).json({ message: 'Task updated', task: updatedTask });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

// Delete Task
async function deleteTask(req, res) {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    return res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
