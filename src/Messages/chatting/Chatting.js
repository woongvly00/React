import style from '../chatting/Chatting.module.css';
import {useState, useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import stompClient from "../../Components/websocket/websocket";

function Chatting() {

    const [message, setMessage] = useState(""); //채팅한 메시지
    const [messages, setMessages] = useState([]); //메시지 저장
    const [groupId,setGroupId] = useState(1);
    const [empId,setEmpId] = useState(1);
    
    const contentRef = useRef(null);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const targetName = params.get("chat");//대화상대
    const targetId = params.get("to"); //대화상대 id
    const myId = params.get("from"); //내 id
    
   

    useEffect(() => {
        stompClient.onConnect = () => {
          console.log("WebSocket 연결 성공");
    
          stompClient.subscribe("/topic/messages", (msg) => {
            const receivedMessage = JSON.parse(msg.body);
            setMessages((prev) => [...prev, receivedMessage]);
          });
        };
    
        stompClient.activate(); // WebSocket 연결
    
        return () => {
          stompClient.deactivate(); // 컴포넌트가 사라질 때 연결 해제
        };
      }, []);

      const sendMessage = () => {
        if (message.trim() !== "") {
            console.log("상대iD: "+targetId +" : " + "내ID: "+myId) //이아이디 들로 채팅방이랑 메시지 테이블 연결해서 채팅 ㄱㄱ
            const msgData={
                msgContent:message
            }


          stompClient.publish({
            destination: "/app/send",
            body: JSON.stringify(msgData),
          });
          setMessage(""); // 입력 필드 초기화
        }
      };



    // const sendMessage = () => {
    //     if (message.trim() === "") return; // 빈 메시지 전송 방지
    //     console.log("전송된 메시지:", message); // 메시지 전송 로직 (여기서 서버로 보내면 됨)
    //     setMessages([...messages,{ text:message, isMine: true}]);
    //     setMessage(""); // 입력창 비우기
    // };

    //엔터누르면 전송
    const handleKeyDown = (e) => {
        if(e.key === "Enter" && !e.shiftKey ) {
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

    return(
        <div className={style.main}>
            <div className={style.head}>{targetName ? `${targetName}님과의 채팅` : "채팅방"}</div>
            <div className={style.content} ref={contentRef}>
                {messages.map((msg,index)=>(
                    <div 
                    key={index} 
                    className={msg.isMine ? style.myMessageWrapper : ""}
                >
                    <div className={msg.isMine ? style.myMessage : style.otherMessage}>
                        {msg.text}
                    </div>
                </div>
                ))}
            </div>
            <div className={style.message}>
                <textarea placeholder='메시지 입력' value={message} onChange={(e)=> setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}></textarea>
            </div>
            <div className={style.service}>
                <button className={style.send} onClick={sendMessage}>전송</button>
            </div>
        </div>
    )
    

}

export default Chatting; 