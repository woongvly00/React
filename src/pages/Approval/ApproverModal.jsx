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
  const [template] = useState(formContent || "");

  const approverDisplayNames = () =>
    Object.values(approverLevels)
      .filter(Boolean)
      .map((a) => a.name)
      .join(" → ");

  const handleFileChange = (e) => setFiles(Array.from(e.target.files));

  const openApproverModal = (level) => {
    setCurrentLevel(level);
    setApproverModalOpen(true);
  };

  const handleApproverSelect = (users) => {
    const updated = {
      level1: users[0] || null,
      level2: users[1] || null,
      level3: users[2] || null,
      level4: users[3] || null,
      final: users[4] || null,
    };
    setApproverLevels(updated);

    const updatedContent = template
      .replace(/{{제목}}/g, title)
      .replace(/{{결재선}}/g, approverDisplayNames());
    window.tinymce?.get("formContent")?.setContent(updatedContent);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const updated = template
      .replace(/{{제목}}/g, newTitle)
      .replace(/{{결재선}}/g, approverDisplayNames());
    window.tinymce?.get("formContent")?.setContent(updated);
  };

  const handleSubmit = async () => {
    const approvers = Object.values(approverLevels).filter(Boolean);
    const hasFinal = approverLevels.final && approverLevels.final.name;

    if (!title.trim()) {
      alert("제목을 입력해주세요!");
      return;
    }

    if (!hasFinal) {
      alert("최종 결재자를 설정해주세요!");
      return;
    }

    const rawEditorContent = window.tinymce?.get("formContent")?.getContent() || "";

    const finalContent = rawEditorContent
      .replace(/{{제목}}/g, title)
      .replace(/{{결재선}}/g, approverDisplayNames());

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
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>본문</label>
        <Editor
          id="formContent"
          apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
          initialValue={formContent || ""}
          init={{
            height: 300,
            menubar: false,
            inline: true,
            body_class: "custom-editor-body",
            content_style: `
              .custom-editor-body {
                background-color: #fff !important;
                color: #000 !important;
                font-family: 'Segoe UI', sans-serif !important;
                padding: 1rem !important;
                line-height: 1.6;
                font-size: 16px;
              }
              table {
                border-collapse: collapse;
                width: 100%;
              }
              td, th {
                border: 1px solid #ddd;
                padding: 8px;
              }
              h1, h2, h3 {
                font-weight: bold;
                margin-top: 1em;
              }
            `,
            plugins: "table lists code",
            toolbar:
              "undo redo | styleselect | bold italic | alignleft aligncenter alignright | table | code",
          }}
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
                {level.toUpperCase()} {user?.name ? `: ${user.name}` : "선택"}
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
