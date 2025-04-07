import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AssignTask.css';

function AssignTask() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/tasks/all/').then(res => setTasks(res.data));
    axios.get('http://localhost:3001/api/users/').then(res => setUsers(res.data));
  }, []);

  const handleAssign = async (taskId, userId) => {
    try {
      // 🎁 Decorate the task before assigning
      const originalTask = tasks.find(t => t._id === taskId);
      

      await axios.put(`http://localhost:3001/api/tasks/${taskId}`, );
      setMessage('✅ Task reassigned successfully!');
    } catch {
      setMessage('❌ Failed to assign task.');
    }
  };

  return (
    <div className="assign-task-container">
      <h2>Assign or Reassign Tasks</h2>
      {message && <p className="message">{message}</p>}

      {tasks.map(task => (
        <div key={task._id} className="task-card">
          <h3>{task.title}</h3>
          <p><strong>Current Assignee:</strong> {task.assignedTo?.name || 'Unassigned'}</p>
          <select defaultValue="" onChange={(e) => handleAssign(task._id, e.target.value)}>
            <option value="" disabled>Select a team member</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default AssignTask;
