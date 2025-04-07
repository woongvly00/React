import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormWrite = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const navigate = useNavigate();

  // 🔹 양식 목록 호출
  useEffect(() => {
    axios.get("/api/forms")
      .then(res => setForms(res.data))
      .catch(err => console.error("양식 목록 호출 실패", err));
  }, []);

  const handleFormSelect = (e) => {
    const formId = parseInt(e.target.value);
    const selected = forms.find(f => f.formId === formId);
    setSelectedForm(selected);
  };

  const handleNext = () => {
    if (!selectedForm) {
      alert("양식을 선택해주세요.");
      return;
    }

    // formId만 넘김 → 다음 화면에서 제목, 내용, 파일, 결재선 작성
    navigate("/approval/write/next", {
      state: {
        formId: selectedForm.formId,
        formName: selectedForm.formName,
        formDesc: selectedForm.formDesc
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
          {forms.map(form => (
            <option key={form.formId} value={form.formId}>
              {form.formName}
            </option>
          ))}
        </select>
      </div>

      {selectedForm && (
        <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem", borderRadius: "5px" }}>
          <h4>📑 양식 미리보기</h4>
          <p><strong>제목:</strong> {selectedForm.formName}</p>
          <p><strong>설명:</strong> {selectedForm.formDesc}</p>
          {/* 필요 시 샘플 미리보기 html도 여기에 렌더링 가능 */}
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <button onClick={handleNext}>다음 단계 ➡️</button>
      </div>
    </div>
  );
};

export default FormWrite;
