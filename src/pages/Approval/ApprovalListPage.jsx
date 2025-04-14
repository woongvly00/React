import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import daxios from "../../axios/axiosConfig";

const endpointMap = {
  "pending": "waiting",
  "requested": "mydrafts",
  "complete": "completed",
  "rejected": "rejected",
  "department/referenced": "department/ref",
  "department/created": "department/created",
};

const ApprovalListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);

  const fetchList = async () => {
    const path = location.pathname.replace("/mainpage/maincontent/approval/", "");
    const apiSuffix = endpointMap[path];

    if (!apiSuffix) {
      console.warn("❌ 알 수 없는 경로로 요청됨:", path);
      return;
    }

    console.log(`📡 API 요청 시작: ${path} → /api/edms/${apiSuffix}`);

    try {
      const res = await daxios.get(`http://10.10.55.22/api/edms/${apiSuffix}`);
      setDocs(res.data);
      console.log(`✅ API 성공: ${res.data.length}건 수신`);
    } catch (err) {
      console.error(`❌ API 요청 실패 (${apiSuffix})`, err);
    }
  };

  useEffect(() => {
    fetchList();
  }, [location.pathname]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📄 문서 목록</h2>
      {docs.length === 0 ? (
        <p>문서가 없습니다.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>제목</th>
              <th>기안자</th>
              <th>문서 유형</th>
              <th>결재 상태</th>
              <th>기안일</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.edmsId} onClick={() => navigate(`/mainpage/maincontent/approval/detail/${doc.edmsId}`)} style={{ cursor: "pointer" }}>
                <td>{doc.edmsTitle}</td>
                <td>{doc.drafterName || "-"}</td>
                <td>{doc.formName || "-"}</td>
                <td>
                  {{
                    1: "대기",
                    2: "진행 중",
                    3: "반려",
                    4: "완료",
                  }[doc.stateCode] || "알 수 없음"}
                </td>
                <td>{new Date(doc.submitDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovalListPage;
