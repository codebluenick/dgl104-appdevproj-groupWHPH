// server/src/decorators/taskDecorator.js

function decorateTask(task) {
    const decorated = { ...task._doc }; // safely clone Mongoose object
  
    switch (task.priority) {
      case 'High':
        decorated.label = '🔥 High Priority';
        break;
      case 'Medium':
        decorated.label = '⚠️ Medium Priority';
        break;
      case 'Low':
        decorated.label = '🟢 Low Priority';
        break;
      default:
        decorated.label = '❔ Unspecified';
    }
  
    return decorated;
  }
  
  module.exports = function decorateTask(task) {
    // Add properties or methods to the task
    task.decorated = true;
    task.label = `${task.title} (${task.priority})`;
    return task;
  };
  
  