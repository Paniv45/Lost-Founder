import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', loginData);
      localStorage.setItem('username', loginData.username); // Store username in local storage
      console.log('Username stored:', loginData.username); // Add this line
      navigate('/user-main');
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Failed to log in');
    }
  };

  return (
    <div>
      <h2>Login</h2>
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

      <Link to='/Signup'>
        <button>Register Your Account</button>
      </Link>

    </div>
  );
};

export default LoginForm;
