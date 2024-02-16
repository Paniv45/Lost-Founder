import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserMain = () => {
  const [appeals, setAppeals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then((response) => {
        setAppeals(response.data);
      })
      .catch((error) => {
        console.error('Error fetching appeals:', error);
        // Implement additional error handling as needed
      });
  }, []);

  return (
    <div>
      <h2>All Appeals with Photos</h2>
      <ul>
        {appeals.map((appeal) => (
          <li key={appeal._id}>
            <p>Name: {appeal.name}</p>
            <p>Age: {appeal.age}</p>
            <p>Phone: {appeal.phone}</p>
            <p>Email: {appeal.email}</p>
            <img
              src={`http://localhost:3000/${appeal.photoPath}`}
              alt={`Appeal by ${appeal.name}`}
              style={{ maxWidth: '100px' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserMain;
