import React from 'react';
import style from './ReserveMain.module.css';
import MeetingRoom from '../Reserve/MeetingRoom';
import Vehicle from '../Reserve/Vehicle';
import Equipment from '../Reserve/Equipment';
import MyReservation from '../Reserve/MyReservation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './fullcalendar.css';
import { useLocation } from 'react-router-dom';


const ReserveMain = () => {
  const location = useLocation();

  return (

    <div className={style.reservContainer}>
      <div className={style.subcontainer}>
        {
          location.pathname !== '/mainpage/maincontent/reserve/myReservation' && (<h2>예약하기</h2>)
        }
        
        <div className={style.reservArea}>
        <Routes>
        <Route path='/' element={<MeetingRoom />} />
        <Route path='110' element={<MeetingRoom />} />
        <Route path='120' element={<Vehicle />} />
        <Route path='130' element={<Equipment />} />
        <Route path='myReservation' element={<MyReservation />} />
        </Routes>
        </div>
      </div>
    </div>
  );
};

export default ReserveMain;