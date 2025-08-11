import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from './UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div style={{textAlign: 'center', marginTop: '50px'}}>Health Records System - Access via QR code</div>} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="*" element={<div style={{textAlign: 'center', marginTop: '50px'}}>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
