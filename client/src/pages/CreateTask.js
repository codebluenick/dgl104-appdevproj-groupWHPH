// src/pages/CreateTask.js
import React, { useState } from 'react';
import '../styles/CreateTask.css';

function CreateTask() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    assignee: '',
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task created:', task);

    // Optional: Save to localStorage
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    existingTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(existingTasks));

    alert(`✅ Task "${task.title}" created and assigned to ${task.assignee}`);
    setTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
      assignee: '',
    });
  };

  return (
    <div className="task-container">
      <div className="task-card">
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" value={task.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={task.description} onChange={handleChange} required />
          <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
          <select name="priority" value={task.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input type="text" name="assignee" placeholder="Assign to (email or name)" value={task.assignee} onChange={handleChange} required />
          <button type="submit">Create Task</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
