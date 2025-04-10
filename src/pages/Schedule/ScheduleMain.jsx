import React from 'react';
import style from './ScheduleMain.module.css';
import DemoApp from './DemoApp';



const ScheduleMain = () => {
  
  return (
    <div className={style.ScheContainer}>
      <div className={style.calender}>
      <h2>일정</h2>
        <DemoApp/>
    </div>
    </div>
  )
}



export default ScheduleMain;


  