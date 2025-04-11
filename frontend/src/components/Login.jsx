import React, { useState } from 'react';
import './Login.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axiosInstance from '../axiosinterceptor';


const Login = () => {
  const [formData, setFormData] = useState({ emailid: '', password: '' });
  const [showSignupOptions, setShowSignupOptions] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axiosInstance.post('/api/login', {
        emailid: formData.emailid,
        password: formData.password
      });

      const { userId, userType, token } = loginRes.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);
      localStorage.setItem('userId', userId);

      // Fetch additional user data based on userType
      let userData = null;

      if (userType === 'parent') {
        const res = await axiosInstance.get(`/api/patients/${userId}`);
        userData = res.data;
        navigate('/patienthome', { state: { user: userData } });

      } else if (userType === 'pediatrician') {
        const res = await axiosInstance.get(`/api/pediatricians/${userId}`);
        userData = res.data;
        navigate('/pediatrichome', { state: { user: userData } });

      } else if (userType === 'admin') {
        navigate('/adminhome');
      }

    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password.');
    }
  };

  const handleSignupRedirect = (userType) => {
    if (userType === 'parent') {
      navigate('/signup-parent');
    } else if (userType === 'pediatrician') {
      navigate('/signup-pediatrition');
    }
  };

  return (
    <>
    <div className="login-container" style={{ marginTop: '90px' }}>
      <Navbar />
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="emailid"
          placeholder="Email"
          value={formData.emailid}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        <button type="submit">Login</button>
      </form>

      <div className="signup-prompt" style={{ marginBottom: '100px' }}>
        <p>Don’t have an account?</p>
        <button
          type="button"
          className="signup-toggle"
          onClick={() => setShowSignupOptions(!showSignupOptions)}
        >
          Create New Account
        </button>

        {showSignupOptions && (
          <div className="signup-dropdown">
            <button onClick={() => handleSignupRedirect('parent')}>
              Sign Up as Parent
            </button>
            <button onClick={() => handleSignupRedirect('pediatrician')}>
              Sign Up as Pediatrician
            </button>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
