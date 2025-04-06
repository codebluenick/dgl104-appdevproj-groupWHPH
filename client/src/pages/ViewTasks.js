import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewTasks({ onCancel }) {
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
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <strong>{task.title}</strong> - {task.priority} - Assigned to: {task.assignedTo?.name || 'Unassigned'}
            </li>
          ))}
        </ul>
      )}
      <button onClick={onCancel}>Back</button>
    </div>
  );
}

export default ViewTasks;
