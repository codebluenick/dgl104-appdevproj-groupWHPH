import React from 'react';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">STMS</div>
      <ul className="nav">
        <li><i className="fas fa-home"></i> Home</li>
        <li><i className="fas fa-tasks"></i> My Tasks</li>
        <li><i className="fas fa-calendar"></i> My Plan</li>
        <li><i className="fas fa-inbox"></i> Inbox</li>
        <li><i className="fas fa-users"></i> People</li>
        <li><i className="fas fa-chart-line"></i> Reporting</li>
      </ul>
    </div>
  );
}

export default Sidebar;
