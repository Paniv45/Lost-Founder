// Foundit.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Foundit.css'; // Import CSS file

const Foundit = () => {
  const { personId ,email ,name} = useParams();
  const [seenWhere, setSeenWhere] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSeenWhereChange = (e) => {
    setSeenWhere(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!seenWhere || !date || !time) {
      setError('Please fill out all fields');
      return;
    }

    try {
      const formData = {
        personId: personId,
        name: name, // Make sure name is defined and passed here
        email: email,
        seenWhere: seenWhere,
        date: date,
        time: time
      };
      
      
      
      console.log("FormData is:")
      console.log (formData);
      
      const response = await fetch('http://localhost:3000/Found', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // console.log( JSON.stringify(formData));

      if (response.ok) {
        setSuccessMessage('Appeal submitted. Thank you for your help.');
        setSeenWhere('');
        setTime('');
        setDate('');
        setError('');
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
    <div className='UserAppealList'> {/* Add your main container class */}
      <div className='center'> {/* Add your center class */}
        <h2>Please fill in these details for the person you have seen.</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>
            Seen Where:
            <input type='text' value={seenWhere} onChange={handleSeenWhereChange} />
          </label>
          <br />
          <label>
            Time:
            <input type='time' value={time} onChange={handleTimeChange} />
          </label>
          <br />
          <label>
            Date:
            <input type='date' value={date} onChange={handleDateChange} />
          </label>
          <br />
          {successMessage && <p className="success-message">{successMessage}</p>}
          {error && <p className="error-message">{error}</p>}
          <button type='submit'>Submit Appeal</button>
        </form>
      </div>
    </div>
  );
};

export default Foundit;
