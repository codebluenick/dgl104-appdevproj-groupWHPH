const Task = require('../models/taskModel');
const User = require('../models/userModel');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo } = req.body;

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
    });

    await newTask.save();
    // Send email to the assigned user
    try {
      const user = await User.findById(assignedTo);
      if (user?.email) {
        await sendAssignmentEmail(user.email, title, dueDate, newTask._id);
        console.log(`Email sent to ${user.email}`);
      } else {
        console.warn('Assigned user not found or missing email');
      }
    } catch (emailErr) {
      console.error('Email send failed:', emailErr.message);
    }
    
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated', task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get Tasks Assigned to a Specific User
exports.getTasksForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ assignedTo: userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching user tasks:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a comment to a task
exports.addComment = async (req, res) => {
  try {
    const { text, userId } = req.body;
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.comments.push({ user: userId, text });
    await task.save();

    res.status(200).json({ message: 'Comment added successfully', task });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const decorateTask = require('../decorators/taskDecorator.js'); // with .js





// Get All Tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name email');

    const decoratedTasks = tasks.map(task => decorateTask(task));

    res.json(decoratedTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
