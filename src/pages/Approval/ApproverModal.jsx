// 📄 ApproverModal.jsx - 단계별 결재자 선택 모달

import React, { useState } from "react";
import Modal from "react-modal";

// 단계 수 상수화
const LEVELS = [1, 2, 3, 4, 5];

Modal.setAppElement("#root");

const ApproverModal = ({ isOpen, onClose, onSelect, selectedApprovers }) => {
  const [level, setLevel] = useState(null);
  const [tempApprovers, setTempApprovers] = useState(selectedApprovers || {});

  // 임시 더미 사원 데이터
  const dummyEmployees = [
    { id: "101", name: "홍길동" },
    { id: "102", name: "김철수" },
    { id: "103", name: "이영희" },
    { id: "104", name: "최준호" },
    { id: "105", name: "박미정" },
  ];

  const handleApproverClick = (employee) => {
    if (level === null) return;
    setTempApprovers((prev) => ({ ...prev, [level]: employee }));
    setLevel(null); // 선택 후 초기화
  };

  const handleSave = () => {
    // 최종 결재자(5단계)는 반드시 선택되어야 함
    if (!tempApprovers[5]) {
      alert("최종 결재자를 선택해주세요 (5단계)");
      return;
    }
    onSelect(tempApprovers);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="결재자 선택"
      style={{
        content: { width: "600px", margin: "auto", borderRadius: "12px" },
      }}
    >
      <h2>🧑‍⚖️ 결재자 선택</h2>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {LEVELS.map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            style={{
              background: level === lvl ? "#222" : "#eee",
              color: level === lvl ? "#fff" : "#000",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {lvl === 5 ? `최종결재자` : `${lvl}단계`}
          </button>
        ))}
      </div>

      {level && (
        <div style={{ borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
          <h4>{level === 5 ? "최종 결재자" : `${level}단계`} 결재자 선택</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {dummyEmployees.map((emp) => (
              <button
                key={emp.id}
                onClick={() => handleApproverClick(emp)}
                style={{
                  border: "1px solid #aaa",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  background: "#f8f8f8",
                }}
              >
                {emp.name} ({emp.id})
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: "1rem" }}>
        <h4>📝 선택된 결재자</h4>
        <ul>
          {LEVELS.map((lvl) => (
            <li key={lvl}>
              {lvl === 5 ? "최종결재자" : `${lvl}단계`} :
              {tempApprovers[lvl]
                ? ` ${tempApprovers[lvl].name} (${tempApprovers[lvl].id})`
                : " 미지정"}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "1rem", textAlign: "right" }}>
        <button onClick={handleSave} style={{ marginRight: "1rem" }}>
          저장 ✅
        </button>
        <button onClick={onClose}>닫기 ❌</button>
      </div>
    </Modal>
  );
};

export default ApproverModal;
