import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ViewTasks.css'; // optional CSS

function ViewTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  return (
    <div className="view-tasks">
      <h2>All Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="task-list">
          {tasks.map(task => (
            <div key={task._id} className="task-card">
              <h3>{task.title}</h3>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
              <p><strong>Assigned To:</strong> {task.assignedTo?.name} ({task.assignedTo?.email})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewTasks;
