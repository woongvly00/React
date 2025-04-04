import React from 'react';
import ApprovalMain from '../Approval/ApprovalMain';
import ScheduleMain from '../Schedule/ScheduleMain';
import Boardlist from '../Boardlist/Board_standard';
import Sidelist from '../../Components/Sidelist';
import ReserveMain from '../Reserve/ReserveMain';
import style from './MainContent.module.css';
import ApprovalForm from '../Approval/ApprovalForm';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Board_listmanager from '../Boardlist/Board_listmanager';
import Board_reference from '../Boardlist/Board_refernece';
import Board_free from '../Boardlist/Board_free';
import Board_club from '../Boardlist/Board_club';
import Board_department from '../Boardlist/Board_department';
import Board_business from '../Boardlist/Board_business';
import Board_support from '../Boardlist/Board_support';
import Board_write_button from '../Boardlist/Board_write_button';



const MainContent = () => {



  return (

    <div className={style.maincontainer}>
      <div className={style.mainSidebar}>
        <Link to="/mainpage"><i className="fa-solid fa-2x fa-house" style={{ color: '#FFFFFF', margin: '20px 0' }}></i></Link>
        <Link to="/mainpage/maincontent/approval" state={{ name: "approval" }}><i className="fa-solid fa-2x fa-inbox" style={{ color: '#FFFFFF', margin: '20px 0' }}></i></Link>
        <Link to="/mainpage/maincontent/hr" state={{ name: "hr" }}><i className="fa-solid fa-2x fa-person" style={{ color: '#FFFFFF', margin: '20px 0' }}></i></Link>
        <Link to="/mainpage/maincontent/board" state={{ name: "board" }}><i className="fa-solid fa-2x fa-clipboard" style={{ color: '#FFFFFF', margin: '20px 0' }}></i></Link>
        <Link to="/mainpage/maincontent/schedule" state={{ name: "schedule" }}><i className="fa-solid fa-2x fa-calendar" style={{ color: '#FFFFFF', margin: '20px 0' }}></i></Link>
        <Link to="/mainpage/maincontent/reserve" state={{ name: "reserve" }}><i className="fa-solid fa-2x fa-clock" style={{ color: '#FFFFFF', margin: '20px 0' }}></i></Link>
        <Link to="/mainpage/maincontent/msg"><i className="fa-solid fa-2x fa-comment" style={{ color: '#FFFFFF', margin: '20px 0' }}></i></Link>
      </div>
      
      <Sidelist />
      <div className={style.mainContents}>
        <Routes>
          {/* 전자결제 */}
          <Route path="approval" element={<ApprovalMain />}></Route>





          {/* 인사관리 */}
          {/* 인사관리 페이지가 없는 상태에서 만들어졌습니다. 인사관리 페이지 만들어지면 아래 전자결졔로 연결되는 부분 인사관리로만 바꿔주세요! */}
          <Route path="hr" element={<ApprovalMain />}></Route>
          



          {/* 게시판 */}
          <Route path="standard" element={<Boardlist />}></Route>
          <Route path="listmanager" element={<Board_listmanager />}></Route>
          <Route path="reference" element={<Board_reference />}></Route>
          <Route path="free" element={<Board_free />}></Route>
          <Route path="club" element={<Board_club />}></Route>
          <Route path="department" element={<Board_department />}></Route>
          <Route path="business" element={<Board_business />}></Route>
          <Route path="support" element={<Board_support />}></Route>
          <Route path="write_button" element={<Board_write_button/>}></Route>





          {/* 일정 */}
          <Route path="schedule" element={<ScheduleMain />}></Route>



          {/* 예약 */}
          <Route path="reserve" element={<ReserveMain />}></Route>



          {/* 메신저 */}
          <Route path="msg" element={<ApprovalMain />}></Route>


        </Routes>
      </div>


    </div>

  );
};



export default MainContent;
