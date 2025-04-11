import React, { useState } from 'react';
import sideliststyle from './Sidelist.module.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AddCategory from '../pages/Schedule/AddCategory';
import ScheduleList from '../pages/Schedule/ScheduleList';
import Annaul from '../pages/insa/Annaul';

const Sidelist = () => {
  const location = useLocation();
  const name = location.state?.name;
  

  const renderContent = () => {
    switch (name) {

      // 게시판 list
      case 'board':
        return (
            <div className={sideliststyle.sideList}>
            <aside className={sideliststyle.sidebar}>
              
              
        <div><Link to="/mainpage/maincontent/write_button" state={{ name: "board" }}><button className={sideliststyle.button}>글쓰기</button></Link></div>

        <div className={sideliststyle.boardsidebar}>
          <div className={sideliststyle.wholegasy}>게시판 전체보기</div>
          <div><Link to="/mainpage/maincontent/standard" state={{ name: "board" }}>공지사항</Link></div>
          <div><Link to="/mainpage/maincontent/reference" state={{ name: "board" }}>자료실</Link></div>
          <div>전사 게시판
            <li><Link to="/mainpage/maincontent/free" state={{ name: "board" }}>자유게시판</Link></li>
            <li><Link to="/mainpage/maincontent/club" state={{ name: "board" }}>동아리게시판</Link></li>
          </div>
          <div>그룹 게시판
            <li><Link to="/mainpage/maincontent/department" state={{ name: "board" }}>부서 게시판</Link></li>
            <li><Link to="/mainpage/maincontent/business" state={{ name: "board" }}>거래처별 변경사항</Link></li>
            <li><Link to="/mainpage/maincontent/support" state={{ name: "board" }}>업체교육/업무지원보고서</Link></li>
          </div>
    
    
            </div>
            </aside>
        </div>
        );


      // 전자결제 list
      case 'approval':
        return (
          <div className={sideliststyle.sideList}>
            <aside className={sideliststyle.sidebar}>
      
              <div><Link to="/mainpage/maincontent/approval/write" state={{ name: "approval" }}>
                <button className={sideliststyle.button}>결재 작성</button>
              </Link></div>
      
              <div className={sideliststyle.boardsidebar}>
                <div className={sideliststyle.wholegasy}>결재 문서함</div>
                <div><Link to="/approval/pending" state={{ name: "approval" }}>내가 결재할 문서</Link></div>
                <div><Link to="/approval/requested" state={{ name: "approval" }}>내가 상신한 문서</Link></div>
                <div><Link to="/approval/complete" state={{ name: "approval" }}>완료된 문서</Link></div>
                <div><Link to="/approval/rejected" state={{ name: "approval" }}>반려된 문서</Link></div>
              </div>
      
              <div className={sideliststyle.boardsidebar}>
                <div className={sideliststyle.wholegasy}>부서 문서함</div>
                <div><Link to="/approval/department/referenced" state={{ name: "approval" }}>부서 참조 문서</Link></div>
                <div><Link to="/approval/department/created" state={{ name: "approval" }}>부서 생산 문서</Link></div>
              </div>
      
            </aside>
          </div>
        );



       // 인사관리 list
       case 'hr':
        return <div className={sideliststyle.sideList}>
                <Annaul/>
              </div>;  


      // 일정 list
      case 'schedule':
        return <div className={sideliststyle.sideList}>
          <div>
            <ScheduleList />
          </div>
        </div>;



      // 예약 list
      case 'reserve':
        return <div className={sideliststyle.sideList}>
                <ur>
                  <li>나의 예약 목록</li>
                  <li>회의실</li>
                  <li>차량</li>
                  <li>비품</li>
                </ur>
              </div>;
      

      // 디폴트값
      default:
        return <div className={sideliststyle.sideList}></div>;
    }
  };

  return <div>{renderContent()}</div>;

   
  };
  
  export default Sidelist;


