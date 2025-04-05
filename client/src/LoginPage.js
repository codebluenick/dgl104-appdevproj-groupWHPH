// LoginPage.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

function LoginPage({ onLoginSuccess }) {
  const handleSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      localStorage.setItem('google_token', credentialResponse.credential);

      // Decode the token (optional, just to see user info):
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Decoded Google token:', decoded);

      // Notify App.js that we have successfully logged in:
      onLoginSuccess();
    }
  };

  const handleError = () => {
    console.log('Google Login Failed');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>Please Log In</h1>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}

export default LoginPage;
