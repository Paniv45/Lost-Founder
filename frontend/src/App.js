import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserMain from './User/Main';
import NeederMain from './Needer/AppealForm'; // Assuming NeederMain is the correct component
import LoginSignup from './LoginSignup';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/User/Main' element={<UserMain />} />
        <Route path='/LoginSignup' element={<LoginSignup />} />
        <Route path='/' element={<NeederMain />} />
        
      </Routes>
    </Router>
  );
}

export default App;
