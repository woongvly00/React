import bstyle from './Board_free.module.css';
import React from 'react';

const Board_free = () => {
    return (

        <div className={bstyle.SBoardContainer}>

        <div className={bstyle.subcontainer}>

            <h2>📄 게시판</h2>
            <div className={bstyle.approval}>
            <div className={bstyle.navi}>
                <div>자유 게시판</div>

            </div>
            <div className={bstyle.navibelow}>
                <div className={bstyle.navibelowleft}><input type="text" placeholder="🔍게시글 입력"></input></div>
                <div className={bstyle.navibelowright}>
                    <select>
                        <option value="option1">최신순</option>
                        <option value="option2">조회순</option>
                        <option value="option3">추천순</option>
                    </select>
                </div>
            </div>
            <hr></hr>
            <div className={bstyle.freelist}>

                <div className={bstyle.photo}>

                    사진
                </div>
                <div className={bstyle.write}>
                    <div className={bstyle.title}>제목</div>
                    <div className={bstyle.content}>내용</div>
                    <div className={bstyle.writeElse}>
                        <div className={bstyle.writer}>작성자</div>
                        <div className={bstyle.good}>추천수</div>
                        <div className={bstyle.look}>조회수</div>
                        <div className={bstyle.writeTime}>현재 시간</div>
                    </div>
                </div>

            </div>
            </div>
        </div>
    </div>
    );
}
export default Board_free;