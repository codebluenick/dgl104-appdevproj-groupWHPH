import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On app load, check localStorage to see if we previously logged in
  useEffect(() => {
    const storedStatus = localStorage.getItem('google_simple_login');
    if (storedStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // If not logged in, show the LoginPage component.
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // If logged in, show the Dashboard which handles role-based rendering.
  return <Dashboard />;
}

export default App;
