import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './pages/components/sidebar';
import TaskCard from './pages/components/TaskCard';
import CreateTask from './pages/CreateTask';
import './styles/Dashboard.css';

function TeamMemberDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <div className="top-bar">
          <h1>Team Member Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>

        {activeSection === 'dashboard' && (
          <div className="card-grid">
            <TaskCard
              title="My Tasks"
              description="View tasks assigned to you."
              onClick={() => setActiveSection('view')}
            />
          </div>
        )}

        {activeSection === 'view' && (
          <div className="embedded-form">
            {/* You can replace this with ViewTasks component if needed */}
            <p>Here you can render the assigned tasks.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamMemberDashboard;
