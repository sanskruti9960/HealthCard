// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import UserPage from './UserPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<div style={{textAlign: 'center', marginTop: '50px'}}>Health Records System - Access via QR code</div>} />
//         <Route path="/user/:userId" element={<UserPage />} />
//         <Route path="*" element={<div style={{textAlign: 'center', marginTop: '50px'}}>Page not found</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from './UserPage';
import { db } from './Firebase';
import { getDocs, collection } from 'firebase/firestore';

function App() {
  const [firebaseStatus, setFirebaseStatus] = useState('Checking connection...');

  useEffect(() => {
    const checkFirebaseConnection = async () => {
      try {
        // Try reading from any test collection (you can create a dummy one in Firestore)
        const querySnapshot = await getDocs(collection(db, 'testConnection'));
        setFirebaseStatus('✅ Firebase connected');
      } catch (error) {
        console.error('Firebase connection failed:', error);
        setFirebaseStatus('❌ Firebase connection failed');
      }
    };

    checkFirebaseConnection();
  }, []);

  return (
    <Router>
      <div style={{textAlign: 'center', padding: '10px', fontSize: '14px'}}>
        {firebaseStatus}
      </div>
      <Routes>
        <Route path="/" element={<div style={{textAlign: 'center', marginTop: '50px'}}>Health Records System - Access via QR code</div>} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="*" element={<div style={{textAlign: 'center', marginTop: '50px'}}>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
