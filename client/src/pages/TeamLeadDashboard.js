import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import TaskCard from './components/TaskCard';
import CreateTask from '../pages/CreateTask';
import AssignTask from '../pages/AssignTask'; // ✅ Import AssignTask form
import '../styles/Dashboard.css';

function TeamLeadDashboard() {
  const navigate = useNavigate();

  // ✅ Toggle flags for form rendering
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showAssignTask, setShowAssignTask] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleCancelCreate = () => setShowCreateTask(false);
  const handleCancelAssign = () => setShowAssignTask(false);

  const isFormOpen = showCreateTask || showAssignTask;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        {/* Top Bar */}
        <div className="top-bar">
          <h1>Team Lead Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>

        {/* Show task cards only when no form is open */}
        {!isFormOpen && (
          <div className="card-grid">
            <TaskCard
              title="Create Task"
              description="Create a new task for your team."
              onClick={() => {
                setShowCreateTask(true);
                setShowAssignTask(false);
              }}
            />
            <TaskCard
              title="Assign Task"
              description="Assign tasks to team members."
              onClick={() => {
                setShowAssignTask(true);
                setShowCreateTask(false);
              }}
            />
            <TaskCard
              title="View All Tasks"
              description="Monitor progress across all tasks."
              onClick={() => navigate('/view-tasks')}
            />
          </div>
        )}

        {/* Inline Create Task form */}
        {showCreateTask && (
          <div className="create-task-wrapper">
            <CreateTask onCancel={handleCancelCreate} />
          </div>
        )}

        {/* Inline Assign Task form */}
        {showAssignTask && (
          <div className="create-task-wrapper">
            <AssignTask onCancel={handleCancelAssign} />
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamLeadDashboard;
