import bstyle from './Board_write_button.module.css';
import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useState } from 'react';

const Board_write_button = () => {
    
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    return (
        <div className={bstyle.SBoardContainer}>

            <div className={bstyle.subcontainer}>



                <div>📄 게시판</div>
                <div className={bstyle.approval}>
                    <div className={bstyle.container2}>
                        <div className={bstyle.standardwrite10}>글쓰기</div>
                        <div className={bstyle.signcancel}>
                            <button>등록</button>
                            <button>취소</button>
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
                                    <option value="option6">신규 아이디어 상품건의</option>
                                </select>
                            </div>
                        </div>
                        <div className={bstyle.titlewrite}>
                            <div className={bstyle.title2}>제목</div>
                            <div className={bstyle.text2}><input type="text" placeholder="제목을 입력하세요"></input></div>
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
    );
};
export default Board_write_button;