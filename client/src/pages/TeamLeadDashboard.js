import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import TaskCard from './components/TaskCard';
import '../styles/Dashboard.css';

function TeamLeadDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        {/* Removed <Header /> and replaced with inline top bar */}
        <div className="top-bar">
          <h1>Team Lead Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>

        <div className="card-grid">
          <TaskCard
            title="Create Task"
            description="Create a new task for your team."
            onClick={() => navigate('/create-task')}
          />
          <TaskCard
            title="Assign Task"
            description="Assign tasks to team members."
            onClick={() => navigate('/assign-task')}
          />
          <TaskCard
            title="View All Tasks"
            description="Monitor progress across all tasks."
            onClick={() => navigate('/view-tasks')}
          />
        </div>
      </div>
    </div>
  );
}

export default TeamLeadDashboard;
