// 📄 FormWriteNext.jsx : 전자결재 - 본문작성 + 파일 + 결재선 입력 화면

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

const FormWriteNext = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formId, formName, formDesc, formContent } = location.state || {};

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [approvers, setApprovers] = useState([]);

  // ✅ formContent를 본문에 초기 렌더링
  useEffect(() => {
    if (formContent) {
      setContent(formContent);
    }
  }, [formContent]);

  // ✅ 제목 입력 시 본문 내 {{제목}} 자동 치환
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setContent((prev) => prev.replace(/{{제목}}/g, newTitle));
  };

  // ✅ 결재선 입력 시 본문 내 {{결재선}} 자동 치환 (임시)
  const handleApproverInput = (e) => {
    const approverNames = e.target.value.split(",").map((name) => name.trim());
    setApprovers(approverNames);
    setContent((prev) => prev.replace(/{{결재선}}/g, approverNames.join(", ")));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    if (!title || !content || approvers.length === 0) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    const formData = new FormData();
    formData.append("formId", formId);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("formName", formName);
    formData.append("formDesc", formDesc);
    approvers.forEach((a, idx) => formData.append(`approverIds[${idx}]`, a));
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
      <h2>📝 전자결재 문서 작성</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>양식 제목</label>
        <input type="text" value={formName} readOnly style={{ width: "100%" }} />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>양식 설명</label>
        <textarea value={formDesc} readOnly rows={2} style={{ width: "100%" }} />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          style={{ width: "100%" }}
          placeholder="결재 문서 제목 입력"
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>본문</label>
        <Editor
          apiKey={process.env.REACT_APP_TINYMCE_KEY}
          value={content}
          onEditorChange={(newValue) => setContent(newValue)}
          init={{ height: 400, menubar: false }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>첨부파일</label>
        <input type="file" multiple onChange={handleFileChange} />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>결재선 (콤마로 구분)</label>
        <input
          type="text"
          onChange={handleApproverInput}
          placeholder="ex) 홍길동,이몽룡"
          style={{ width: "100%" }}
        />
      </div>

      <button onClick={handleSubmit}>제출하기 ✅</button>
    </div>
  );
};

export default FormWriteNext;
