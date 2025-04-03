import React, { useEffect, useState } from 'react';
import DashboardCard from './DashboardCard';
import DashboardList from './DashboardList';

const ApprovalDashboard = () => {
  const [waitCount, setWaitCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // TODO: 실제 API 연동 필요
    setWaitCount(3);
    setDraftCount(2);
    setDocuments([
      { title: '휴가신청서', status: '결재 대기' },
      { title: '지출결의서', status: '참조' },
    ]);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>전자결재 대시보드</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DashboardCard title="결재 대기 문서" count={waitCount} />
        <DashboardCard title="작성중인 문서" count={draftCount} />
      </div>
      <DashboardList items={documents} />
    </div>
  );
};

export default ApprovalDashboard;
