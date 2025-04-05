// src/AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('google_simple_login');
    localStorage.removeItem('user_role');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <ul style={styles.list}>
        <li>Manage Users</li>
        <li>View All Tasks</li>
        <li>Reassign Tasks</li>
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

export default AdminDashboard;
