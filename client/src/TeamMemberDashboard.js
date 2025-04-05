import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './pages/components/sidebar';
import TaskCard from './pages/components/TaskCard';
import CreateTask from './pages/CreateTask'; // make sure path is correct
import './styles/Dashboard.css';

function TeamLeadDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard'); // tracks what's shown

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
          <h1>Team Lead Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>

        {/* Conditional Rendering */}
        {activeSection === 'dashboard' && (
          <div className="card-grid">
            <TaskCard
              title="Create Task"
              description="Create a new task for your team."
              onClick={() => setActiveSection('create')}
            />
            <TaskCard
              title="Assign Task"
              description="Assign tasks to team members."
              onClick={() => setActiveSection('assign')}
            />
            <TaskCard
              title="View All Tasks"
              description="Monitor progress across all tasks."
              onClick={() => setActiveSection('view')}
            />
          </div>
        )}

        {activeSection === 'create' && (
          <div className="embedded-form">
            <CreateTask />
          </div>
        )}

        {/* You can later add AssignTask, ViewTasks in similar way */}
      </div>
    </div>
  );
}

export default TeamLeadDashboard;
