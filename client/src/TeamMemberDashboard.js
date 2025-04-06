import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './pages/components/sidebar';
import './styles/Dashboard.css';
import AssignedTasks from './pages/AssignTask'; 

function TeamMemberDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('tasks');

  // State for updating status
  const [taskId, setTaskId] = useState('');
  const [status, setStatus] = useState('Pending');
  const [details, setDetails] = useState('');
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/api/tasks/${taskId}`, {
        status,
        details,
      });

      setMessage('✅ Task status updated!');
      setTaskId('');
      setStatus('Pending');
      setDetails('');
    } catch (err) {
      console.error('Error updating status:', err);
      setMessage('❌ Failed to update task.');
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        {/* Top Bar */}
        <div className="top-bar">
          <h1>Team Member Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="tab-bar">
          <button
            className={activeSection === 'tasks' ? 'active-tab' : ''}
            onClick={() => setActiveSection('tasks')}
          >
            Assigned Tasks
          </button>
          <button
            className={activeSection === 'update' ? 'active-tab' : ''}
            onClick={() => setActiveSection('update')}
          >
            Update Status
          </button>
          <button
            className={activeSection === 'comments' ? 'active-tab' : ''}
            onClick={() => setActiveSection('comments')}
          >
            Add Comments
          </button>
        </div>

        {/* Content Section */}
        <div className="tab-content">
          {activeSection === 'tasks' && (
            <div>
              <h2>Assigned Tasks</h2>
              <AssignedTasks />
            </div>
          )}

          {activeSection === 'update' && (
            <div>
              <h2>Update Task Status</h2>
              {message && (
                <p style={{ color: message.includes('✅') ? 'green' : 'red' }}>
                  {message}
                </p>
              )}
              <form onSubmit={handleStatusUpdate}>
                <label>Task ID:</label>
                <input
                  type="text"
                  value={taskId}
                  onChange={(e) => setTaskId(e.target.value)}
                  placeholder="Enter Task ID"
                  required
                />
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <label>Details:</label>
                <textarea
                  placeholder="Update notes..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
                <button type="submit">Save Changes</button>
              </form>
            </div>
          )}

          {activeSection === 'comments' && (
            <div>
              <h2>Add Comments</h2>
              <form>
                <label>Task ID:</label>
                <input type="text" placeholder="Enter Task ID" />
                <label>Comment:</label>
                <textarea placeholder="Write a comment..." />
                <button type="submit">Submit Comment</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamMemberDashboard;
