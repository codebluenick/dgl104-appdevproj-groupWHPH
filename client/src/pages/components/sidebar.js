// src/pages/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Sidebar.css';
import { FaHome, FaSignOutAlt, FaColumns } from 'react-icons/fa';

function Sidebar({ onHomeClick, onKanbanClick }) {
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Ensure this exists

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

        
{role === 'TeamLead' && (
  <li onClick={onKanbanClick}>
    <FaColumns className="sidebar-icon" />
    <span>Kanban View</span>
  </li>
)}


        <li onClick={handleLogout}>
          <FaSignOutAlt className="sidebar-icon" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
