import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import daxios from '../axios/axiosConfig';
import { format } from 'date-fns';
import useAuthStore from '../store/useAuthStore';
import useWorkStore from '../store/useWorkStore';
import MainpageSchedule from '../pages/Schedule/MainpageSchedule';


const Sidebar = () => {
  const { token, userId } = useAuthStore();
  const {
    checkInTime,
    checkOutTime,
    isCheckedIn,
    isCheckedOut,
    setCheckInTime,
    setCheckOutTime,
    setIsCheckedIn,
    setIsCheckedOut,
    setCurrentActivity
  } = useWorkStore();

  const [todayAttendanceId, setTodayAttendanceId] = useState(null);
  const [currentActivity] = useState("");
  const [outingTime, setOutingTime] = useState("");
  const [workTime, setWorkTime] = useState("");

  // ✅ 출근 시간 + attendance_id 받아오기
  useEffect(() => {
    const fetchCheckInData = async () => {
      try {
        const res1 = await daxios.get("http://10.10.55.66/work/checkInTime", {
          headers: { Authorization: `Bearer ${token}` }

        });
        const res2 = await daxios.get("http://10.10.55.66/work/attendanceId", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const time = res1.data;
        const id = res2.data;

        if (time) {
          setCheckInTime(new Date(time));
          setIsCheckedIn(true);
        } else {
          setCheckInTime(null);
          setIsCheckedIn(false);
        }

        if (id) {
          setTodayAttendanceId(id);
        }
      } catch (error) {
        console.error("출근 정보 가져오기 실패", error);
        setIsCheckedIn(false);
        setTodayAttendanceId(null);
      }
    };

    fetchCheckInData();
  }, [setCheckInTime, setIsCheckedIn, token]);

  const handleCheckIn = async () => { // 출근근
    const currentTime = new Date().toISOString();

    try {
      const response = await daxios.post("http://10.10.55.66/work/checkIn", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ 출근 완료:', response.data);
      setIsCheckedIn(true);
      setCheckInTime(new Date(currentTime));
      setCurrentActivity("출근");
    } catch (error) {
      console.error('❌ 출근 실패', error);
    }
  };

  const handleCheckOut = async () => {  // 퇴근근
    const currentTime = new Date().toISOString();

    try {
      const response = await daxios.post("http://10.10.55.66/work/checkOut", {
        checkOutTime: currentTime
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      console.log('퇴근 완료:', response.data);
      setIsCheckedOut(true);
      setIsCheckedIn(false);
      setCheckOutTime(new Date(currentTime));
      setCurrentActivity("퇴근");
    } catch (error) {
      console.log('❌ 퇴근 실패', error);
    }
  };

  const handleActivityStart = async (type) => { // 중간 데이터터
    const now = new Date().toISOString();

    setCurrentActivity(type);
    if (type === "외근") setOutingTime(now);
    if (type === "업무") setWorkTime(now);

    try {
      const response = await daxios.post("http://10.10.55.66/work/start", {
        attendance_id: todayAttendanceId,
        activity_type: type,
        start_time: now
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log(`${type} 시작`, response.data);
    } catch (error) {
      console.error(`${type} 요청 실패`, error);
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h3>근무체크</h3>
        <div className="sidebar-item">🕒 출근시간: 09:00</div>
        <div className="sidebar-item">🏠 퇴근시간: 18:00</div>
        <div className="sidebar-item">📅 일정 없음</div>

        <button onClick={handleCheckIn} disabled={isCheckedIn || isCheckedOut}>출근</button>
        <button onClick={handleCheckOut} disabled={!isCheckedIn || isCheckedOut}>퇴근</button>
        <button onClick={() => handleActivityStart("외근")} disabled={!isCheckedIn || isCheckedOut}>외근</button>
        <button onClick={() => handleActivityStart("업무")} disabled={!isCheckedIn || isCheckedOut}>업무</button>

        <div className="current-activity">
          {currentActivity && <p>현재 활동: {currentActivity}</p>}
        </div>
        <div className="time-logs">
          {checkInTime && <p>출근 시간: {checkInTime.toLocaleString()}</p>}
          {checkOutTime && <p>퇴근 시간: {checkOutTime.toLocaleString()}</p>}
          {outingTime && <p>외근 시작: {outingTime}</p>}
          {workTime && <p>업무 시작: {workTime}</p>}
        </div>
      </div>

      <div className="sidebar">
        <h3>전자결제</h3>
        <div>내용 알아서 추가해주세요!</div>
      </div>

      <div className="sidebar">
        <div><MainpageSchedule /></div>
      </div>
    </div>
  );
};

export default Sidebar;
