// src/TeamLeadDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function TeamLeadDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('google_simple_login');
    localStorage.removeItem('user_role');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h1>Team Lead Dashboard</h1>
      <ul style={styles.list}>
        <li>Create Task</li>
        <li>Assign Task</li>
        <li>View All Tasks</li>
      </ul>
      <button style={styles.button} onClick={handleLogout}>Log Out</button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    fontSize: '1.2rem',
  },
  button: {
    marginTop: '1.5rem',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
  },
};

export default TeamLeadDashboard;
