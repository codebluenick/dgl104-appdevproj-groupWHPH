// src/pages/ReassignTask.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ReassignTask.css';

function ReassignTask() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [newAssignee, setNewAssignee] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/tasks/all')
      .then(res => setTasks(res.data))
      .catch(err => console.error('Failed to fetch tasks:', err));

    axios.get('http://localhost:3001/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Failed to fetch users:', err));
  }, []);
  // // Mock task/user list
  // const tasks = ['Fix login bug', 'Design dashboard', 'Write documentation'];
  // const teamMembers = ['Alice', 'Bob', 'Charlie'];

  const handleReassign = () => {
    axios.put(`http://localhost:3001/api/tasks/${selectedTask}`, {
      assignedTo: newAssignee
    })
    .then(() => {
      alert('Task reassigned!');
    })
    .catch(err => {
      console.error('Failed to reassign task:', err);
      alert('Error reassigning task');
    });
  };


  return (
<div className="reassign-container">
  <h2>Reassign Task</h2>

  <div className="form-group">
    <label>Choose Task</label>
    <select value={selectedTask} onChange={e => setSelectedTask(e.target.value)}>
    <option value="">-- Select Task --</option>
    {tasks.map(task => (
      <option key={task._id} value={task._id}>{task.title}</option>
    ))}
</select>
  </div>

  <div className="form-group">
    <label>Assign To</label>
    <select value={newAssignee} onChange={e => setNewAssignee(e.target.value)}>
    <option value="">-- Select Team Member --</option>
    {users.map(user => (
      <option key={user._id} value={user._id}>
        {user.name} ({user.email})
      </option>
    ))}
</select>
  </div>

  <button
    className="reassign-btn"
    onClick={handleReassign}
    disabled={!selectedTask || !newAssignee}
  >
    Reassign Task
  </button>
</div>

  );
}

export default ReassignTask;
