import React, { useState } from 'react';

const LoginSignup = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Perform login logic (add authentication here)
    console.log('Logging in:', loginData);
    setLoggedInUser(loginData.username);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Perform signup logic (add registration/authentication here)
    console.log('Signing up:', signupData);
    setLoggedInUser(signupData.username);
  };

  return (
    <div>
      <h1>Login/Signup</h1>

      {/* Login Form */}
      <form onSubmit={handleLoginSubmit}>
        <h2>Login</h2>
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

      {/* Signup Form */}
      <form onSubmit={handleSignupSubmit}>
        <h2>Signup</h2>
        <label>
          Username:
          <input type="text" name="username" value={signupData.username} onChange={handleSignupChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={signupData.email} onChange={handleSignupChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={signupData.password} onChange={handleSignupChange} />
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>

      {/* Display Logged In User */}
      {loggedInUser && <p>Logged in as: {loggedInUser}</p>}
    </div>
  );
};

export default LoginSignup;
