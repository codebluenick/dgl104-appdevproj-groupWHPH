// src/pages/ReassignTask.js
import React, { useState } from 'react';
import '../styles/ReassignTask.css';

function ReassignTask() {
  const [selectedTask, setSelectedTask] = useState('');
  const [newAssignee, setNewAssignee] = useState('');

  // Mock task/user list
  const tasks = ['Fix login bug', 'Design dashboard', 'Write documentation'];
  const teamMembers = ['Alice', 'Bob', 'Charlie'];

  const handleReassign = () => {
    console.log(`Reassigning "${selectedTask}" to ${newAssignee}`);
    alert(`Task "${selectedTask}" reassigned to ${newAssignee}!`);
  };

  return (
<div className="reassign-container">
  <h2>Reassign Task</h2>

  <div className="form-group">
    <label>Choose Task</label>
    <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)}>
      <option value="">-- Select Task --</option>
      {tasks.map((task, idx) => (
        <option key={idx} value={task}>{task}</option>
      ))}
    </select>
  </div>

  <div className="form-group">
    <label>Assign To</label>
    <select value={newAssignee} onChange={(e) => setNewAssignee(e.target.value)}>
      <option value="">-- Select Team Member --</option>
      {teamMembers.map((member, idx) => (
        <option key={idx} value={member}>{member}</option>
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
