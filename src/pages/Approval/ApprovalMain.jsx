// ApprovalMain.jsx
import React from 'react';
import './ApprovalMain.css';
import ApprovalDashboard from './ApprovalDashboard';
import DashboardList from './DashboardList';

const ApprovalMain = () => {
  const waitingApprovals = [
    { id: 1, title: '출장 신청서', requester: '김철수', date: '2025-04-04', status: '대기' },
    { id: 2, title: '연차 신청서', requester: '이영희', date: '2025-04-03', status: '대기' },
  ];

  const myDrafts = [
    { id: 10, title: '프로젝트 예산안', status: '진행 중', progress: '2/3 결재 완료' },
    { id: 11, title: '기획안', status: '반려', progress: '1/3 결재 완료' },
  ];

  return (
    <div className="approval-main">
      <h2 className="approval-title">전자결재 대시보드</h2>

      {/* ✅ 상단 카드 요약 */}
      <ApprovalDashboard />

      {/* ✅ 리스트 영역 */}
      <div className="approval-section">
        <h3>내가 결재할 문서</h3>
        <DashboardList list={waitingApprovals} type="waiting" />
      </div>

      <div className="approval-section">
        <h3>내가 기안한 문서</h3>
        <DashboardList list={myDrafts} type="drafts" />
      </div>
    </div>
  );
};

export default ApprovalMain;
