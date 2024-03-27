import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./Appeal.css";

const UserAppealList = ({ location }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [successMessage,setSuccessMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleEmailChange = (e) => {
     setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age || !phone || !photo) {
      setError('Please fill out all fields');
      return;
    }

    try {
      const formData = new FormData();
      const personId = uuidv4(); // Generate personId
      formData.append('personId', personId);
      formData.append('name', name);
      formData.append('age', age);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('photo', photo);

      const response = await fetch('http://localhost:3000/submit-appeal', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Appeal submitted. Kindly proceed to your main page for viewing all appeals');
        setName('');
        setEmail('');
        setAge('');
        setPhoto(null); // Set photo to null
        setPhone('');
      } else {
        console.error('Failed to submit appeal');
        setError('Failed to submit appeal');
      }
    } catch (error) {
      console.error('Error submitting appeal:', error);
      setError('Failed to submit appeal');
    }
  };

  return (
    <div className='main'>
      <div className='centerA'>
        <h2>Submit an Appeal</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>
            Name:
            <input type='text' value={name} onChange={handleNameChange} />
          </label>
          <br />
          <label>
            Age:
            <input type='text' value={age} onChange={handleAgeChange} />
          </label>
          <br />
          <label>
            Phone:
            <input type='text' value={phone} onChange={handlePhoneChange} />
          </label>
          <br />
          <label>
            Email:
            <input type='email' value={email} onChange={handleEmailChange} />
          </label> 
          <br />
          <label>
            Upload Photo:
            <input type='file' onChange={handlePhotoChange} accept='image/*' name='photo' />
          </label>
          <br/>

          {successMessage && <p className="success-message">{successMessage}</p>}

          <button type='submit'>Submit Appeal</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default UserAppealList;
