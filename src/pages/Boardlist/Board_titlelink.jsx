import bstyle from './Board_titlelink.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Board_titellink = () => {
    const { boardId } = useParams();
    const navigate = useNavigate();
    const [boardData, setBoardData] = useState({});
    const [message, setMessage] = useState({ board_title: "", board_content: "" });
    const [editMode, setEditMode] = useState(false);
    const [delid,setDelid] = useState([]);

    useEffect(() => {
        axios.get(`http://10.5.5.12/board/${boardId}`)
            .then(res => {
                setBoardData(res.data);
                setMessage({
                    title: res.data.board_title,
                    content: res.data.board_content,
                });
            });

    }, [boardId]);


    const handletitlelinkUpdateChange = function (e) {
        const { name, value } = e.target;
        setMessage((prev) => ({ ...prev, [name]: value }));
    };


    const handletitlelinkUpdate = () => {
        axios.put(`http://10.5.5.12/board/update`, {
            board_id: parseInt(boardId),
            board_title: message.board_title,
            board_content: message.board_content
        }).then(res => {
            setBoardData(prev => ({
                ...prev,
                board_title: message.board_title,
                board_content: message.board_content
            }));
            alert("수정 완료!");
            setEditMode(false);
        })
    };

    const handleDelete = () => {
        axios.delete(`http://10.5.5.12/board/delete/${boardId}`)
            .then(() => {
                alert("삭제 완료!");
                navigate('/mainpage'); 
            })
            .catch((error) => {
                console.error("삭제 오류:", error);
                alert("삭제 실패");
            });
    };


    return (
        <div className={bstyle.gasyclick}>

            <div className={bstyle.standardwrite10}>글쓰기</div>


            <div className={bstyle.titlewrite}>
                <div className={bstyle.title2}>작성자</div>
                <div className={bstyle.text2}>{boardData.board_name}
                </div>
            </div>

            <div className={bstyle.titlewrite}>
                <div className={bstyle.title2}>제목</div>
                {editMode && (<input type="text" className={bstyle.text2} placeholder="수정할 제목을 입력하세요." name="board_title" onChange={handletitlelinkUpdateChange} value={message.board_title}></input>
                )}
                {!editMode && (
                    <div className={bstyle.text2}>{boardData.board_title}</div>
                )}
                {/* <div className={bstyle.text2}></div> */}

            </div>
            <div className={bstyle.file}>
                <div className={bstyle.text2}>📥 파일다운로드</div>
            </div>
            <div className={bstyle.contentwrite}>
                <div className={bstyle.text2}>
                {editMode && (<input type="text" className={bstyle.text2} placeholder="수정할 내용을 입력하세요." name="board_content" onChange={handletitlelinkUpdateChange} value={message.board_content}></input>
                )}
                {!editMode && (
                    <div className={bstyle.text2}>{boardData.board_content}</div>
                )}
                </div>
            </div>
            <div className={bstyle.good2}>
                <button className={bstyle.thumbsbutton}>
                    <div className={bstyle.finger}>👍</div>
                    <div className={bstyle.plus}>+n</div>
                </button>
            </div>
            <div className={bstyle.buttoncontainer}>
                <div className={bstyle.list3}><button onClick={() => navigate(-1)}>목록으로</button></div>
                <div className={bstyle.rightbuttons}>
                    <div className={bstyle.list4}>
                        {!editMode && <button onClick={() => setEditMode(true)}>수정</button>}
                        {editMode && <button onClick={handletitlelinkUpdate}>저장</button>}
                    </div>
                    <div className={bstyle.list5}><button onClick={handleDelete}>삭제</button></div>
                </div>
            </div>


            {/* 댓글 */}
            < div className={bstyle.comment2} >
                <div className={bstyle.comment3}>댓글</div>
                <div className={bstyle.commentwrite}>
                    <div className={bstyle.profile}>프로필 사진</div>
                    <div className={bstyle.userwrite}>
                        <div className={bstyle.nametime}>
                            <div className={bstyle.name3}>이름</div>
                            <div className={bstyle.writetime3}>작성시간</div>
                        </div>
                        <div className={bstyle.content4}>댓글내용</div>
                    </div>
                </div>
                <div className={bstyle.commentwrite2}>
                    <textarea placeholder="내용을 입력하세요"></textarea>
                    <button className={bstyle.okbutton}>확인</button>
                </div>
            </div >
        </div>
    );


}

export default Board_titellink;



