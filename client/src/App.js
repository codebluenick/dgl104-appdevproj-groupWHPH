// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './LoginPage';
import Dashboard from './Dashboard';

// Pages
import AssignTask from './pages/AssignTask';
import ViewTasks from './pages/ViewTasks';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedStatus = localStorage.getItem('google_simple_login');
    if (storedStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Routes>
      {!isLoggedIn ? (
        <Route path="*" element={<LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />} />
      ) : (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assign-task" element={<AssignTask />} />
          <Route path="/view-tasks" element={<ViewTasks />} />
        </>
      )}
    </Routes>
  );
}

export default App;
