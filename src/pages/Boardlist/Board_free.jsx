import './Board_free.css';
import React from 'react';

const Board_free = () => {
    return (

        <div className="SBoardContainer">

        <div className="subcontainer">

            <h2>📄 게시판</h2>
            <div className="approval-grid">
            <div className="navi">
                <div>자유 게시판</div>

            </div>
            <div className="navibelow">
                <div className="navibelowleft"><input type="text" placeholder="🔍게시글 입력"></input></div>
                <div className="navibelowright">
                    <select>
                        <option value="option1">최신순</option>
                        <option value="option2">조회순</option>
                        <option value="option3">추천순</option>
                    </select>
                </div>
            </div>
            <hr></hr>
            <div className="freelist">

                <div className="photo">

                    사진
                </div>
                <div className="write">
                    <div className="title">제목</div>
                    <div className="content">내용</div>
                    <div className="writeElse">
                        <div className="writer">작성자</div>
                        <div className="good">추천수</div>
                        <div className="look">조회수</div>
                        <div className="writeTime">현재 시간</div>
                    </div>
                </div>

            </div>
            </div>
        </div>
    </div>
    );
}
export default Board_free;