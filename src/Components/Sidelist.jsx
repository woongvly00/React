import React from 'react';
import sideliststyle from './Sidelist.module.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Boardlist from '../pages/Boardlist/Board_standard';
import Board_listmanager from '../pages/Boardlist/Board_listmanager';
import Board_reference from '../pages/Boardlist/Board_refernece';
import Board_free from '../pages/Boardlist/Board_free';
import Board_club from '../pages/Boardlist/Board_club';
import Board_department from '../pages/Boardlist/Board_department';
import Board_business from '../pages/Boardlist/Board_business';
import Board_support from '../pages/Boardlist/Board_support';


const Sidelist = () => {
  return (
    <div className={sideliststyle.sideList}>
      사이드 컬럼


      <aside className={sideliststyle.sidebar}>


        <div><button className={sideliststyle.button}>글쓰기</button></div>

        <div className={sideliststyle.boardsidebar}>
          <div className={sideliststyle.wholegasy}>게시판 전체보기</div>
          <div><Link to="/Boardlist/standard">공지사항</Link></div>
          <div><Link to="/Boardlist/listmanager">게시판 관리</Link></div>
          <div><Link to="/Boardlist/reference">자료실</Link></div>
          <div>전사 게시판
            <li><Link to="/Boardlist/free">자유게시판</Link></li>
            <li><Link to="/Boardlist/club">동아리게시판</Link></li>
          </div>
          <div>그룹 게시판
            <li><Link to="/Boardlist/department">부서 게시판</Link></li>
            <li><Link to="/Boardlist/business">거래처별 변경사항</Link></li>
            <li><Link to="/Boardlist/support">업체교육/업무지원보고서</Link></li>
          </div>
        </div>
  


      </aside>

    </div>



  );
};

export default Sidelist;


