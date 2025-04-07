const Task = require('../models/taskModel');
const User = require('../models/users');
const sendAssignmentEmail = require('../utils/mailer');

// 🧠 Strategy Pattern - Priority logic
const {
  ManualPriority,
  DeadlineBasedPriority,
  AIPriority,
} = require('../strategies/priorityStrategy');


// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo, strategy = 'deadline' } = req.body;

    // Strategy logic to compute priority
    let strategyInstance;
    switch (strategy) {
      case 'manual':
        strategyInstance = new ManualPriority();
        break;
      case 'ai':
        strategyInstance = new AIPriority();
        break;
      case 'deadline':
      default:
        strategyInstance = new DeadlineBasedPriority();
    }
    

    const computedPriority = strategyInstance.getPriority({ priority, dueDate });

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority: computedPriority,
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

exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.comments.push({ text, date: new Date() });
    await task.save();

    res.status(200).json({ message: 'Comment added successfully', task });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment' });
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
