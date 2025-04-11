import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import SignupPediatrician from './components/SignupPediatrician';
import SignupParent from './components/SignupParent';
import Adminhome from './components/admin/Adminhome';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup-pediatrition" element={<SignupPediatrician />} />
      <Route path="/signup-parent" element={<SignupParent />} />
      <Route path="/adminhome" element={<Adminhome />} />
    </Routes>
  );
};

export default App;
