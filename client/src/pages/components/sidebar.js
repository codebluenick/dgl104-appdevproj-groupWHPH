// src/pages/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Sidebar.css';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

function Sidebar({ onHomeClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">STMS</div>
      <ul className="sidebar-nav">
        <li onClick={onHomeClick}>
          <FaHome className="sidebar-icon" />
          <span>Home</span>
        </li>
        <li onClick={handleLogout}>
          <FaSignOutAlt className="sidebar-icon" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
