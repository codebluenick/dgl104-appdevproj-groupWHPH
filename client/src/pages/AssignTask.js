import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AssignTask.css';

function AssignTask() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Get tasks
    axios.get('http://localhost:3001/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error fetching tasks:', err));

    // Get users
    axios.get('http://localhost:3001/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleAssign = async (taskId, userId) => {
    try {
      await axios.put(`http://localhost:3001/api/tasks/${taskId}`, { assignedTo: userId });
      setMessage('✅ Task reassigned successfully!');
      setTasks(prev =>
        prev.map(task => task._id === taskId ? { ...task, assignedTo: users.find(u => u._id === userId) } : task)
      );
    } catch (error) {
      console.error('Error assigning task:', error);
      setMessage('❌ Failed to assign task.');
    }
  };

  return (
    <div className="assign-task-container">
      <h2>Assign or Reassign Tasks</h2>
      {message && <p className="message">{message}</p>}
      <div className="task-list">
        {tasks.map(task => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>
            <p><strong>Current Assignee:</strong> {task.assignedTo?.name || 'Unassigned'}</p>
            <select
              defaultValue=""
              onChange={(e) => handleAssign(task._id, e.target.value)}
            >
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
    </div>
  );
}

export default AssignTask;
