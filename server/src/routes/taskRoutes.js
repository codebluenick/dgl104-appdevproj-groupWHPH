const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// POST /api/tasks - Create a new task
router.post('/', async (req, res) => {
    console.log("📩 Task create API called with:", req.body); // <-- ADD THIS
  
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      console.error("❌ Error in creating task:", err.message);
      res.status(500).json({ error: 'Failed to create task' });
    }
  });
  