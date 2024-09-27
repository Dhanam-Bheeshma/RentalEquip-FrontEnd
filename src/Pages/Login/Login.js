import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [isReset, setIsReset] = useState(false);

  const API_URL = 'https://rent-bk-siva.onrender.com'; // Your API URL
  // const API_URL='http://localhost:5000';

  const handleLogin = async () => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username: email, password });
        console.log('Login successful', response.data);
        
        // Store token and userId in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId); // Ensure userId is returned

        localStorage.setItem('username', email);
        
        // Check if the logged-in user is admin
        if (email === 'admin') {
            navigate('/admin-dashboard'); // Redirect to the admin dashboard
        } else {
            // Redirect to the Dashboard for regular users
            navigate('/product'); // Use navigate instead of history.push
        }
    } catch (error) {
        console.error('Login failed', error.response ? error.response.data : error.message);
        alert('Invalid username or password');
    }
};

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/register`, { username: email, password });
      console.log('Signup successful', response.data);
      alert('Registration successful! You can now log in.');
      setIsLogin(true); // Switch to login view after successful signup
    } catch (error) {
      console.error('Signup failed', error.response ? error.response.data : error.message);
      alert('Error registering user.');
    }
  };

  const handleReset = async () => {
    console.log('Reset', resetEmail);
    // Implement reset password functionality here
    alert('Reset password feature not implemented yet.');
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
      backgroundColor: '#f7fafc',
    },
    card: {
      backgroundColor: 'white',
      padding: '4rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '24rem',
      textAlign: 'center',
      marginBottom: '4%',
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '0.5rem',
      marginBottom: '1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
    },
    button: {
      backgroundColor: '#4299e1',
      color: 'white',
      fontWeight: 'bold',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    buttonSecondary: {
      backgroundColor: '#e2e8f0',
      color: '#4a5568',
      fontWeight: 'bold',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      marginLeft: '0.5rem',
      marginTop: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.card}>
          {isReset ? (
            <div>
              <h2 className="text-lg font-bold mb-4">Reset Password</h2>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Email"
                style={styles.input}
              />
              <button onClick={handleReset} style={styles.button}>
                Send Reset Link
              </button>
              <button onClick={() => setIsReset(false)} style={styles.buttonSecondary}>
                Back to Login
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={styles.input}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={styles.input}
              />
              {!isLogin && (
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  style={styles.input}
                />
              )}
              <button onClick={isLogin ? handleLogin : handleSignup} style={styles.button}>
                {isLogin ? 'Login' : 'Signup'}
              </button>
              <button onClick={() => setIsLogin(!isLogin)} style={styles.buttonSecondary}>
                {isLogin ? 'Create Account' : 'Login Instead'}
              </button>
              <button onClick={() => setIsReset(true)} style={styles.buttonSecondary}>
                Forgot Password?
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;