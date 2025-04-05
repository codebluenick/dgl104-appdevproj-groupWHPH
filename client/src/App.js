import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';
import TeamLeadDashboard from './pages/TeamLeadDashboard';
import TeamMemberDashboard from './TeamMemberDashboard';
import AssignTask from './pages/AssignTask';
import ViewTasks from './pages/ViewTasks';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('google_simple_login') === 'true';
    const storedRole = localStorage.getItem('userRole');

    if (loggedIn && storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
    }
  }, []);

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={() => {
      setIsLoggedIn(true);
      setRole(localStorage.getItem('userRole'));
    }} />;
  }

  return (
    <Routes>
      {role === 'Admin' && <Route path="*" element={<AdminDashboard />} />}
      {role === 'TeamLead' && <Route path="*" element={<TeamLeadDashboard />} />}
      {role === 'TeamMember' && <Route path="*" element={<TeamMemberDashboard />} />}
      <Route path="/assign-task" element={<AssignTask />} />
      <Route path="/view-tasks" element={<ViewTasks />} />
    </Routes>
  );
}

export default App;
