// components/ApprovalMain.jsx
import React from 'react';
import './ApprovalMain.css';
import ApprovalDashBoard from './ApprovalDashboard';
import { Routes,Route } from 'react-router-dom';



const ApprovalMain = () => {
  return (
    <div className="approval-container">
      <div>
        사이드컬럼
      </div>
      <div>
        <h2>📄 전자결재</h2>
        <div className="approval-grid">
            <ApprovalDashBoard/> 
          </div>
        </div>
      </div>
  );
};

export default ApprovalMain;
