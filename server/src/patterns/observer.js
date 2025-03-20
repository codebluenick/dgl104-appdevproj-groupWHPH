class Subject {
    constructor() {
      this.observers = [];
    }
  
    attach(observer) {
      this.observers.push(observer);
    }
  
    notify(data) {
      this.observers.forEach(observer => observer.update(data));
    }
}

class NotificationObserver {
    update(data) {
      // Placeholder logic for notification
      console.log(`Notification: Task ${data.taskId} changed to ${data.status}`);
    }
}
  
// Create a shared subject instance
const subject = new Subject();
const notificationObserver = new NotificationObserver();
subject.attach(notificationObserver);
  
module.exports = subject;