import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './pages/components/sidebar';
import TaskCard from './pages/components/TaskCard';
import CreateTask from './pages/CreateTask';

import '././styles/Dashboard.css';

function TeamLeadDashboard() {
  const navigate = useNavigate();
  const [showCreateTask, setShowCreateTask] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <div className="top-bar">
          <h1>Team Lead Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>

        {/* Show either the cards or the CreateTask form */}
        {!showCreateTask ? (
          <div className="card-grid">
            <TaskCard
              title="Create Task"
              description="Create a new task for your team."
              onClick={() => setShowCreateTask(true)}
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
        ) : (
          <div className="create-task-wrapper">
            <CreateTask />
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamLeadDashboard;
