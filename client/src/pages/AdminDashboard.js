// src/pages/AdminDashboard.js
import React from 'react';
import '../styles/AdminDashboard.css';
import { FaUsers, FaTasks, FaExchangeAlt } from 'react-icons/fa';

function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-title"> Admin Dashboard</h1>
      <div className="admin-card-grid">
        <AdminCard
          icon={<FaUsers size={36} />}
          title="Manage Users"
          description="View and update user roles."
        />
        <AdminCard
          icon={<FaTasks size={36} />}
          title="View All Tasks"
          description="See every task in the system."
        />
        <AdminCard
          icon={<FaExchangeAlt size={36} />}
          title="Reassign Tasks"
          description="Reassign tasks to other members."
        />
      </div>
    </div>
  );
}

function AdminCard({ icon, title, description }) {
  return (
    <div className="admin-card">
      <div className="icon-wrapper">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default AdminDashboard;
