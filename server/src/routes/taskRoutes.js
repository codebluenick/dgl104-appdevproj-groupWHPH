// server/src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');

// POST - Create a Task
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error });
  }
});

// GET - View all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error });
  }
});

module.exports = router;
