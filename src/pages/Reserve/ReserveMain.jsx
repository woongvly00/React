import React from 'react';
import style from './ReserveMain.module.css';
import MeetingRoom from '../Reserve/MeetingRoom'


const ReserveMain = () => {


  return (

    <div className={style.reservContainer}>
      <div className={style.subcontainer}>
        <h2>예약하기</h2>
        <div className={style.reservArea}>
          <MeetingRoom/>
        </div>
      </div>
    </div>
  );
};

export default ReserveMain;