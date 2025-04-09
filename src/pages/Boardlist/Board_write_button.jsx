import bstyle from './Board_write_button.module.css';
import React, { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';


const Board_write_button = () => {
    const navigate = useNavigate();
  
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
    const [message, setMessage] = useState({
      post_title: '',
      post_content: '',
      post_writer: '',
    });
  
    const handleBoardwrite = async () => {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const htmlContent = draftToHtml(rawContentState); // 에디터 내용을 HTML로 변환
  
      const finalMessage = {
        ...message,
        post_content: htmlContent,
      };
  
      try {
        const response = await axios.post('http://10.5.5.12/board/insert', finalMessage);
        if (response.status === 200) {
          alert('게시글이 성공적으로 등록되었습니다!');
          navigate(-1);
        }
      } catch (error) {
        console.error('등록 중 오류 발생:', error);
        alert('게시글 등록 실패');
      }
    };
  
    const handleInput = (e) => {
      const { name, value } = e.target;
      setMessage((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  

    return (
        <div className={bstyle.SBoardContainer}>

            <div className={bstyle.subcontainer}>



                <div>📄 게시판</div>
                <div className={bstyle.approval}>
                    <div className={bstyle.container2}>
                        <div className={bstyle.standardwrite10}>글쓰기</div>
                        <div className={bstyle.signcancel}>
                            <button onClick={handleBoardwrite}>등록</button>
                            <button onClick={() => navigate(-1)}>취소</button>
                        </div>
                        <div className={bstyle.gasyselect}>
                            <div className={bstyle.gasywrite}>게시판</div>
                            <div className={bstyle.selects}>
                                <select>
                                    <option value="option1">자유 게시판</option>
                                    <option value="option2">동아리 게시판</option>
                                    <option value="option3">부서 게시판</option>
                                    <option value="option4">거래처별 변경사항</option>
                                    <option value="option5">업체교육/업무지원 보고서</option>
                                    <option value="option 6">신규 아이디어 상품건의</option>
                                </select>
                            </div>
                        </div>
                        <div className={bstyle.titlewrite}>
                            <div className={bstyle.title2}>작성자</div>
                            <div className={bstyle.text2}>
                            <input type="text" name="board_name" placeholder="이름을 입력하세요" onChange={handleInput} value={message.post_writer}></input></div>
                            <div className={bstyle.title2}>제목</div>
                            <div className={bstyle.text2}>
                                <input type="text" name="board_title" placeholder="제목을 입력하세요" onChange={handleInput} value={message.post_title}></input></div>
                            <div className={bstyle.checkbox2}>
                                <label>
                                    <input type="checkbox" />
                                    공지로 등록
                                </label>
                            </div>
                        </div>
                        <div className={bstyle.file}>
                            <input type="file"></input>
                        </div>
                        <div className={bstyle.editorWrapper}>
         
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                toolbar={{
                                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history'],
                                    inline: { inDropdown: false, options: ['bold', 'italic', 'underline', 'strikethrough'] },
                                    fontSize: {
                                        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                                    },
                                    fontFamily: {
                                        options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                                    },
                                }}
                            />

                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};
export default Board_write_button;