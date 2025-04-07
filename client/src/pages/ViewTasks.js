import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ViewTasks.css'; // optional CSS

function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [assignedToFilter, setAssignedToFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/tasks/all')
      .then(res => {
        setTasks(res.data);
        setFilteredTasks(res.data);
      })
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  useEffect(() => {
    let filtered = tasks;
    if (priorityFilter) {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    if (assignedToFilter) {
      filtered = filtered.filter(task => task.assignedTo?.name === assignedToFilter);
    }
    setFilteredTasks(filtered);
  }, [priorityFilter, statusFilter, assignedToFilter, tasks]);

  const uniqueAssignees = [...new Set(tasks.map(task => task.assignedTo?.name).filter(Boolean))];

  return (
    <div className="view-tasks">
      <h2>All Tasks</h2>

      <div className="filters">
        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select value={assignedToFilter} onChange={e => setAssignedToFilter(e.target.value)}>
          <option value="">All Assignees</option>
          {uniqueAssignees.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="task-list">
          {filteredTasks.map(task => (
            <div key={task._id} className="task-card">
              <h3>{task.title}</h3>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
              <p><strong>Assigned To:</strong> {task.assignedTo?.name} ({task.assignedTo?.email})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewTasks;
