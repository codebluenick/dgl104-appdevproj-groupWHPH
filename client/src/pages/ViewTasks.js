import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ViewTasks.css';
function ViewTasks({ onCancel }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error("Failed to fetch tasks", err));
  }, []);

  const filteredTasks = filter
    ? tasks.filter(task =>
        task.status === filter || task.priority === filter
      )
    : tasks;

  return (
    <div className="view-tasks-container">
      <h2 className="view-title">View All Tasks</h2>

      <div className="filter-controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-dropdown">
          <option value="">-- Filter by Status or Priority --</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="task-list">
        {filteredTasks.map(task => (
          <div className="task-card" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-meta">
              <span>Status: <strong>{task.status}</strong></span>
              <span>Priority: <strong>{task.priority}</strong></span>
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && <p className="no-tasks">No tasks found for the selected filter.</p>}
      </div>

      <div className="view-back">
        <button className="cancel-btn" onClick={onCancel}>Back</button>
      </div>
    </div>
  );
}

export default ViewTasks;
