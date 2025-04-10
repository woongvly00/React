import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ApprovalDetail = () => {
  const { id } = useParams(); // URL에서 :id 가져옴
  const [edms, setEdms] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    console.log("✅ ApprovalDetail mounted with id:", id);

    const fetchDetail = async () => {
      try {
        const userRes = await axios.get("http://10.10.55.22/api/employee/code");
        console.log("👤 현재 로그인한 사용자 ID:", userRes.data);
        setCurrentUserId(userRes.data);

        const res = await axios.get(`http://10.10.55.22/api/edms/${id}`);
        console.log("📄 EDMS 데이터:", res.data);
        setEdms(res.data);
      } catch (err) {
        console.error("❌ 결재 상세 불러오기 실패:", err);
      }
    };

    fetchDetail();
  }, [id]);

  if (!edms) {
    return (
      <div style={{ padding: "2rem", color: "gray" }}>
        <h2>불러오는 중입니다...</h2>
      </div>
    );
  }

  const canApprove =
    [edms.level1, edms.level2, edms.level3, edms.level4, edms.finalLevel].includes(currentUserId) &&
    edms.stateCode === 1;

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ marginBottom: "1rem" }}>📋 문서 상세 정보</h2>
      <p><strong>문서 ID:</strong> {id}</p>
      <p><strong>제목:</strong> {edms.edmsTitle}</p>
      <p><strong>작성자:</strong> {edms.drafterName || "알 수 없음"}</p>
      <p><strong>상태:</strong> {
        edms.stateCode === 1 ? "대기" :
        edms.stateCode === 2 ? "진행 중" :
        edms.stateCode === 3 ? "반려" :
        edms.stateCode === 4 ? "승인" : "알 수 없음"
      }</p>
      <p><strong>작성일:</strong> {new Date(edms.submitDate).toLocaleString()}</p>
      <hr style={{ margin: "2rem 0" }} />
      <div dangerouslySetInnerHTML={{ __html: edms.edmsContent }} />

      {canApprove && (
        <div style={{ marginTop: "2rem" }}>
          <button style={{ marginRight: "1rem" }} onClick={() => console.log("🔓 결재 버튼 클릭됨")}>결재</button>
          <button onClick={() => console.log("❌ 반려 버튼 클릭됨")}>반려</button>
        </div>
      )}
    </div>
  );
};

export default ApprovalDetail;
