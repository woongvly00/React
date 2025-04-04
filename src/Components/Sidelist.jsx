import React from 'react';
import sideliststyle from './Sidelist.module.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
              
              
        <div><Link to="/mainpage/maincontent/write_button"><button className={sideliststyle.button}>글쓰기</button></Link></div>

        <div className={sideliststyle.boardsidebar}>
          <div className={sideliststyle.wholegasy}>게시판 전체보기</div>
          <div><Link to="/mainpage/maincontent/standard">공지사항</Link></div>
          <div><Link to="/mainpage/maincontent/listmanager">게시판 관리</Link></div>
          <div><Link to="/mainpage/maincontent/reference">자료실</Link></div>
          <div>전사 게시판
            <li><Link to="/mainpage/maincontent/free">자유게시판</Link></li>
            <li><Link to="/mainpage/maincontent/club">동아리게시판</Link></li>
          </div>
          <div>그룹 게시판
            <li><Link to="/mainpage/maincontent/department">부서 게시판</Link></li>
            <li><Link to="/mainpage/maincontent/business">거래처별 변경사항</Link></li>
            <li><Link to="/mainpage/maincontent/support">업체교육/업무지원보고서</Link></li>
          </div>
    
    
            </div>
            </aside>
        </div>
        );


      // 전자결제 list
      case 'approval':
        return <div className={sideliststyle.sideList}>
                전자결제 내용
               </div>;



       // 인사관리 list
       case 'hr':
        return <div className={sideliststyle.sideList}>
                인사관리
              </div>;  


      // 일정 list
      case 'schedule':
        return <div className={sideliststyle.sideList}>
                일정
              </div>;



      // 예약 list
      case 'reserve':
        return <div className={sideliststyle.sideList}>
                예약
              </div>;
      

      // 디폴트값
      default:
        return <div className={sideliststyle.sideList}></div>;
    }
  };

  return <div>{renderContent()}</div>;

   
  };
  
  export default Sidelist;


