// src/TeamLeadDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pages/components/TeamLeadDashboard.css';


function TeamLeadDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('google_simple_login');
    localStorage.removeItem('user_role');
    navigate('/');
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-navbar">
        <h2>Team Lead Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </header>

      <div className="card-container">
        <div className="dashboard-card" onClick={() => navigate('/create-task')}>
          <h3>Create Task</h3>
          <p>Create a new task for your team.</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate('/assign-task')}>
          <h3>Assign Task</h3>
          <p>Assign tasks to team members.</p>
        </div>
        <div className="dashboard-card" onClick={() => navigate('/view-tasks')}>
          <h3>View All Tasks</h3>
          <p>Monitor progress across all tasks.</p>
        </div>
      </div>
    </div>
  );
}

export default TeamLeadDashboard;
