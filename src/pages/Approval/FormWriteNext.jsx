// 📄 FormWriteNext.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import ApproverModal from "./ApproverModal";
import axios from "axios";

const FormWriteNext = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formId, formName, formContent } = location.state || {};

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(formContent || "");
  const [files, setFiles] = useState([]);
  const [approverModalOpen, setApproverModalOpen] = useState(false);
  const [approverLevels, setApproverLevels] = useState({
    level1: null,
    level2: null,
    level3: null,
    level4: null,
    final: null,
  });
  const [currentLevel, setCurrentLevel] = useState(null);

  // 첨부파일 변경
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // 결재자 모달 열기
  const openApproverModal = (level) => {
    setCurrentLevel(level);
    setApproverModalOpen(true);
  };

  // 결재자 선택 후 저장
  const handleApproverSelect = (user) => {
    setApproverLevels((prev) => ({ ...prev, [currentLevel]: user }));
    setApproverModalOpen(false);
  };

  // 제출
  const handleSubmit = async () => {
    const approvers = Object.values(approverLevels).filter(Boolean);

    if (!title || !content || !approverLevels.final) {
      alert("제목, 본문, 최종결재자를 입력해주세요!");
      return;
    }

    let finalContent = content
      .replace(/{{제목}}/g, title)
      .replace(/{{결재선}}/g, approvers.map((a) => a.name).join(" → "));

    const formData = new FormData();
    formData.append("formId", formId);
    formData.append("title", title);
    formData.append("content", finalContent);
    approvers.forEach((a, idx) => formData.append(`approverIds[${idx}]`, a.id));
    files.forEach((file) => formData.append("files", file));

    try {
      await axios.post("/api/approval/request", formData);
      alert("전자결재 요청이 완료되었습니다.");
      navigate("/mainpage/maincontent/approval");
    } catch (err) {
      console.error("전자결재 제출 실패", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>✍️ 전자결재 문서 작성</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>양식 제목</label>
        <input type="text" value={formName} readOnly style={{ width: "100%" }} />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>제목</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%" }} />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>본문</label>
        <Editor
          apiKey={process.env.REACT_APP_TINYMCE_KEY}
          value={content}
          onEditorChange={(newValue) => setContent(newValue)}
          init={{ height: 300, menubar: false }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>첨부파일</label>
        <input type="file" multiple onChange={handleFileChange} />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>결재선 지정</label>
        <div>
          {Object.entries(approverLevels).map(([level, user]) => (
            <div key={level} style={{ marginBottom: "0.5rem" }}>
              <button onClick={() => openApproverModal(level)}>
                {level.toUpperCase()} {user ? `: ${user.name}` : "선택"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit}>제출하기 ✅</button>

      <ApproverModal
        isOpen={approverModalOpen}
        onClose={() => setApproverModalOpen(false)}
        onSelect={handleApproverSelect}
      />
    </div>
  );
};

export default FormWriteNext;
