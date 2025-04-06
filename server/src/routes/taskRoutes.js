// server/src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, updateTask, getTasksForUser   } = require('../controllers/taskController');

// POST: Create a task
router.post('/', createTask);
router.get('/', getAllTasks);
router.put('/:id', updateTask);
router.get('/assigned/:userId', getTasksForUser);

module.exports = router;



