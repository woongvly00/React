import React from 'react';
import sideliststyle from './Sidelist.module.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Sidelist = () => {
  const location = useLocation();
  const name = location.state?.name;


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
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <strong>내 캘린더</strong>
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <strong>공유 캘린더</strong>
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  
                </div>
              </div>
            </div>
          </div>
          <div>
            커스텀뷰 넣기
          </div>
          <div>
            내 캘린더
            <ul>
              <li>개인 일정</li>
            </ul>
          </div>
          <div>
            공유 캘린더
            <ul>
              <li>프로젝트1 일정</li>
              <li>회사 단체 일정</li>
            </ul>
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


