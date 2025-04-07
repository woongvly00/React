import React from 'react';
import ApprovalMain from '../Approval/ApprovalMain';
import ScheduleMain from '../Schedule/ScheduleMain';
import Boardlist from '../Boardlist/Board_standard';
import Sidelist from '../../Components/Sidelist';
import ReserveMain from '../Reserve/ReserveMain';
import style from './MainContent.module.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Board_listmanager from '../Boardlist/Board_listmanager';
import Board_reference from '../Boardlist/Board_refernece';
import Board_free from '../Boardlist/Board_free';
import Board_club from '../Boardlist/Board_club';
import Board_department from '../Boardlist/Board_department';
import Board_business from '../Boardlist/Board_business';
import Board_support from '../Boardlist/Board_support';
import Board_write_button from '../Boardlist/Board_write_button';
import Board_update from '../Boardlist/Board_update';



const MainContent = () => {



  return (

    <div className={style.maincontainer}>
      <div className={style.mainSidebar}>
        <Link to="/mainpage"><i className="fa-solid fa-2x fa-house" style={{ color: '#FFFFFF', margin: '20px 0' }}></i></Link>
        <Link to="/mainpage/maincontent/approval"><i className="fa-solid fa-2x fa-inbox" style={{ color: '#FFFFFF', margin: '20px 0' }}></i></Link>
        <Link to="/mainpage/maincontent/board"><i className="fa-solid fa-2x fa-clipboard" style={{ color: '#FFFFFF', margin: '20px 0' }}></i></Link>
        <Link to="/mainpage/maincontent/schedule"><i className="fa-solid fa-2x fa-calendar" style={{ color: '#FFFFFF', margin: '20px 0' }}></i></Link>
        <Link to="/mainpage/maincontent/reserve"><i className="fa-solid fa-2x fa-clock" style={{ color: '#FFFFFF', margin: '20px 0' }}></i></Link>
        <Link to="/mainpage/maincontent/msg"><i className="fa-solid fa-2x fa-comment" style={{ color: '#FFFFFF', margin: '20px 0' }}></i></Link>
      </div>
      <Sidelist />
      <div className={style.mainContents}>
        <Routes>
          <Route path="approval" element={<ApprovalMain />}></Route>
          <Route path="schedule" element={<ScheduleMain />}></Route>

          <Route path="write_update" element={<Board_update/>}></Route>
          <Route path="write_button" element={<Board_write_button/>}></Route>
          <Route path="standard" element={<Boardlist />}></Route>
          <Route path="listmanager" element={<Board_listmanager />}></Route>
          <Route path="reference" element={<Board_reference />}></Route>
          <Route path="free" element={<Board_free />}></Route>
          <Route path="club" element={<Board_club />}></Route>
          <Route path="department" element={<Board_department />}></Route>
          <Route path="business" element={<Board_business />}></Route>
          <Route path="support" element={<Board_support />}></Route>

          <Route path="hr" element={<ApprovalMain />}></Route>
          <Route path="reserve" element={<ReserveMain />}></Route>
          <Route path="msg" element={<ApprovalMain />}></Route>
        </Routes>
      </div>


    </div>

  );
};



export default MainContent;
