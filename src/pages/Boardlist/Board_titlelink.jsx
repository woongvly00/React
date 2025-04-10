import bstyle from './Board_titlelink.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Board_titellink = () => {
 
    const { boardId } = useParams();
    const navigate = useNavigate();

    const [boardData, setBoardData] = useState({});
    const [message, setMessage] = useState({ post_title: "" });
    const [editMode, setEditMode] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // 댓글 관련 상태
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingReplyId, setEditingReplyId] = useState(null);
    const [editedContent, setEditedContent] = useState("");

    // 게시글 조회
    useEffect(() => {
        axios.get(`http://10.5.5.12/board/${boardId}`)
            .then(res => {
                setBoardData(res.data);
                setMessage({ post_title: res.data.post_title });

                const blocksFromHtml = htmlToDraft(res.data.post_content || "");
                const contentState = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks);
                const state = EditorState.createWithContent(contentState);
                setEditorState(state);
            });
    }, [boardId]);

    // 댓글 조회
    useEffect(() => {
        axios.get(`http://10.5.5.12/reply`,{
            params: { board_id: boardId }
        })
            .then(res => {
                setReplies(res.data);
            })
            .catch(err => {
                console.error("댓글 조회 실패:", err);
            });
    }, [boardId]);

    // 제목 수정 핸들링
    const handletitlelinkUpdateChange = (e) => {
        const { name, value } = e.target;
        setMessage((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (newState) => {
        setEditorState(newState);
    };

    const handletitlelinkUpdate = () => {
        const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        axios.put(`http://10.5.5.12/board/update`, {
            post_id: parseInt(boardId),
            post_title: message.post_title,
            post_content: htmlContent
        }).then(() => {
            alert("수정 완료!");
            setBoardData(prev => ({
                ...prev,
                post_title: message.post_title,
                post_content: htmlContent
            }));
            setEditMode(false);
        });
    };

    const handleDelete = () => {
        axios.delete(`http://10.5.5.12/board/${boardId}`)
            .then(() => {
                alert("삭제 완료!");
                navigate(-1);
            })
            .catch((error) => {
                console.error("삭제 오류:", error);
                alert("삭제 실패");
            });
    };

    // 댓글 작성
    const handleNewReplyChange = (e) => {
        setNewReply(e.target.value);
    };

    const handleNewReplySubmit = () => {
        if (!newReply.trim()) {
            alert("댓글 내용을 입력하세요.");
            return;
        }

        axios.post(`http://10.5.5.12/reply/insert`, {
            board_id: parseInt(boardId),
            reply_coontent: newReply,
            reply_writer: "잇츠미"
        }).then(() => {
            axios.get(`http://10.5.5.12/reply`,{
                params: { board_id: boardId }
            })
            .then(res => {
                setReplies(res.data); // 전체 목록 갱신
            });
    
        setNewReply("");
        });
    };

    // 댓글 수정
    const handleEdit = (reply) => {
        setIsEditing(true);
        setEditingReplyId(reply.reply_id);
        setEditedContent(reply.reply_coontent);
    };

    const handleUpdate = () => {
        axios.put(`http://10.5.5.12/reply/update`, {
            reply_id: editingReplyId,
            reply_coontent: editedContent,
             reply_writer: "잇츠미"
        }).then(() => {
            setReplies(prev =>
                prev.map(reply =>
                    reply.reply_id === editingReplyId
                        ? { ...reply, reply_coontent: editedContent }
                        : reply
                )
            );
            setIsEditing(false);
            setEditingReplyId(null);
            setEditedContent("");
        });
    };

    // 댓글 삭제
    const handleReplyDelete = (replyId) => {
        if (window.confirm("댓글을 삭제할까요?")) {
          axios.delete(`http://10.5.5.12/reply/${replyId}`)
            .then(() => {
              setReplies(prev => prev.filter(reply => reply.reply_id !== replyId));
            })
            .catch(err => {
              console.error("댓글 삭제 실패:", err);
              alert("삭제 중 오류가 발생했습니다.");
            });
        }
      };

    return (
        <div className={bstyle.gasyclick}>
            <div className={bstyle.standardwrite10}>글쓰기</div>

            <div className={bstyle.titlewrite}>
                <div className={bstyle.title2}>작성자</div>
                <div className={bstyle.text2}>{boardData.post_writer}</div>
            </div>

            <div className={bstyle.titlewrite}>
                <div className={bstyle.title2}>제목</div>
                {editMode ? (
                    <input
                        type="text"
                        className={bstyle.text2}
                        name="post_title"
                        onChange={handletitlelinkUpdateChange}
                        value={message.post_title}
                    />
                ) : (
                    <div className={bstyle.text2}>{boardData.post_title}</div>
                )}
            </div>

            <div className={bstyle.file}>
                <div className={bstyle.text2}>📥 파일다운로드</div>
            </div>

            <div className={bstyle.contentwrite}>
                {editMode ? (
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                    />
                ) : (
                    <div
                        className={bstyle.text2}
                        dangerouslySetInnerHTML={{ __html: boardData.post_content }}
                    />
                )}
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

            {/* 댓글 출력 */}
            {Array.isArray(replies) && replies.map((reply) => (
                <div key={reply.reply_id} className={bstyle.commentwrite}>
                    <div className={bstyle.profile}>프로필 사진</div>
                    <div className={bstyle.userwrite}>
                        <div className={bstyle.nametime}>
                            <div className={bstyle.name3}>{reply.reply_writer}</div>
                            <div className={bstyle.writetime3}>{reply.reply_date}</div>
                            <div className={bstyle.actionButtons}>
                                <button onClick={() => handleEdit(reply)} className={bstyle.editBtn}>수정</button>
                                <button onClick={() => handleReplyDelete(reply.reply_id)} className={bstyle.deleteBtn}>삭제</button>
                            </div>
                        </div>

                        {isEditing && editingReplyId === reply.reply_id ? (
                            <div className={bstyle.commentEditBox}>
                                <textarea
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    className={bstyle.textarea}
                                />
                                <button className={bstyle.saveBtn} onClick={handleUpdate}>저장</button>
                                <button onClick={() => setIsEditing(false)} className={bstyle.cancelBtn}>취소</button>
                            </div>
                        ) : (
                            <div className={bstyle.content4}>{reply.reply_coontent}</div>
                        )}
                    </div>
                </div>
            ))}

            {/* 댓글 작성 */}
            <div className={bstyle.commentwrite2}>
                <textarea
                    placeholder="내용을 입력하세요"
                    value={newReply}
                    onChange={handleNewReplyChange}
                />
                <button className={bstyle.okbutton} onClick={handleNewReplySubmit}>확인</button>
            </div>
        </div>
    );
};

export default Board_titellink;