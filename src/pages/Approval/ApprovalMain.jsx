// components/ApprovalMain.jsx
import React from 'react';
import './ApprovalMain.css';

const approvalData = [
  { title: '휴가 신청서', status: '대기', date: '2025.03.25' },
  { title: '지출 결의서', status: '진행', date: '2025.03.26' },
  { title: '품의서', status: '완료', date: '2025.03.27' },
];

const ApprovalMain = () => {
  return (
    <div className="approval-container">
      <h2>📄 전자결재</h2>
      <div className="approval-grid">
        {approvalData.map((doc, idx) => (
          <div className="approval-card" key={idx}>
            <h3>{doc.title}</h3>
            <p className={`status status-${doc.status}`}>{doc.status}</p>
            <p className="date">{doc.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalMain;
