import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import HomePage from './HomePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On app load, check localStorage to see if we previously logged in
  useEffect(() => {
    const storedStatus = localStorage.getItem('google_simple_login');
    if (storedStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSuccess = (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
    // Mark user as logged in (but we do NOT decode or use the token).
    localStorage.setItem('google_simple_login', 'true');
    setIsLoggedIn(true);
  };

  const handleError = () => {
    console.error('Google login failed');
  };

  // If not logged in, show login button
  if (!isLoggedIn) {
    return (
      <div style={{ margin: '2rem', textAlign: 'center' }}>
        <h1>Login with Google</h1>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    );
  }

  // If logged in, show the main/home page
  return <HomePage />;
}

export default App;
