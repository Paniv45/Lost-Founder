import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const UserMain = () => {
  const [appeals, setAppeals] = useState([]);
  const [error, setError] = useState(null);
  const username = localStorage.getItem('username'); // Retrieve username from local storage

  useEffect(() => {
    const username = localStorage.getItem('username');
    
  }, []);

  useEffect(() => {
    const fetchAppeals = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-all-appeals');
        setAppeals(response.data.reverse());
      } catch (error) {
        console.error('Error fetching appeals:', error);
        setError('Error fetching appeals. Please try again later.');
      }
    };

    fetchAppeals();
  }, []);

  return (
    <div>
      <h2>Welcome, {username}!</h2> {/* Display username */}
      <h3>All Appeals with Photos</h3>
      <Link to='/NeederMain'>
        <button>Submit Appeal</button>
      </Link>
      {error && <p>{error}</p>}
      <ul>
        {appeals.map((appeal) => (
          <li key={appeal.personId}>
            <p>Name: {appeal.name}</p>
            <p>Age: {appeal.age}</p>
            {appeal.photo && (
              <img
                src={`data:image/jpeg;base64,${appeal.photo}`}
                alt={appeal.name}
                style={{ maxWidth: '500px' }}
                onError={(e) => console.error('Error loading image:', e)}
              />
            )}
            <br/>
            <Link to={'/Foundit'}>
            <button>I Can Help</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserMain;
