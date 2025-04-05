// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import AdminDashboard from './AdminDashboard';
import TeamLeadDashboard from './TeamLeadDashboard';
import TeamMemberDashboard from './TeamMemberDashboard';

function Dashboard() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem('user_role');
    if (storedRole) {
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Loading role...</h2>
      </div>
    );
  }

  switch (role) {
    case 'Admin':
      return <AdminDashboard />;
    case 'TeamLead':
      return <TeamLeadDashboard />;
    case 'TeamMember':
      return <TeamMemberDashboard />;
    default:
      return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>No valid role found. Please log in again.</h2>
        </div>
      );
  }
}

export default Dashboard;
