import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Foundit = () => {
  const [SeenWhere, setSeenWhere] = useState('');
  const [Time, setTime] = useState('');
  const [Date, setDate] = useState('');
  const [error, setError] = useState('');

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

    if (!SeenWhere || !Date || !Time) {
      setError('Please fill out all fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('personId', uuidv4());
      formData.append('SeenWhere', SeenWhere);
      formData.append('Date', Date);
      formData.append('Time', Time);
 
      const response = await fetch('http://localhost:3000/submit-appeal', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
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
      <h2>  Please fill these details for the person you have seen. </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Seen Where:
          <input type='text' value={SeenWhere} onChange={handleSeenWhereChange} />
        </label>
        <br />
        <label>
          Time:
          <input type='time' value={Time} onChange={handleTimeChange} />
        </label>
        <br />
        <label>
        At What Date:
          <input type='date' value={Date} onChange={handleDateChange} />
        </label>
        <br />
        <button type='submit'>Submit Appeal</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Foundit;
