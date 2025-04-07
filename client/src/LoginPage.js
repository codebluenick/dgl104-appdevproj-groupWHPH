import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      const userEmail = decoded.email;
      const userPic = decoded.picture;
      const userName = decoded.name;

      const adminEmails = ['hardik.vaghasiya.admission@gmail.com','codebluenick@gmail.com'];
      const teamLeadEmails = ['vaghasiyahardik2001@gmail.com','nikzrockz1631@gmail.com'];
      const teamMemberEmails = ['gratisbear14@gmail.com'];

      let role = 'teammember';
      if (adminEmails.includes(userEmail)) {
        role = 'admin';
      } else if (teamLeadEmails.includes(userEmail)) {
        role = 'teamlead';
      }

      // Store in localStorage
      localStorage.setItem('google_simple_login', 'true');
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userPic', userPic);
      localStorage.setItem('userName', userName);

      // Save to DB
      try {
        await axios.post('http://localhost:3001/api/users', {
          name: userName,
          email: userEmail,
          role,
        });
        console.log("✅ User saved to DB");
      } catch (error) {
        console.error("❌ Failed to save user:", error);
      }

      // Redirect to appropriate dashboard
      onLoginSuccess();
      if (role === 'admin') navigate('/');
      else if (role === 'teamlead') navigate('/team-lead');
      else navigate('/team-member');
    }
  };

  const handleError = () => {
    console.log('❌ Google Login Failed');
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.brandContainer}>
          <h1 style={styles.brandTitle}>Smart Task System</h1>
          <p style={styles.brandSubtitle}>Empowering your productivity</p>
        </div>
      </div>

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
    backgroundColor:'#6a11cb',
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
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  loginCard: {
    width: '350px',
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
