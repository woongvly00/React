import React from 'react';
import style from './ScheduleMain.module.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import DemoApp from './DemoApp';




const ScheduleMain = () => {
  return (
    <div className={style.ScheContainer}>
      <div className={style.sideList}>
        사이드컬럼
        
      </div>
      <div className={style.calender}>
      <h2>일정</h2>
        <DemoApp/>
    </div>
    </div>
  )
}




// const ScheduleMain = () => {


//   return (

//     <div className={style.ScheContainer}>
//       <div>
//         사이드컬럼
//       </div>
//       <div className={style.container}>



//         <h2>일정</h2>
//         <div className="approval-grid"></div>





//       </div>
//     </div>
//   );
// };

export default ScheduleMain;