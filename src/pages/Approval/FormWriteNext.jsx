// ✅ FormWriteNext.jsx (전체 수정된 버전)

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import ApproverModal from "./ApproverModal";

const applyTemplateData = (template, data) => {
  let result = template;
  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`{{\s*${key}\s*}}`, "g");
    result = result.replace(regex, value || "");
  });
  return result;
};

const FormWriteNext = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    formId: "",
    edmsCId: "",
    comId: "",
    stateCode: 1,
    edmsTitle: "",
    edmsContent: "",
    refDept: 1, // ✅ 숫자형 고정값
    rejectReason: null,
    level1: "",
    level2: "",
    level3: null,
    level4: null,
    finalLevel: "",
    시작일: "",
    종료일: "",
    제목: "",
  });

  const [templateHtml, setTemplateHtml] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!state || !state.formId) return;
      try {
        const empRes = await axios.get("http://10.10.55.22/api/employee/code");

        setFormData((prev) => ({
          ...prev,
          ...state,
          comId: empRes.data,
        }));

        const res = await axios.get(`http://10.10.55.22/api/forms/${state.formId}`);
        const template = res.data.formContent;
        setTemplateHtml(template);

        const updatedContent = applyTemplateData(template, {
          제목: "",
          시작일: "",
          종료일: "",
          결재선: "",
        });

        setFormData((prev) => ({
          ...prev,
          edmsContent: updatedContent,
        }));
      } catch (err) {
        console.error("❌ FormWriteNext 초기화 실패", err);
      }
    };

    loadData();
  }, [state]);

  useEffect(() => {
    if (templateHtml) {
      const 결재선 = `${formData.level1 || ""} → ${formData.level2 || ""} → ${formData.finalLevel || ""}`;
      const replaced = applyTemplateData(templateHtml, {
        제목: formData.제목,
        시작일: formData.시작일,
        종료일: formData.종료일,
        결재선,
      });
      setFormData((prev) => ({ ...prev, edmsContent: replaced }));
    }
  }, [formData.제목, formData.시작일, formData.종료일, formData.level1, formData.level2, formData.finalLevel, templateHtml]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, edmsContent: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        formId: Number(formData.formId),
        edmsCId: Number(formData.edmsCId),
        comId: Number(formData.comId),
        stateCode: Number(formData.stateCode),
        refDept: Number(formData.refDept),
        level1: Number(formData.level1),
        level2: Number(formData.level2),
        level3: formData.level3 ? Number(formData.level3) : null,
        level4: formData.level4 ? Number(formData.level4) : null,
        finalLevel: Number(formData.finalLevel),
        edmsTitle: formData.제목 || "제목 없음",
        edmsContent: formData.edmsContent,
        startDate: formData.시작일 || null,
        endDate: formData.종료일 || null,
      };

      console.log("📤 제출할 formData:", JSON.stringify(payload, null, 2));

      await axios.post("http://10.10.55.22/api/edms/register", payload);
      alert("✅ 제출 완료");
      navigate("/mainpage");
    } catch (err) {
      console.error("❌ 제출 실패", err);
      alert("❌ 제출 실패: 콘솔 확인");
    }
  };

  const isVacationOrBusiness = () => {
    return (
      templateHtml.includes("{{시작일}}") || templateHtml.includes("{{종료일}}")
    );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>전자결재 작성</h2>

      <label>제목</label>
      <input
        name="제목"
        value={formData.제목}
        onChange={handleInputChange}
        required
      />

      {isVacationOrBusiness() && (
        <>
          <label>출장/휴가 시작일</label>
          <input
            type="date"
            name="시작일"
            value={formData.시작일}
            onChange={handleInputChange}
          />
          <label>출장/휴가 종료일</label>
          <input
            type="date"
            name="종료일"
            value={formData.종료일}
            onChange={handleInputChange}
          />
        </>
      )}

      <label>본문 작성</label>
      <Editor
        apiKey="hxn7uw6e8li0hmpqrhwhgm2sr6jrapxrnjhu8g4bvl8cm8fg"
        value={formData.edmsContent}
        onEditorChange={handleEditorChange}
        init={{
          height: 400,
          menubar: true,
          plugins: "lists link image table code preview",
          toolbar:
            "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | code preview",
        }}
      />

      <label>참조 부서</label>
      <input
        name="refDept"
        type="number"
        value={formData.refDept}
        onChange={handleInputChange}
      />

      <button type="button" onClick={() => setIsModalOpen(true)}>
        결재자 선택
      </button>

      <ApproverModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(approvers) => {
          setFormData((prev) => ({
            ...prev,
            level1: approvers.level1,
            level2: approvers.level2,
            finalLevel: approvers.finalLevel,
          }));
        }}
      />

      <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
        제출
      </button>
    </div>
  );
};

export default FormWriteNext;
