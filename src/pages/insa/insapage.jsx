import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import './insapage.module.css';
import useAuthStore from '../../store/useAuthStore';
import useWorkStore from '../../store/useWorkStore';

const InsaPage = () => {
  const { token } = useAuthStore();
  const { checkInTime, checkOutTime } = useWorkStore();

  const [summary, setSummary] = useState(null);
  const [todayWorkedTime, setTodayWorkedTime] = useState("00:00:00");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("http://10.10.55.66/insa/summary", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSummary(response.data);
      } catch (error) {
        console.error("근태 요약 정보 불러오기 실패", error);
      }
    };

    fetchSummary();
  }, [token]);

  // 오늘 근무시간 실시간 계산
  useEffect(() => {
    let interval;
    if (checkInTime && !checkOutTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now - new Date(checkInTime)) / 1000);
        const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
        const seconds = String(diff % 60).padStart(2, '0');
        setTodayWorkedTime(`${hours}:${minutes}:${seconds}`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [checkInTime, checkOutTime]);

  if (!summary) return <div>로딩 중...</div>;

  const progressPercent = (summary.weeklyWorkHours / 52) * 100;

  return (
    <div className="container">
      <h2>📊 주간 근태 요약</h2>

      <div className="summary-card">
        <div><strong>출근한 날</strong> {summary.weeklyWorkedDays}일</div>
        <div><strong>오늘 근무 시간</strong> {todayWorkedTime}</div>
        <div><strong>현재 상태</strong> {checkOutTime ? '퇴근' : '업무 중'}</div>
        <div><strong>52시간 중</strong></div>
        <ProgressBar percent={progressPercent} />
        <div className="time-compare">{summary.weeklyWorkHours}h / 52h</div>
      </div>

      <div className="annual-summary">
        <h3>🌿 연차 요약</h3>
        <ul>
          <li>총 연차: <strong>{summary.totalAnnual}일</strong></li>
          <li>사용한 연차: <strong>{summary.usedAnnual}일</strong></li>
          <li>남은 연차: <strong>{summary.remainingAnnual}일</strong></li>
          <li>올해 소멸 예정: <strong>{summary.expiringThisYear}일</strong></li>
        </ul>
      </div>

      <div className="analysis-section">
        <h3>📅 근무 패턴 분석 (이번 주)</h3>
        <ul>
          <li>🕘 평균 출근 시간: <strong>{summary.averageCheckIn}</strong></li>
          <li>🕕 평균 퇴근 시간: <strong>{summary.averageCheckOut}</strong></li>
          <li>📆 연속 근무 일수: <strong>{summary.consecutiveDays}일</strong></li>
        </ul>
      </div>

      <div className="overtime-section">
        <h3>⏱ 누적 초과근무 시간</h3>
        <p><strong>{summary.totalOvertime}시간</strong> 초과 근무 중</p>
      </div>
    </div>
  );
};

export default InsaPage;
