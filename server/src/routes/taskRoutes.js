const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

const {
  createTask,
  getAllTasks,
  updateTask,
  getTasksForUser,
  addComment          
} = require('../controllers/taskController');

// Routes
router.post('/', createTask);
router.get('/all', getAllTasks);

router.put('/:id', updateTask);
router.get('/assigned/:userId', getTasksForUser);
router.post('/:id/comments', addComment);

module.exports = router;
