import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./Main.css";

const UserMain = () => {
  const [username, setUsername] = useState('');
  const [appeals, setAppeals] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
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

  const handleSignOut = () => {
    // Clear the username from localStorage
    localStorage.removeItem('username');
    // Redirect to login page using navigate
    navigate('/login');
  };

  return (
    <div className='main5'>
      <h2>Welcome, {username}!</h2> {/* Display username */}

      <div className='right'>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to='/NeederMain' >
            <button>Submit Appeal</button>
          </Link>

        < button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>

      {error && <p>{error}</p>}
      <div className='Usercenter'>
        <ul>
          {appeals.map((appeal) => (
            <li key={appeal.personId}>
              <p style={{ fontSize: '30px' }}>Name: {appeal.name}</p> 
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
              <Link to={`/Foundit/${appeal.personId}/${appeal.email}/${appeal.name}`}>
                <button>Found</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserMain;
