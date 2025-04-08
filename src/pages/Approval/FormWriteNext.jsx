import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function FormWriteNext() {
  const { state } = useLocation(); // 💡 ApprovalWrite에서 받은 값
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    formId: '',
    edmsCId: '',
    comId: '',
    stateCode: 1,
    edmsTitle: '',
    edmsContent: '',
    refDept: '',
    rejectReason: '',
    level1: 2,
    level2: 3,
    level3: null,
    level4: null,
    finalLevel: 2,
  });

  useEffect(() => {
    if (state) {
      setFormData((prev) => ({
        ...prev,
        formId: state.formId,
        edmsCId: state.edmsCId,
        comId: state.comId,
        stateCode: state.stateCode || 1,
        refDept: state.refDept || 'D001',
        level1: state.level1 ?? 2,
        level2: state.level2 ?? 3,
        finalLevel: state.finalLevel ?? 2,
      }));
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/edms/register', formData);
      alert('✅ 제출 성공');
      navigate('/mainpage'); // or any redirect
    } catch (error) {
      console.error('❌ 제출 실패', error);
      alert('❌ 제출 실패: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
      <h2>전자결재 작성</h2>

      <label>제목:</label>
      <input type="text" name="edmsTitle" value={formData.edmsTitle} onChange={handleChange} required />

      <label>내용:</label>
      <textarea name="edmsContent" value={formData.edmsContent} onChange={handleChange} required />

      <label>부서코드:</label>
      <input type="text" name="refDept" value={formData.refDept} onChange={handleChange} />

      {/* Optional fields */}
      <label>반려 사유:</label>
      <input type="text" name="rejectReason" value={formData.rejectReason} onChange={handleChange} />

      <label>결재선 1:</label>
      <input type="number" name="level1" value={formData.level1 || ''} onChange={handleChange} />

      <label>결재선 2:</label>
      <input type="number" name="level2" value={formData.level2 || ''} onChange={handleChange} />

      <label>최종 승인자:</label>
      <input type="number" name="finalLevel" value={formData.finalLevel || ''} onChange={handleChange} />

      <button type="submit" style={{ marginTop: '1rem' }}>제출</button>
    </form>
  );
}

export default FormWriteNext;
