import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import './insapage.module.css';
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
    <div className="container">
      <h2>📊 주간 근태 요약</h2>

      <div className="summary-card">
        <div><strong>출근한 날</strong> 5일</div>
        <div><strong>오늘 근무 시간</strong> {todayWorkedTime}</div>
        <div><strong>현재 상태</strong> {currentActivity || "대기 중"}</div>
        <div><strong>52시간 중</strong></div>
        <ProgressBar percent={progressPercent} />
        <div className="time-compare">{totalWorkedHours}h / {maxWeeklyHours}h</div>
      </div>

      <div className="annual-summary">
        <h3>🌿 연차 요약</h3>
        <ul>
          <li>총 연차: <strong>{totalAnnualLeave}일</strong></li>
          <li>사용한 연차: <strong>{usedAnnualLeave}일</strong></li>
          <li>남은 연차: <strong>{remainingAnnualLeave}일</strong></li>
          <li>올해 소멸 예정: <strong>{expiringThisYear}일</strong></li>
        </ul>
      </div>

      <div className="analysis-section">
        <h3>📅 근무 패턴 분석 (이번 주)</h3>
        <ul>
          <li>🕘 평균 출근 시간: <strong>{averageStart}</strong></li>
          <li>🕕 평균 퇴근 시간: <strong>{averageEnd}</strong></li>
          <li>📆 연속 근무 일수: <strong>{continuousDays}일</strong></li>
        </ul>
      </div>

      <div className="overtime-section">
        <h3>⏱ 누적 초과근무 시간</h3>
        <p><strong>{overtimeHours}시간</strong> 초과 근무 중</p>
      </div>
    </div>
  );
};

export default InsaPage;
