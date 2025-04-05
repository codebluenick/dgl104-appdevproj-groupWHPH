// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import TeamLeadDashboard from './pages/TeamLeadDashboard';
import TeamMemberDashboard from './TeamMemberDashboard'; 
import ManageUsers from './pages/ManageUsers';
import AdminViewTasks from './pages/AdminViewTasks';



import AssignTask from './pages/AssignTask';
import ViewTasks from './pages/ViewTasks';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const loginStatus = localStorage.getItem('google_simple_login');
    const storedRole = localStorage.getItem('userRole');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
      setRole(storedRole);
    }
  }, []);

  const getDashboardComponent = () => {
    switch (role) {
      case 'Admin':
        return <AdminDashboard />;
      case 'TeamLead':
        return <TeamLeadDashboard />;
      case 'TeamMember':
        return <TeamMemberDashboard />;
      default:
        return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
    }
  };

  return (
    <Routes>
      {!isLoggedIn ? (
        <Route path="*" element={<LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />} />
      ) : (
        <>
          <Route path="/" element={getDashboardComponent()} />
          <Route path="/assign-task" element={<AssignTask />} />
          <Route path="/view-tasks" element={<ViewTasks />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin-view-tasks" element={<AdminViewTasks />} />



        </>
      )}
    </Routes>
  );
}

export default App;
