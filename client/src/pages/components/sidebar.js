// src/pages/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Sidebar.css'; // optional styling import

function Sidebar({ onHomeClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="logo">STMS</div>
      <ul className="nav">
        <li onClick={onHomeClick}>
          <i className="fas fa-home"></i> Home
        </li>
        <li onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
