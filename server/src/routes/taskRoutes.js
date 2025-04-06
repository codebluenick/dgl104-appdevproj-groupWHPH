const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  updateTask,
  getTasksForUser,
  addComment          
} = require('../controllers/taskController');

// Routes
router.post('/', createTask);
router.get('/', getAllTasks);
router.put('/:id', updateTask);
router.get('/assigned/:userId', getTasksForUser);
router.post('/:id/comments', addComment);

module.exports = router;
