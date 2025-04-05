// LoginPage.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function LoginPage({ onLoginSuccess }) {
  const handleSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      localStorage.setItem('google_simple_login', 'true');

      // Assign mock role for testing
      const roles = ['Admin', 'TeamLead', 'TeamMember'];
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      localStorage.setItem('user_role', randomRole);

      // Debug log
      console.log("✅ Login successful. Assigned role:", randomRole);

      // Trigger app login logic
      onLoginSuccess();
    }
  };

  const handleError = () => {
    console.log('❌ Google Login Failed');
  };

  return (
    <div style={styles.container}>
      {/* Left panel with branding */}
      <div style={styles.leftPanel}>
        <div style={styles.brandContainer}>
          <h1 style={styles.brandTitle}>Smart Task System</h1>
          <p style={styles.brandSubtitle}>Empowering your productivity</p>
        </div>
      </div>

      {/* Right panel with login card */}
      <div style={styles.rightPanel}>
        <div style={styles.loginCard}>
          <h2 style={styles.loginTitle}>Sign In</h2>
          <p style={styles.loginSubtitle}>Use your Google account to continue</p>
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          <p style={styles.footerText}>
            Don’t have an account? <span style={styles.signupLink}>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  leftPanel: {
    flex: 1,
    background: 'linear-gradient(135deg, #ff3f5e, #ff733f)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    padding: '2rem',
  },
  brandContainer: {
    textAlign: 'center',
  },
  brandTitle: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  brandSubtitle: {
    fontSize: '1.2rem',
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  loginCard: {
    width: '350px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    padding: '2rem',
    textAlign: 'center',
  },
  loginTitle: {
    margin: 0,
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
    color: '#333',
  },
  loginSubtitle: {
    margin: 0,
    marginBottom: '1.5rem',
    color: '#777',
  },
  footerText: {
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    color: '#555',
  },
  signupLink: {
    color: '#007bff',
    cursor: 'pointer',
  },
};

export default LoginPage;
