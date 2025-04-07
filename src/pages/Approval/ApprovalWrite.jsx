import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const FormWrite = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const navigate = useNavigate();

  // 🔹 양식 목록 호출
  useEffect(() => {
    axios.get("http://10.10.55.22:80/api/forms")
      .then(res => {
        console.log("✅ 양식 목록:", res.data);
        setForms(res.data || []);
      })
      .catch(err => console.error("양식 목록 호출 실패", err));
  }, []);

  // 🔹 셀렉트 박스에서 양식 선택
  const handleFormSelect = (e) => {
    const formId = parseInt(e.target.value);
    const selected = forms.find(f => f?.formId === formId);
    setSelectedForm(selected || null);
  };

  // 🔹 다음 단계 이동
  const handleNext = () => {
    if (!selectedForm) {
      alert("양식을 먼저 선택해주세요!");
      return;
    }

    navigate("/mainpage/maincontent/approval/write/next", {
      state: {
        formId: selectedForm.formId,
        formName: selectedForm.formName,
        formContent: selectedForm.formContent
      }
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📄 전자결재 양식 선택</h2>

      <div>
        <label>양식 선택</label><br />
        <select onChange={handleFormSelect} defaultValue="">
          <option value="" disabled>양식을 선택하세요</option>
          {forms && forms.length > 0 && forms.map((form) => (
            <option key={form.formId} value={form.formId}>
              {form.formName || "제목 없음"}
            </option>
          ))}
        </select>
      </div>

      {selectedForm && (
        <div style={{
          marginTop: "2rem",
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "5px"
        }}>
          <h4>📑 양식 미리보기</h4>
          <p><strong>제목:</strong> {selectedForm.formName}</p>
          <Editor
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            value={selectedForm.formContent}
            init={{
              height: 300,
              menubar: false,
              plugins: ['link', 'lists', 'table'],
              toolbar: false,
              readonly: true
            }}
            disabled={true}
          />
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <button onClick={handleNext}>다음 단계 ➡️</button>
      </div>
    </div>
  );
};

export default FormWrite;
