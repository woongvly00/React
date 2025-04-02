import React, { useState } from 'react';
import './Sidebar.css';
import axios from 'axios';

const Sidebar = () => {

  const [isCheckedIn, setIsCheckedIn] = useState(false); // 출근 상태
  const [isCheckedOut, setIsCheckedOut] = useState(false); // 퇴근 상태
  const [currentActivity, setCurrentActivity] = useState(""); // 현재 활동 (출근, 퇴근, 외근, 업무)
  const [checkInTime, setCheckInTime] = useState(""); // 출근 시간
  const [checkOutTime, setCheckOutTime] = useState(""); // 퇴근 시간
  const [outingTime, setOutingTime] = useState(""); // 외근 시간
  const [workTime, setWorkTime] = useState(""); // 업무 시간

  // 출근 핸들러
  const handleCheckIn = async () => {
    const currentTime = new Date().toISOString();

    try {
      const response = await axios.post("http://10.10.55.69/work/checkIn", { checkInTime: currentTime });
      console.log('서버 응답:', response.data);
      setIsCheckedIn(true);
      setCurrentActivity("출근");
      setCheckInTime(currentTime); // 출근 시간 저장
    } catch (error) {
      console.log('출근 시간 전송 오류', error);
    }
  };

  const handleCheckOut = async () => {
    const currentTime = new Date().toISOString();

    try {
      const response = await axios.post("http://10.10.55.69/work/checkOut", { checkOutTime: currentTime });
      console.log('서버 응답:', response.data);
      setIsCheckedOut(true);
      setIsCheckedIn(false);
      setCurrentActivity("퇴근");
      setCheckOutTime(currentTime); // 퇴근 시간 저장
    } catch (error) {
      console.log('퇴근 시간 전송 오류', error);
    }
  };

  const handleOuting = async () => {
    const currentTime = new Date().toISOString();
    setOutingTime(currentTime); // 외근 시간 저장
    setCurrentActivity("외근");
    console.log("외근 시간:", currentTime); 
  };

  const handleWork = async () => {
    const currentTime = new Date().toISOString();
    setWorkTime(currentTime); // 업무 시간 저장
    setCurrentActivity("업무");
    console.log("업무 시간:", currentTime); 
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
        <button onClick={handleOuting} disabled={!isCheckedIn || isCheckedOut}>외근</button>
        <button onClick={handleWork} disabled={!isCheckedIn || isCheckedOut}>업무</button>
        <div className="current-activity">
          {currentActivity && <p>현재 활동: {currentActivity}</p>}
        </div>
        <div className="time-logs">
          {checkInTime && <p>출근 시간: {new Date(checkInTime).toLocaleString()}</p>}
          {checkOutTime && <p>퇴근 시간: {new Date(checkOutTime).toLocaleString()}</p>}
          {outingTime && <p>외근 시간: {new Date(outingTime).toLocaleString()}</p>}
          {workTime && <p>업무 시간: {new Date(workTime).toLocaleString()}</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
