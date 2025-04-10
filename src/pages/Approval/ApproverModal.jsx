import React, { useEffect, useState } from "react";
import axios from "axios";

const ApproverModal = ({ isOpen, onClose, onSelect }) => {
  const [employees, setEmployees] = useState([]);
  const [levels, setLevels] = useState({
    level1: null,
    level2: null,
    level3: null,
    level4: null,
    finalLevel: null,
  });

  useEffect(() => {
    if (!isOpen) return;
    axios
      .get("http://10.10.55.22/api/employee/list")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.error("❌ 사원 목록 불러오기 실패", err);
      });
  }, [isOpen]);

  const handleSelect = (e, levelKey) => {
    const empCodeId = Number(e.target.value);
    const selected = employees.find((emp) => emp.empCodeId === empCodeId);
    setLevels((prev) => ({
      ...prev,
      [levelKey]: selected || null,
    }));
  };

  const handleConfirm = () => {
    onSelect(levels);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          minWidth: "400px",
        }}
      >
        <h2>결재자 선택</h2>

        {["level1", "level2", "level3", "level4", "finalLevel"].map((key) => (
          <div key={key} style={{ marginBottom: "1rem" }}>
            <label>{key.toUpperCase()} 결재자:</label>
            <select
              onChange={(e) => handleSelect(e, key)}
              value={levels[key]?.empCodeId || ""}
            >
              <option value="">-- 선택하세요 --</option>
              {employees.map((emp) => (
                <option key={emp.empCodeId} value={emp.empCodeId}>
                  {emp.empName} ({emp.jobName})
                </option>
              ))}
            </select>
          </div>
        ))}

        <div style={{ marginTop: "1.5rem" }}>
          <button onClick={handleConfirm} style={{ marginRight: "1rem" }}>
            확인
          </button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default ApproverModal;
