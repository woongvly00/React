// ApprovalDashboard.jsx
import React from 'react';
import DashboardCard from './DashboardCard';
import './ApprovalDashboard.css';

const ApprovalDashboard = () => {
  return (
    <div className="dashboard-card-container">
      <DashboardCard title="결재 대기" count={2} color="#f39c12" />
      <DashboardCard title="기안 문서" count={5} color="#3498db" />
      <DashboardCard title="반려 문서" count={1} color="#e74c3c" />
    </div>
  );
};

export default ApprovalDashboard;
