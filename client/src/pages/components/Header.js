import React from 'react';
import './Header.css';

function Header({ onLogout }) {
  return (
    <div className="header">
      <h1>Team Lead Dashboard</h1>
      <button className="logout-btn" onClick={onLogout}>Log Out</button>
    </div>
  );
}

export default Header;
