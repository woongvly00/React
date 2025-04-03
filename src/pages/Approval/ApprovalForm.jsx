import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApprovalForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loaTitle: "",
    loaContent: "",
    firstApprover: "",
    interimApprover: "",
    finalApprover: "",
    referList: "",
    appEmergncyCall: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/approval/register", formData);
      alert("전자결재가 등록되었습니다.");
      navigate("/approval");
    } catch (error) {
      alert("등록 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="approval-form">
      <h2>전자결재 작성</h2>
      <form onSubmit={handleSubmit}>
        <label>제목</label>
        <input type="text" name="loaTitle" value={formData.loaTitle} onChange={handleChange} required />

        <label>상세내용</label>
        <textarea name="loaContent" value={formData.loaContent} onChange={handleChange} required />

        <label>결재자1 (1차)</label>
        <input type="text" name="firstApprover" value={formData.firstApprover} onChange={handleChange} required />

        <label>결재자2 (중간)</label>
        <input type="text" name="interimApprover" value={formData.interimApprover} onChange={handleChange} />

        <label>결재자3 (최종)</label>
        <input type="text" name="finalApprover" value={formData.finalApprover} onChange={handleChange} />

        <label>수신참조자</label>
        <input type="text" name="referList" value={formData.referList} onChange={handleChange} />

        <label>비상연락망</label>
        <input type="text" name="appEmergncyCall" value={formData.appEmergncyCall} onChange={handleChange} required />

        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
};

export default ApprovalForm;
