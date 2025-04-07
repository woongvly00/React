import React, { useState } from 'react';
import sideliststyle from './Sidelist.module.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AddCategory from '../pages/Schedule/AddCategory';

const Sidelist = () => {
  const location = useLocation();
  const name = location.state?.name;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);


  const handleModalOpen = (selectInfo) => {
    setSelectedInfo(selectInfo);
    setIsModalOpen(true);
  };

  const renderContent = () => {
    switch (name) {

      // 게시판 list
      case 'board':
        return (
            <div className={sideliststyle.sideList}>
            <aside className={sideliststyle.sidebar}>
              
              
        <div><Link to="/mainpage/maincontent/write_button" state={{ name: "board" }}><button className={sideliststyle.button}>글쓰기</button></Link></div>

        <div className={sideliststyle.boardsidebar}>
          <div className={sideliststyle.wholegasy}>게시판 전체보기</div>
          <div><Link to="/mainpage/maincontent/standard" state={{ name: "board" }}>공지사항</Link></div>
          <div><Link to="/mainpage/maincontent/listmanager" state={{ name: "board" }}>게시판 관리</Link></div>
          <div><Link to="/mainpage/maincontent/reference" state={{ name: "board" }}>자료실</Link></div>
          <div>전사 게시판
            <li><Link to="/mainpage/maincontent/free" state={{ name: "board" }}>자유게시판</Link></li>
            <li><Link to="/mainpage/maincontent/club" state={{ name: "board" }}>동아리게시판</Link></li>
          </div>
          <div>그룹 게시판
            <li><Link to="/mainpage/maincontent/department" state={{ name: "board" }}>부서 게시판</Link></li>
            <li><Link to="/mainpage/maincontent/business" state={{ name: "board" }}>거래처별 변경사항</Link></li>
            <li><Link to="/mainpage/maincontent/support" state={{ name: "board" }}>업체교육/업무지원보고서</Link></li>
          </div>
    
    
            </div>
            </aside>
        </div>
        );


      // 전자결제 list
      case 'approval':
        return <div className={sideliststyle.sideList}>
                전자결제
               </div>;



       // 인사관리 list
       case 'hr':
        return <div className={sideliststyle.sideList}>
                인사관리
              </div>;  


      // 일정 list
      case 'schedule':
        return <div className={sideliststyle.sideList}>
          <div>
            커스텀뷰 넣기
          </div>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                내 캘린더
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                <input type="checkbox" style={{ accentColor: 'blue', marginRight: '8px' }}/><span>개인일정</span>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <strong>공유 캘린더</strong>
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                <ul>
                  <li>프로젝트1 일정</li>
                  <li>회사 단체 일정</li>
                </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button onClick={handleModalOpen}>캘린더 추가</button>
            <div>
              {isModalOpen && (<AddCategory closeModal={() => setIsModalOpen(false)} selectedInfo={selectedInfo}/>)}
            </div>
          </div>
        </div>;



      // 예약 list
      case 'reserve':
        return <div className={sideliststyle.sideList}>
                <ur>
                  <li>나의 예약 목록</li>
                  <li>회의실</li>
                  <li>차량</li>
                  <li>비품</li>
                </ur>
              </div>;
      

      // 디폴트값
      default:
        return <div className={sideliststyle.sideList}></div>;
    }
  };

  return <div>{renderContent()}</div>;

   
  };
  
  export default Sidelist;


