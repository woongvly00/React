// DashboardCard.jsx
import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ title, count, color }) => {
  return (
    <div className="dashboard-card" style={{ backgroundColor: color }}>
      <h4>{title}</h4>
      <p>{count}건</p>
    </div>
  );
};

export default DashboardCard;