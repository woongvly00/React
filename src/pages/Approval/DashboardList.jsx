import React from 'react';

const DashboardList = ({ items }) => {
  return (
    <div style={{
      background: '#f5f5f5',
      padding: '1rem',
      borderRadius: '12px',
      marginTop: '2rem'
    }}>
      <h4>결재 / 참고 문서함</h4>
      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>
            <strong>{item.title}</strong> - 상태: {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardList;
