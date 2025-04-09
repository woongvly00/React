import msgstyle from '../chatting/Chatting.module.css';
import { useState, useEffect, useRef } from 'react';
import { replace, useLocation, useNavigate } from 'react-router-dom';
import stompClient from "../../Components/websocket/websocket";
import axios from 'axios';
import dayjs from 'dayjs';

function Chatting() {

    const [message, setMessage] = useState(""); //채팅한 메시지
    const [messages, setMessages] = useState([]); //메시지 저장

    const contentRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const targetName = params.get("chat");//대화상대
    const targetId = params.get("to"); //대화상대 id
    const myId = Number(params.get("from")); //내 id
    const seq = Number(params.get("seq")); //방 번호

    const showMessages = () => {
        axios.get("http://10.5.5.2/Employee/showMessages", {
            params: {
                seq: seq
            }
        }).then((resp) => {
       
            const fetchedMessages = resp.data.map(msg => ({
                ...msg,
                isMine: msg.msg_emp_id === myId
            }));
            setMessages(fetchedMessages);
        })
    }



    useEffect(() => {


        showMessages();


        stompClient.onConnect = () => {


            console.log("WebSocket 연결 성공");

            stompClient.subscribe(`/topic/messages/${seq}`, (msg) => {
                const receivedMessage = JSON.parse(msg.body);
                console.log(msg.body);
                const isMine = receivedMessage.msg_emp_id === myId;
                
                setMessages((prev) => [...prev, { ...receivedMessage, isMine }]);
            });
        };

        stompClient.activate(); // WebSocket 연결

        return () => {
            stompClient.deactivate(); // 컴포넌트가 사라질 때 연결 해제
        };
    }, [location.search]);

    const sendMessage = () => {
        if (message.trim() !== "") {
         

            const msgData = {
                msg_content: message,
                msg_group_id: seq,
                msg_emp_id: myId
            }


            stompClient.publish({
                destination: `/app/send/${seq}`,
                body: JSON.stringify(msgData),
            });
            setMessage(""); // 입력 필드 초기화
        }
    };




    //엔터누르면 전송
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    useEffect(() => {
        // 메시지가 추가될 때 스크롤을 아래로 이동
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={msgstyle.main}>
            <div className={msgstyle.head}>{targetName ? `${targetName}님과의 채팅` : "채팅방"}</div>
            <div className={msgstyle.content} ref={contentRef}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.isMine ? msgstyle.myMessageWrapper : ""}
                    >
                        <div className={msg.isMine ? msgstyle.myMessage : msgstyle.otherMessage}>
                            <div>{msg.msg_content}</div>
                            <div className={msgstyle.time}>{dayjs(msg.send_date).format("A hh:mm")}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={msgstyle.message}>
                <textarea placeholder='메시지 입력' value={message} onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}></textarea>
            </div>
            <div className={msgstyle.service}>
                <button className={msgstyle.send} onClick={sendMessage}>전송</button>
            </div>
        </div>
    )


}

export default Chatting; 