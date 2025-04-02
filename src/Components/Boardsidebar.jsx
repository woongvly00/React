import './Boardsidebar.css';
//import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import Boardlist from './Boardlist/Boardlist';
import React from 'react';


const Boardsidebar = () => {



  return (


    <aside className="sidebar">
      <h3>근무체크</h3>
      <div className="sidebar-item">🕒 출근시간: 09:00</div>
      <div className="sidebar-item">🏠 퇴근시간: 18:00</div>
      <div className="sidebar-item">📅 일정 없음</div>

      <div><button className="button">글쓰기</button></div>

      <div className="boardsidebar">
          <div className="wholegasy">게시판 전체보기</div>
          <div>공지사항</div>
          <div>게시판 관리</div>
          <div>자료실</div>
          <div>전사 게시판
            <li>자유게시판</li>
            <li>동아리게시판</li>
          </div>
          <div>그룹 게시판
            <li>부서 게시판</li>
            <li>거래처별 변경사항</li>
            <li>업체교육/업무지원보고서</li>
          </div>
        </div>
 
    
 

    </aside>




  );
};

export default Boardsidebar;