// src/pages/AdminViewTasks.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminViewTasks.css';

// const mockTasks = [
//   { id: 1, title: 'Design Landing Page', assignedTo: 'gratisbear14@gmail.com', priority: 'High', status: 'In Progress' },
//   { id: 2, title: 'Fix Login Bug', assignedTo: 'user@example.com', priority: 'Medium', status: 'Completed' },
//   { id: 3, title: 'Prepare Report', assignedTo: 'vaghasiyahardik2001@gmail.com', priority: 'Low', status: 'Pending' },
// ];

function AdminViewTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/tasks/all') // Adjust URL if needed
      .then(res => setTasks(res.data))
      .catch(err => console.error('Failed to fetch tasks:', err));
  }, []);

  return (
    <div className="admin-tasks-container">
      <h2>All Tasks</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {tasks.map((task) => (
          <tr key={task._id}>
            <td>{task.title}</td>
            <td>
              {task.assignedTo
                ? `${task.assignedTo.name} (${task.assignedTo.email})`
                : 'Unassigned'}
            </td>
            <td>{task.priority}</td>
            <td>{task.status}</td>
          </tr>
        ))}
      </tbody>

      </table>
    </div>
  );
}

export default AdminViewTasks;
