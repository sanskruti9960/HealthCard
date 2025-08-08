import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserPage from './UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user/pI59MYPwhoXjfT0aTxdLuuRtJkt2" />} />
        <Route path="/user/:userId" element={<UserPage />} />
      </Routes>
    </Router>
  );
}
// This is the main App component that sets up routing for the application
export default App
