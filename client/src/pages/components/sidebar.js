import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">STMS</h2>
      <ul className="nav">
        <li>Home</li>
        <li>My Tasks</li>
        <li>My Plan</li>
        <li>Inbox</li>
        <li>People</li>
        <li>Reporting</li>
      </ul>
    </div>
  );
}

export default Sidebar;
