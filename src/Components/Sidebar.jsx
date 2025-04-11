import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import daxios from '../axios/axiosConfig';
import { format } from 'date-fns';
import useAuthStore from '../store/useAuthStore';
import useWorkStore from '../store/useWorkStore';

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

  const [currentActivity] = useState("");
  const [outingTime, setOutingTime] = useState("");
  const [workTime, setWorkTime] = useState("");

  useEffect(() => {
    const fetchCheckInTime = async () => {
      try {

        const response = await axios.get("http://10.10.55.22/work/checkInTime", {

          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        const time = response.data;
        
        if (time) {
          setCheckInTime(new Date(time));
          setIsCheckedIn(true);
        } else {
          setCheckInTime(null);
          setIsCheckedIn(false);
        }
      } catch (error) {
        setCheckInTime(null);
        setIsCheckedIn(false); // 서버 실패 시 확실하게 리셋
        console.error("출근 시간 불러오기 실패", error);
      }
    };
  
    fetchCheckInTime();
  }, [setCheckInTime, setIsCheckedIn, token]);
  

  const handleCheckIn = async () => {
    const currentTime = new Date().toISOString();
  
    try {
      const response = // ✅ 백엔드가 JWT에서 userId를 추출하므로 body에 아무것도 안 넣어도 됨
      await daxios.post(
        "http://10.10.55.69/work/checkIn",
        {}, // 데이터 없음
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        } );
  
      console.log('✅ 출근 완료:', response.data);
      setIsCheckedIn(true);
      setCheckInTime(new Date(currentTime));
      setCurrentActivity("출근");
    } catch (error) {
      console.error('❌ 출근 시간 전송 오류', error.response?.data || error.message);
    }
  };
  

  const handleCheckOut = async () => {
    const currentTime = new Date().toISOString();

    try {
      const response = await daxios.post(
        "http://10.10.55.69/work/checkOut",
        {
          checkOutTime: currentTime
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('서버 응답:', response.data);
      setIsCheckedOut(true);
      setIsCheckedIn(false);
      setCheckOutTime(new Date(currentTime));
      setCurrentActivity("퇴근");
    } catch (error) {
      console.log('퇴근 시간 전송 오류', error);
    }
  };

  const handleOuting = async () => {
    const currentTime = new Date();
    const formattedTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');

    setOutingTime(formattedTime);
    setCurrentActivity("외근");
    console.log("외근 시간:", formattedTime);

    try {
      const response = await daxios.post("http://10.10.55.69/work/outing",
        {
          outingTime: formattedTime,
          emp_loginId: userId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.log('외근 시간 전송 오류', error);
    }
  };

  const handleWork = async () => {
    const currentTime = new Date();
    const formattedTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');

    setWorkTime(formattedTime);
    setCurrentActivity("업무");
    console.log("업무 시간:", formattedTime);

    try {
      const response = await daxios.post("http://10.10.55.69/work/work",
        {
          workTime: formattedTime,
          emp_loginId: userId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.log('업무 시간 전송 오류', error);
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

      <div className="sidebar">
        <h3>전자결제</h3>
        <div>내용 알아서 추가해주세요!</div>
      </div>

      <div className="sidebar">
        <h3>일정</h3>
        <div>내용 알아서 추가해주세요!</div>
      </div>
    </div>
  );
};

export default Sidebar;