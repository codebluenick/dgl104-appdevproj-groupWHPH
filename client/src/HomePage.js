import React from 'react';

function HomePage() {
  const handleLogout = () => {
    // Clear our "logged in" flag
    localStorage.removeItem('google_simple_login');
    // Force reload or navigate back to the login page
    window.location.reload();
  };

  return (
    <div style={{ margin: '2rem', textAlign: 'center' }}>
      <h1>Welcome to the Home Page!</h1>
      <p>You are logged in with Google (in a simple way, no user data parsed).</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default HomePage;
