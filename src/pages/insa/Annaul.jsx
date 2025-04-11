import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from './ProgressBar';
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

  const totalWorkedHours = 38.5;
  const maxWeeklyHours = 52;
  const overtimeHours = 6.5;

  const averageStart = "09:12";
  const averageEnd = "18:34";
  const continuousDays = 4;

  const totalAnnualLeave = 15;
  const usedAnnualLeave = 6;
  const remainingAnnualLeave = 9;
  const expiringThisYear = 2;

  const progressPercent = (totalWorkedHours / maxWeeklyHours) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2>📊 휴가 / 출장 기록 관리</h2>
        <div className={styles.statusBadge}>
          {currentActivity || "대기 중"}
        </div>
      </div>

      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <h3>📅 개인 출장</h3>
          </div>
          <div>
            여기 출장?
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <h3>🌿 부서 휴가</h3>
          </div>
          <div>
            여기 휴가?
          </div>
        </div>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.detailCard}>
          <div className={styles.cardHeader}>
            <h3>📈 ???</h3>
          </div>
          <div>
                ???
          </div>
        </div>
      </div>
    </div>
  );
};

export default Annal;