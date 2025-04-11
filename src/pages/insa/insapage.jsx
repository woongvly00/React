import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import styles from './insapage.module.css';
import useWorkStore from '../../store/useWorkStore';

const InsaPage = () => {
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
        <h2>📊 주간 근태 요약</h2>
        <div className={styles.statusBadge}>
          {currentActivity || "대기 중"}
        </div>
      </div>

      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <h3>📅 근무 현황</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.statRow}>
              <span>출근한 날</span>
              <span className={styles.statValue}>5일</span>
            </div>
            <div className={styles.statRow}>
              <span>오늘 근무 시간</span>
              <span className={styles.statValue}>{todayWorkedTime}</span>
            </div>
            <div className={styles.statRow}>
              <span>주 52시간</span>
              <span className={styles.statValue}>{totalWorkedHours}h / {maxWeeklyHours}h</span>
            </div>
            <ProgressBar percent={progressPercent} />
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <h3>🌿 연차 현황</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.leaveGrid}>
              <div className={styles.leaveItem}>
                <span className={styles.leaveLabel}>총 연차</span>
                <span className={styles.leaveValue}>{totalAnnualLeave}일</span>
              </div>
              <div className={styles.leaveItem}>
                <span className={styles.leaveLabel}>사용</span>
                <span className={styles.leaveValue}>{usedAnnualLeave}일</span>
              </div>
              <div className={styles.leaveItem}>
                <span className={styles.leaveLabel}>잔여</span>
                <span className={styles.leaveValue}>{remainingAnnualLeave}일</span>
              </div>
              <div className={styles.leaveItem}>
                <span className={styles.leaveLabel}>소멸 예정</span>
                <span className={styles.leaveValue}>{expiringThisYear}일</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.detailCard}>
          <div className={styles.cardHeader}>
            <h3>📈 근무 패턴 분석 (이번 주)</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.patternGrid}>
              <div className={styles.patternItem}>
                <div className={styles.iconWrapper}>🕘</div>
                <span className={styles.patternLabel}>평균 출근 시간</span>
                <span className={styles.patternValue}>{averageStart}</span>
              </div>
              <div className={styles.patternItem}>
                <div className={styles.iconWrapper}>🕕</div>
                <span className={styles.patternLabel}>평균 퇴근 시간</span>
                <span className={styles.patternValue}>{averageEnd}</span>
              </div>
              <div className={styles.patternItem}>
                <div className={styles.iconWrapper}>📆</div>
                <span className={styles.patternLabel}>연속 근무 일수</span>
                <span className={styles.patternValue}>{continuousDays}일</span>
              </div>
              <div className={styles.patternItem}>
                <div className={styles.iconWrapper}>⏱</div>
                <span className={styles.patternLabel}>누적 초과근무</span>
                <span className={styles.patternValue}>{overtimeHours}시간</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsaPage;