import React from "react";

const dummyUsers = [
  { id: 1, name: "김대리" },
  { id: 2, name: "박과장" },
  { id: 3, name: "이부장" },
];

const ApproverModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const handleSelect = (user) => {
    onSelect([user]);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div style={{ background: "#fff", padding: "2rem", borderRadius: "10px" }}>
        <h3>결재자 선택</h3>
        <ul>
          {dummyUsers.map((u) => (
            <li key={u.id}>
              <button onClick={() => handleSelect(u)}>{u.name}</button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} style={{ marginTop: "1rem" }}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default ApproverModal;
