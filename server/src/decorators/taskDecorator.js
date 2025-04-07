class Task {
    constructor(title) {
      this.title = title;
    }
  
    getDetails() {
      return this.title;
    }
  }
  
  class ReminderDecorator {
    constructor(task) {
      this.task = task;
    }
  
    getDetails() {
      return this.task.getDetails() + ' ⏰ Reminder added';
    }
  }
  
  module.exports = { Task, ReminderDecorator };
  