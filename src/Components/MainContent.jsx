import React from 'react';
import useMenuStore from '../store/useMenuStore';
import ApprovalMain from './Approval/ApprovalMain'

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
        return <div>📆 일정관리 기능 준비 중입니다.</div>;
      default:
        return <div>🏠 기본 화면입니다.</div>;
    }
  };

  return (
    <main style={styles.main}>
      <h2 style={styles.title}>{selectedMenu}</h2>
      <div style={styles.card}>
        {renderContent()}
      </div>
    </main>
  );
};

const styles = {
  main: {
    flex: 1,
    padding: '20px',
  },
  title: {
    marginBottom: '20px',
    fontSize: '22px',
    fontWeight: 600,
  },
  card: {
    background: 'rgba(255,255,255,0.6)',
    borderRadius: '12px',
    padding: '20px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
};

export default MainContent;
