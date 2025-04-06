import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      const userEmail = decoded.email;
      const userPic = decoded.picture; 
      localStorage.setItem('userPic', userPic); 
      
  
      const adminEmails = ['hardik.vaghasiya.admission@gmail.com'];
      const teamLeadEmails = ['vaghasiyahardik2001@gmail.com'];
      const teamMemberEmails = ['gratisbear14@gmail.com'];
  
      let role = 'TeamMember';
  
      if (adminEmails.includes(userEmail)) {
        role = 'Admin';
      } else if (teamLeadEmails.includes(userEmail)) {
        role = 'TeamLead';
      }
  
      // ✅ Store all necessary info
      localStorage.setItem('google_simple_login', 'true');
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userPic', userPic); // ✅
  
      onLoginSuccess();
  
      // redirect
      if (role === 'Admin') navigate('/');
      else if (role === 'TeamLead') navigate('/');
      else navigate('/team-member');
    }
  };
  
  

  const handleError = () => {
    console.log('❌ Google Login Failed');
  };

  return (
    <div style={styles.container}>
      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.brandContainer}>
          <h1 style={styles.brandTitle}>Smart Task System</h1>
          <p style={styles.brandSubtitle}>Empowering your productivity</p>
        </div>
      </div>

      {/* Right Panel */}
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
    backgroundColor: '',
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
