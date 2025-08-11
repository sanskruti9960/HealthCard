import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './Firebase';
// this is web page
const UserPage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const trimmedId = userId?.trim();
      if (!trimmedId) {
        setError('Invalid user ID');
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'userData', trimmedId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setError('User not found');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // ✅ Format keys for display
  const formatFieldName = (key) =>
    key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  // ✅ Render a section with its fields
  const renderSection = (title, data) => {
    if (!data || typeof data !== 'object') return null;
    return (
      <div
        key={title}
        style={{
          marginBottom: '30px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#fafafa',
        }}
      >
        <h3
          style={{
            margin: '0 0 15px 0',
            color: '#333',
            borderBottom: '2px solid #007bff',
            paddingBottom: '8px',
          }}
        >
          {formatFieldName(title)}
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
          }}
        >
          {Object.entries(data).map(([key, value]) => (
            <div
              key={key}
              style={{
                padding: '10px',
                backgroundColor: 'white',
                borderRadius: '4px',
                border: '1px solid #eee',
              }}
            >
              <div
                style={{
                  fontWeight: 'bold',
                  color: '#555',
                  marginBottom: '5px',
                  fontSize: '14px',
                }}
              >
                {formatFieldName(key)}
              </div>
              <div style={{ color: '#333', fontSize: '16px' }}>
                {Array.isArray(value) ? (
                  value.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {value.map((item, index) => (
                        <li key={index} style={{ marginBottom: '5px' }}>
                          {typeof item === 'object' ? JSON.stringify(item, null, 2) : item}
                        </li>
                      ))}
                    </ul>
                  ) : 'No items'
                ) : typeof value === 'object' && value !== null ? (
                  JSON.stringify(value, null, 2)
                ) : (
                  value || 'N/A'
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ✅ Loading / Error / Empty states
  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
        }}
      >
        Loading user data...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
          color: 'red',
        }}
      >
        Error: {error}
      </div>
    );

  if (!userData)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
        }}
      >
        No user data available
      </div>
    );

  // ✅ Order sections (personalDetails first, etc.)
  const sectionOrder = [
    'personalDetails',
    'medicalInfo',
    'insuranceInfo',
    'emergencyContact',
  ];
  const orderedSections = [];

  // Add predefined sections
  sectionOrder.forEach((key) => {
    if (userData[key]) {
      orderedSections.push([key, userData[key]]);
    }
  });

  // Add remaining sections
  Object.entries(userData)
    .filter(
      ([key]) =>
        !['createdAt', 'updatedAt'].includes(key) &&
        !sectionOrder.includes(key)
    )
    .forEach(([key, value]) => orderedSections.push([key, value]));

  // ✅ Final Render
  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '40px',
            borderBottom: '3px solid #007bff',
            paddingBottom: '20px',
          }}
        >
          <h1
            style={{
              margin: '0',
              color: '#2c3e50',
              fontSize: '32px',
              fontWeight: 'bold',
            }}
          >
            HEALTH RECORD
          </h1>
          <p
            style={{
              margin: '10px 0 0 0',
              color: '#666',
              fontSize: '16px',
            }}
          >
            Patient ID: {userId}
          </p>
        </div>

        {/* Sections */}
        {orderedSections.map(([key, value]) => renderSection(key, value))}

        {/* Footer */}
        <div
          style={{
            marginTop: '40px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
            borderTop: '2px solid #007bff',
          }}
        >
          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
            Generated on: {new Date().toLocaleDateString()} | Document ID:{' '}
            {userId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;