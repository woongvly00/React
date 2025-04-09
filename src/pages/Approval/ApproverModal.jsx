// ApproverModal.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ApproverModal = ({ isOpen, onClose, onSelect }) => {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState({
    level1: null,
    level2: null,
    level3: null,
    level4: null,
    finalLevel: null,
  });

  useEffect(() => {
    if (isOpen) {
      axios.get("http://10.10.55.22/api/employee/list")
        .then((res) => setEmployees(res.data))
        .catch((err) => console.error("사원 목록 불러오기 실패", err));
    }
  }, [isOpen]);

  const handleChange = (level, empCode) => {
    const emp = employees.find(e => String(e.code) === empCode);
    setSelected(prev => ({ ...prev, [level]: emp }));
  };

  const handleConfirm = () => {
    onSelect({
      level1: selected.level1,
      level2: selected.level2,
      level3: selected.level3,
      level4: selected.level4,
      finalLevel: selected.finalLevel,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h3>결재자 선택</h3>
      {["level1", "level2", "level3", "level4", "finalLevel"].map((level) => (
        <div key={level}>
          <label>{level}</label>
          <select onChange={(e) => handleChange(level, e.target.value)}>
            <option value="">선택하세요</option>
            {employees.map((emp) => (
              <option key={emp.code} value={emp.code}>
                {emp.name} ({emp.position})
              </option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={handleConfirm}>확인</button>
      <button onClick={onClose}>취소</button>
    </div>
  );
};

export default ApproverModal;
