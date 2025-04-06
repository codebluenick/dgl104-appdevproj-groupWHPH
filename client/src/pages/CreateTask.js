import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CreateTask.css';

function CreateTask({ onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch users from the backend for dropdown
  useEffect(() => {
    axios.get('http://localhost:3001/api/users')  // Corrected port
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = { title, description, dueDate, priority, assignedTo };


    try {
      const res = await axios.post('http://localhost:5000/api/tasks', taskData);
      alert('Task created successfully!');
      onCancel(); // close the form
    } catch (err) {
      console.error(err);
      alert('Failed to create task.');
    }
  };

  return (
    <div className="create-task-wrapper">
      <h2>Create New Task</h2>
      <form className="create-task-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} rows={4}></textarea>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
  value={assignedTo}
  onChange={(e) => setAssignedTo(e.target.value)}
>
  <option value="">Assign to</option>
  {users.map((user) => (
    <option key={user._id} value={user._id}>
      {user.name} ({user.email})
    </option>
  ))}
</select>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">Create Task</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
