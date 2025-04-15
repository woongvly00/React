import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './insapage.module.css';
import useWorkStore from '../../store/useWorkStore';

const Annal = () => {
  const {
    checkInTime,
    checkOutTime,
    isCheckedOut,
    currentActivity
  } = useWorkStore();

  const [todayWorkedTime, setTodayWorkedTime] = useState("00:00:00");
  const [summaryData, setSummaryData] = useState({
    personalBusinessTrips: [],
    departmentLeaves: [],
    notCheckedInToday: []
  });

  // 🕒 근무 시간 타이머
  useEffect(() => {
    let interval;

    if (checkInTime && !isCheckedOut) {
      interval = setInterval(() => {
        const now = new Date();
        const start = new Date(checkInTime);
        const diff = Math.floor((now - start) / 1000);

        const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
        const seconds = String(diff % 60).padStart(2, "0");

        setTodayWorkedTime(`${hours}:${minutes}:${seconds}`);
      }, 1000);
    } else if (checkInTime && checkOutTime) {
      const start = new Date(checkInTime);
      const end = new Date(checkOutTime);
      const diff = Math.floor((end - start) / 1000);

      const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      const seconds = String(diff % 60).padStart(2, "0");

      setTodayWorkedTime(`${hours}:${minutes}:${seconds}`);
    }

    return () => clearInterval(interval);
  }, [checkInTime, checkOutTime, isCheckedOut]);

  // 📦 인사 데이터 로딩 (출장, 휴가, 출근X 인원)
  useEffect(() => {
    axios.get("http://10.10.55.66/insa/admin-summary")
      .then(res => {
        setSummaryData(res.data);
      })
      .catch(err => {
        console.error("데이터 불러오기 실패:", err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2>📊 휴가 / 출장 기록 관리</h2>
        <div className={styles.statusBadge}>
          {currentActivity || "대기 중"}
        </div>
      </div>

      <div className={styles.summaryGrid}>
        {/* 개인 출장 */}
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <h3>📅 개인 출장</h3>
          </div>
          <ul>
            {summaryData.personalBusinessTrips.length > 0 ? (
              summaryData.personalBusinessTrips.map((trip, idx) => (
                <li key={idx}>{trip.empName} - {trip.date} ({trip.location})</li>
              ))
            ) : (
              <li>오늘 등록된 출장 없음</li>
            )}
          </ul>
        </div>

        {/* 부서 휴가 */}
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <h3>🌿 부서 휴가</h3>
          </div>
          <ul>
            {summaryData.departmentLeaves.length > 0 ? (
              summaryData.departmentLeaves.map((leave, idx) => (
                <li key={idx}>{leave.empName} - {leave.date} ({leave.type})</li>
              ))
            ) : (
              <li>오늘 휴가 등록 없음</li>
            )}
          </ul>
        </div>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.detailCard}>
          <div className={styles.cardHeader}>
            <h3>❌ 오늘 출근 안 한 인원</h3>
          </div>
          <ul>
            {summaryData.notCheckedInToday.length > 0 ? (
              summaryData.notCheckedInToday.map((emp, idx) => (
                <li key={idx}>{emp.empName} ({emp.deptName})</li>
              ))
            ) : (
              <li>모든 인원이 출근했습니다</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Annal;
