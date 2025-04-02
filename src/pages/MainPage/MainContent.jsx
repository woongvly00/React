import React from 'react';
import useMenuStore from '../../store/useMenuStore.js';
import ApprovalMain from '../Approval/ApprovalMain';
import ScheduleMain from '../Schedule/ScheduleMain';
import style from './MainContent.module.css';

const MainContent = () => {
  const selectedMenu = useMenuStore((state) => state.selectedMenu);

  const renderContent = () => {
    switch (selectedMenu) {
      case '전자결재':
        return <ApprovalMain />;
      case '게시판':
        return <div>📝 게시판 메인 화면입니다.</div>;
      case '인사관리':
        return <div>👨‍💼 인사관리 화면입니다.</div>;
      case '메신저':
        return <div>💬 메신저 기능 준비 중입니다.</div>;
      case '예약':
        return <div>📅 자원예약 기능 준비 중입니다.</div>;
      case '일정':
        return <ScheduleMain/>;
      default:
        return <div>🏠 기본 화면입니다.</div>;
    }
  };

  return (

    <div className={style.container}>
  <main style={style.main}>
        <h2 style={style.title}>{selectedMenu}</h2>
        <div style={style.card}>
          {renderContent()}
        </div>
      </main>

    </div>
    
  );
};



export default MainContent;
