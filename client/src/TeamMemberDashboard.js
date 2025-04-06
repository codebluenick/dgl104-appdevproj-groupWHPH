import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './pages/components/sidebar';
import './styles/Dashboard.css';
import AssignedTasks from './pages/AssignTask';


function TeamMemberDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('tasks');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
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
      <AssignedTasks /> {/* Show real tasks here */}
    </div>
  )}

  {activeSection === 'update' && (
    <div>
      <h2>Update Task Status</h2>
      <form>
        <label>Task ID:</label>
        <input type="text" placeholder="Enter Task ID" />
        <label>Status:</label>
        <select>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <label>Details:</label>
        <textarea placeholder="Update notes..."></textarea>
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
        <textarea placeholder="Write a comment..."></textarea>
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
