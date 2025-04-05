import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/sidebar';
import TaskCard from './components/TaskCard';
import CreateTask from '../pages/CreateTask';
import AssignTask from '../pages/AssignTask';
import ViewTasks from '../pages/ViewTasks'; 
import '../styles/Dashboard.css';

function TeamLeadDashboard() {
  const navigate = useNavigate();

  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showAssignTask, setShowAssignTask] = useState(false);
  const [showViewTasks, setShowViewTasks] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const isFormOpen = showCreateTask || showAssignTask || showViewTasks;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <div className="top-bar">
          <h1>Team Lead Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>

        {!isFormOpen && (
          <div className="card-grid">
            <TaskCard
              title="Create Task"
              description="Create a new task for your team."
              onClick={() => {
                setShowCreateTask(true);
                setShowAssignTask(false);
                setShowViewTasks(false);
              }}
            />
            <TaskCard
              title="Assign Task"
              description="Assign tasks to team members."
              onClick={() => {
                setShowAssignTask(true);
                setShowCreateTask(false);
                setShowViewTasks(false);
              }}
            />
            <TaskCard
              title="View All Tasks"
              description="Monitor progress across all tasks."
              onClick={() => {
                setShowViewTasks(true);
                setShowCreateTask(false);
                setShowAssignTask(false);
              }}
            />
          </div>
        )}

        {showCreateTask && (
          <div className="create-task-wrapper">
            <CreateTask onCancel={() => setShowCreateTask(false)} />
          </div>
        )}

        {showAssignTask && (
          <div className="create-task-wrapper">
            <AssignTask onCancel={() => setShowAssignTask(false)} />
          </div>
        )}

        {showViewTasks && (
          <div className="create-task-wrapper">
            <ViewTasks onCancel={() => setShowViewTasks(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamLeadDashboard;
