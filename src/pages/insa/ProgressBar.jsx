import React from 'react';
import styles from './ProgressBar.module.css'; // ✅ CSS 모듈로 import

const ProgressBar = ({ percent }) => {
  return (
    <div className={styles['progress-container']}>
      <div
        className={styles['progress-bar']}
        style={{ width: `${percent}%` }}
      >
        {Math.round(percent)}%
      </div>
    </div>
  );
};

export default ProgressBar;
