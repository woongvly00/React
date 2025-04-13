import { useEffect, useState } from 'react';
import useScheduleStore from '../../store/useScheduleStore';
import caxios from '../../Utils/caxios';
import { replace } from 'react-router-dom';



const MainpageSchedule = () => {

    const [ userInfo, setUserInfo ] = useState({});
    const [todayEvents, setTodayEvents] = useState([]);
    useEffect(()=>{
        caxios.get("/mypage/info").then((resp)=>{
          const info = resp.data;
          console.log(info);
          setUserInfo(info);
        }).catch((error) => {
            console.error("실패", error);
        });
    }, [])

    useEffect(() => {
      if (!userInfo.emp_code_id) return;
        caxios.get(`/schedule/todaySchedule/${userInfo.emp_code_id}`).then((resp) => {
            const todaySchedules = resp.data;
            setTodayEvents(todaySchedules);
        }).catch((err) => {
          console.error("오늘 일정 불러오기 실패", err);
        });
        }, [userInfo.emp_code_id]);


    if (!todayEvents || todayEvents.length === 0) {
      return <p>이벤트가 없습니다.</p>;
    }
  
    return (
      <div className="custom-view">
        <h3>오늘의 일정</h3>
        <ul>
          {todayEvents.map((event, index) => (
            <li key={index}>
              <strong>{event.title}</strong><br/>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

  export default MainpageSchedule;