// src/pages/TeamLeadDashboard.js
import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import TaskCard from './components/TaskCard';
import CreateTask from './CreateTask';
import AssignTask from './AssignTask';
import ViewTasks from './ViewTasks';
import KanbanBoard from './KanbanBoard';
import '../styles/Dashboard.css';

function TeamLeadDashboard() {
  const [activeSection, setActiveSection] = useState('');

  const handleHomeClick = () => setActiveSection('');
  const handleKanbanClick = () => setActiveSection('kanban');

  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'create':
        return <CreateTask onCancel={handleHomeClick} />;
      case 'assign':
        return <AssignTask onCancel={handleHomeClick} />;
      case 'view':
        return <ViewTasks onCancel={handleHomeClick} />;
      case 'kanban':
        return <KanbanBoard />;
      default:
        return (
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
            <TaskCard
              title="Kanban Board"
              description="Visualize tasks by status."
              onClick={() => setActiveSection('kanban')}
            />
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <Sidebar onHomeClick={handleHomeClick} onKanbanClick={handleKanbanClick} />
      <div className="dashboard-content">
        <div className="top-bar">
          <h1>Team Lead Dashboard</h1>
        </div>
        <div className="create-task-wrapper">{renderActiveComponent()}</div>
      </div>
    </div>
  );
}

export default TeamLeadDashboard;
