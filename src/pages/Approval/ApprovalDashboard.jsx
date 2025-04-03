import React, { useEffect, useState } from 'react';
import DashboardCard from './DashboardCard';
import DashboardList from './DashboardList';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import ApprovalForm from './ApprovalForm';

const ApprovalDashboard = () => {
  const [waitCount, setWaitCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [documents, setDocuments] = useState([]);

  const navigate = useNavigate(); // ✅ useNavigate 훅 정의

  const goToForm = () => {
    navigate('/approval/form'); // ✅ ApprovalForm 으로 이동
  };

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

      {/* ✅ 이동 버튼 */}
      <div style={{ marginTop: '2rem' }}>
        <ApprovalForm/>
      </div>
    </div>
  );
};

export default ApprovalDashboard;