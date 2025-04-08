import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ApprovalWrite = () => {
  const [forms, setForms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [empCodeId, setEmpCodeId] = useState(null);
  const [selectedFormId, setSelectedFormId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 🔹 양식 목록
    axios.get("http://10.10.55.22/api/forms", { withCredentials: true })
      .then((res) => {
        setForms(res.data);
        console.log("📄 forms:", res.data);
      })
      .catch(() => alert("양식 목록을 불러올 수 없습니다."));

    // 🔹 결재 종류
    axios.get("http://10.10.55.22/api/category", { withCredentials: true })
      .then((res) => {
        setCategories(res.data);
        console.log("🗂️ categories:", res.data);
      })
      .catch((err) => {
        console.error("❌ 결재 종류 오류:", err);
        alert("결재 종류를 불러올 수 없습니다.");
      });

    // 🔹 로그인 사원 코드
    axios.get("http://10.10.55.22/api/employee/code", { withCredentials: true })
      .then((res) => {
        setEmpCodeId(res.data);
        console.log("🙋 empCodeId:", res.data);
      })
      .catch((err) => {
        console.error("❌ 사원 코드 오류:", err);
        alert("로그인 정보를 불러오지 못했습니다.");
      });
  }, []);

  const handleStart = () => {
    if (!selectedFormId || !selectedCategoryId || !empCodeId) {
      alert("모든 값을 선택해 주세요.");
      return;
    }

    navigate("/mainpage/maincontent/approval/write/next", {
      state: {
        formId: Number(selectedFormId),
        edmsCId: Number(selectedCategoryId),
        comId: empCodeId,
        stateCode: 1,
        refDept: "D001",
        level1: 2,
        level2: 3,
        level3: null,
        level4: null,
        finalLevel: 2,
      },
    });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>📄 사용할 양식 및 결재 종류를 선택하세요</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>양식 선택:</label>
        <select
          value={selectedFormId}
          onChange={(e) => setSelectedFormId(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        >
          <option value="">-- 양식을 선택하세요 --</option>
          {forms.map((form) => (
            <option key={form.formId} value={form.formId}>
              {form.formName}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>결재 종류 선택:</label>
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        >
          <option value="">-- 결재 종류를 선택하세요 --</option>
          {categories.map((cat) => (
            <option key={cat.edmsCId} value={cat.edmsCId}>
              {cat.edmsCName}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleStart} style={{ padding: "0.75rem", width: "100%" }}>
        ✍️ 작성 시작
      </button>
    </div>
  );
};

export default ApprovalWrite;
