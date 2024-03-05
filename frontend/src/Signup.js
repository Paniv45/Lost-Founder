import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      setErrorMessage('Please fill out all fields');
      return;
    }

    try {
      const formData = {
        username: name,
        email: email,
        phone: phone,
        password: password
      };

      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Signup successful');
        // Optionally, you can navigate to another page or show a success message
      } else {
        console.error('Failed to signup');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignupSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Phone no.:
          <input type="tel" value={phone} onChange={handlePhoneChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>

      {/* Display error message */}
      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    
      <Link to='/Login'>
        <button>Back To Login</button>
      </Link>

      </div>
  );
};

export default SignupForm;
