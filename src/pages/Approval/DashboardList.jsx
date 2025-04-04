// DashboardList.jsx
import React from 'react';
import './DashboardList.css';

const DashboardList = ({ list, type }) => {
  return (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>제목</th>
          {type === 'waiting' && <th>기안자</th>}
          <th>문서 유형</th>
          <th>결재 상태</th>
          <th>기안일</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            <td>{item.title}</td>
            {type === 'waiting' && <td>{item.requester}</td>}
            <td>{item.formType || '일반'}</td>
            <td>{item.status}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DashboardList;
