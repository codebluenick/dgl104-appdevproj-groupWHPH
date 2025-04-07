class UpdateTaskCommand {
    constructor(task, newStatus) {
      this.task = task;
      this.prevStatus = task.status;
      this.newStatus = newStatus;
    }
  
    execute() {
      this.task.status = this.newStatus;
    }
  
    undo() {
      this.task.status = this.prevStatus;
    }
  }
  
  module.exports = UpdateTaskCommand;
  