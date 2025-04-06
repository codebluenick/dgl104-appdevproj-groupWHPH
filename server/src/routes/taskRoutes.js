// server/src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { createTask, getAllTasks } = require('../controllers/taskController');

// POST: Create a task
router.post('/', createTask);

// Optional: GET all tasks
router.get('/', getAllTasks);

module.exports = router;
