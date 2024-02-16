import React, { useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

const UserAppealList = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

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
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age || !phone || !email || !photo) {
      setError('Please fill out all fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('personId', uuidv4());
      formData.append('name', name)
      formData.append('age', age);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('photo', photo);

      const response = await post('http://localhost:3000/submit-appeal', {
      method: 'POST',
      body: formData,
      });


      if (response.status === 200) {
        console.log('Appeal submitted successfully');
        // Optionally, you can fetch the updated list of appeals here
      } else {
        console.error('Failed to submit appeal');
      }
    } catch (error) {
      console.error('Error submitting appeal:', error);
    }
  };

  return (
    <div className='UserAppealList'>
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
          <input type='file' onChange={handlePhotoChange} accept='image/*' />
        </label>
        <br/>
        <button type='submit'>Submit Appeal</button>
      </form>
    </div>
  );
};

export default UserAppealList;
