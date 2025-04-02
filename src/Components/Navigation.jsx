import React from 'react';
import useMenuStore from '../store/useMenuStore';
import './Navigation.css';

const navItems = ['전자결재', '게시판', '인사관리', '메신저', '예약', '일정'];

const Navigation = () => {
  const setSelectedMenu = useMenuStore((state) => state.setSelectedMenu);

  return (
    <nav className="navigation">
        <button className="nav-btn">전자결제</button>
        <button className="nav-btn">게시판</button>
        <button className="nav-btn">인사관리</button>
        <button className="nav-btn">메신저</button>
        <button className="nav-btn">예약</button>
        <button className="nav-btn">일정</button>
    </nav>
  );
};

export default Navigation;
