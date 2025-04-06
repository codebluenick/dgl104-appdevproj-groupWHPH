// src/App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import LoginPage from './LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import TeamLeadDashboard from './pages/TeamLeadDashboard';
import TeamMemberDashboard from './TeamMemberDashboard';
import ManageUsers from './pages/ManageUsers';
import AdminViewTasks from './pages/AdminViewTasks';
import ReassignTask from './pages/ReassignTask';
import AssignTask from './pages/AssignTask';
import ViewTasks from './pages/ViewTasks';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null to check initial load
  const [role, setRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const loginStatus = localStorage.getItem('google_simple_login');
    const storedRole = localStorage.getItem('userRole');
    if (loginStatus === 'true' && storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }
  }, [location.pathname]);

  const handleLoginSuccess = () => {
    const userRole = localStorage.getItem('userRole');
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const redirectDashboard = () => {
    switch (role) {
      case 'Admin':
        return <Navigate to="/admin" />;
      case 'TeamLead':
        return <Navigate to="/team-lead" />;
      case 'TeamMember':
        return <Navigate to="/team-member" />;
      default:
        return <Navigate to="/login" />;
    }
  };

  // ❗ Wait until we know the login state to avoid wrong redirects
  if (isLoggedIn === null) return null;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/" element={isLoggedIn ? redirectDashboard() : <Navigate to="/login" />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/team-lead" element={<TeamLeadDashboard />} />
      <Route path="/team-member" element={<TeamMemberDashboard />} />
      <Route path="/assign-task" element={<AssignTask />} />
      <Route path="/view-tasks" element={<ViewTasks />} />
      <Route path="/admin/manage-users" element={<ManageUsers />} />
      <Route path="/admin-view-tasks" element={<AdminViewTasks />} />
      <Route path="/admin/reassign-tasks" element={<ReassignTask />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
