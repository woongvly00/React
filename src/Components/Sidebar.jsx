import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>근무체크</h3>
      <div className="sidebar-item">🕒 출근시간: 09:00</div>
      <div className="sidebar-item">🏠 퇴근시간: 18:00</div>
      <div className="sidebar-item">📅 일정 없음</div>
    </aside>
  );
};

export default Sidebar;
