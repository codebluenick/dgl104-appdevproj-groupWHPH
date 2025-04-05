import React, { useState, useEffect } from 'react';
import '../styles/CreateTask.css'; // Reuse form styles

function AssignTask() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    // TODO: Replace with actual endpoints
    // Fetch tasks
    // fetch('/api/tasks').then(res => res.json()).then(setTasks);

    // Fetch users
    // fetch('/api/users').then(res => res.json()).then(setUsers);
  }, []);

  const handleAssign = (e) => {
    e.preventDefault();

    // TODO: Send PUT/PATCH to assign task
    console.log('Assigning task:', selectedTask, 'to', selectedUser);
  };

  return (
    <div className="create-task-wrapper">
      <h2>Assign Task</h2>
      <form className="create-task-form" onSubmit={handleAssign}>
        <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)}>
          <option value="">Select Task</option>
          {tasks.map((task) => (
            <option key={task._id} value={task._id}>
              {task.title}
            </option>
          ))}
        </select>

        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Assign To</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">Assign</button>
          <button type="button" className="cancel-btn" onClick={() => {
            setSelectedTask('');
            setSelectedUser('');
          }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AssignTask;
