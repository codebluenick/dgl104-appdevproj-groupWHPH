// server/src/strategies/priorityStrategy.js

// Base strategy interface
class PriorityStrategy {
    getPriority(task) {
      throw new Error('getPriority() must be implemented.');
    }
  }
  
  // Strategy: Deadline based
  class DeadlineBasedPriority extends PriorityStrategy {
    getPriority(task) {
      const due = new Date(task.dueDate);
      const today = new Date();
      const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  
      if (diffDays <= 1) return 'High';
      if (diffDays <= 3) return 'Medium';
      return 'Low';
    }
  }
  
  // Strategy: Manual (use user-defined priority)
  class ManualPriority extends PriorityStrategy {
    getPriority(task) {
      return task.priority || 'Low';
    }
  }
  
  // Strategy: AI-based (mocked for now)
  class AIPriority extends PriorityStrategy {
    getPriority(task) {
      // Mock logic: randomly return a priority (pretend it's AI)
      const priorities = ['Low', 'Medium', 'High'];
      return priorities[Math.floor(Math.random() * priorities.length)];
    }
  }
  
  module.exports = {
    DeadlineBasedPriority,
    ManualPriority,
    AIPriority,
  };
  