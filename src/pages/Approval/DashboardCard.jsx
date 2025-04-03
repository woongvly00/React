import React from 'react';

const DashboardCard = ({ title, count }) => {
  return (
    <div style={{
      flex: 1,
      background: '#f0f0f0',
      padding: '2rem',
      borderRadius: '12px',
      margin: '1rem',
      textAlign: 'center'
    }}>
      <h3>{title}</h3>
      <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{count} 건</p>
    </div>
  );
};

export default DashboardCard;
