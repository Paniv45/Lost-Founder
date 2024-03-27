import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/login', loginData);
      localStorage.setItem('username', loginData.username); // Store username in local storage
      console.log('Username stored:', loginData.username); // Add this line
      navigate('/User/Main'); // Redirect to /User/Main after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="login-container1">
      <div className="left-container1">
  <div className="khoj-text1">
    <h1>KHOJ</h1>
    <p>An initiative to find your lost ones</p>
  </div>
</div>

      <div className="right-container1">

      <div className="center1">
        <div className='h21'>
          <div className='h21'>Login</div>
          </div>
          <form onSubmit={handleLoginSubmit}>
          <label>
      Username:
    <input type="text" name="username" value={loginData.username} onChange={handleLoginChange} />
  </label>
  <br />
  <label>
    Password:
    <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} />
  </label>
  <br />
  <button type="submit">Login</button>
</form>
{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
<Link to="/Signup">
  <button>Register Your Account</button>
</Link>
</div>
  
      </div>
    </div>
  );
};

export default LoginForm;
