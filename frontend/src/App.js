import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserMain from './User/Main';
import NeederMain from './Needer/AppealForm'; // Assuming NeederMain is the correct component
import LoginForm from './Login';
import SignupForm from './Signup';
import Foundit from './Foundit';
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/User/Main' element={<UserMain />} />
        <Route path='/Login' element={<LoginForm />} />
        <Route path='/Signup' element={<SignupForm />} />
        <Route path='/Foundit/:personId/:email/:name/' element={<Foundit />} />
        <Route path='/NeederMain' element={<NeederMain />} />
        <Route path='/' element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
