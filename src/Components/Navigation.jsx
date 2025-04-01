import React from 'react';
import useMenuStore from '../store/useMenuStore';
import './Navigation.css';

const navItems = ['전자결재', '게시판', '인사관리', '메신저', '예약', '일정'];

const Navigation = () => {
  const setSelectedMenu = useMenuStore((state) => state.setSelectedMenu);

  return (
    <nav className="navigation">
      {navItems.map((item, index) => (
        <button key={index} className="nav-btn" onClick={() => setSelectedMenu(item)}>
          {item}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
