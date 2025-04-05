// src/pages/AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';
import { FaUsers, FaTasks, FaExchangeAlt } from 'react-icons/fa';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard-container">
      {/* 🔓 Logout Button */}
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-card-grid">
        <AdminCard
          icon={<FaUsers size={36} />}
          title="Manage Users"
          description="View and update user roles."
          onClick={() => navigate('/admin/manage-users')}
        />
        <AdminCard
          icon={<FaTasks size={36} />}
          title="View All Tasks"
          description="See every task in the system."
          onClick={() => navigate('/admin-view-tasks')}
        />
        <AdminCard
          icon={<FaExchangeAlt size={36} />}
          title="Reassign Tasks"
          description="Reassign tasks to other members."
          onClick={() => navigate('/admin/reassign-tasks')}
        />
      </div>
    </div>
  );
}

function AdminCard({ icon, title, description, onClick }) {
  return (
    <div className="admin-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="icon-wrapper">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default AdminDashboard;
