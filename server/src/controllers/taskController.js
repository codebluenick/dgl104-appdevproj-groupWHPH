const Task = require('../models/taskModel');
const User = require('../models/users');
const sendAssignmentEmail = require('../utils/mailer');

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

    // ✅ Send email to assigned user
    const user = await User.findById(assignedTo);
    if (user && user.email) {
      await sendAssignmentEmail(user.email, title, dueDate, newTask._id);
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
// Get tasks assigned to a specific user
exports.getTasksForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await Task.find({ assignedTo: userId }).populate('assignedTo', 'name email');
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks for user:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};


exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { assignedTo, status } = req.body;

  try {
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const previousAssignee = existingTask.assignedTo?.toString();
    let shouldSendEmail = false;

    // Check if assignedTo is being updated
    if (assignedTo && assignedTo !== previousAssignee) {
      existingTask.assignedTo = assignedTo;
      shouldSendEmail = true;
    }

    if (status) {
      existingTask.status = status;
    }

    const updatedTask = await existingTask.save();
    const populatedTask = await updatedTask.populate('assignedTo', 'name email');

    // Send email only if assignment changed
    if (shouldSendEmail && populatedTask.assignedTo?.email) {
      await sendAssignmentEmail(
        populatedTask.assignedTo.email,
        populatedTask.title,
        populatedTask.dueDate,
        populatedTask._id
      );
    }

    res.status(200).json(populatedTask);
  } catch (err) {
    console.error('❌ Failed to update task:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};


