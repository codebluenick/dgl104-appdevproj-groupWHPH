const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Create Task
router.post('/', taskController.createTask);

// Get All Tasks
router.get('/', taskController.getAllTasks);

// Get Single Task by ID
router.get('/:taskId', taskController.getTaskById);

// Update Task
router.put('/:taskId', taskController.updateTask);

// Delete Task
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
