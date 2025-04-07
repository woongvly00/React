import React, {useRef} from "react";
import { useState, useEffect } from "react";
import style from './popup.module.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import EmployeePage from "../employees/EmployeePage";
import ChattingRoom from "../chattingroom/ChattingRoom";
import Chatting from "../chatting/Chatting";
import axios from 'axios';

function MessengerPopup({ onClose }) {
    const nodeRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    
    const params = new URLSearchParams(location.search);
    const initialChat = params.get("chat");
    const [currentChat, setCurrentChat] = useState(initialChat);
   

    const openChatWindow = (target,me,name) => {
      console.log(target +" : "+me);
      axios.get("http://10.5.5.2/Employee/checkRoomExist",{
        params:{
          targetname:target,
          myname:me
        }
      }).then((result)=>{
        console.log(result.data);
        const exist = result.data;

        if(exist===false){
         
        axios.post("http://10.5.5.2/Employee/madeChatRoom",{
          targetname:target,
          myname:me
        }).then((resp)=>{
          setCurrentChat(name);
          navigate(`/messenger/chatting?chat=${name}&from=${me}&to=${target}`);
      });
    }  else{
      setCurrentChat(name);
      navigate(`/messenger/chatting?chat=${name}&from=${me}&to=${target}`);
    }

     
}); 
  };



  useEffect(() => {
    if (initialChat) {
        setCurrentChat(initialChat);
    }
}, [initialChat]);

useEffect(() => {
    console.log("현재 경로:", location.pathname);
  if (location.pathname === "/messenger") {
      setCurrentChat(null);
  }
}, [location.pathname]);


const handleClose = () => {
  navigate("/messenger");
};

  return (
  
      <div ref={nodeRef} className={style.popupStyle} >
         {currentChat ? (<div className={style.headerStyle} >
          <span>💬 메신저</span>
          <div>
            <button className={style.controlButton} onClick={handleClose}>X</button>
          </div>
        </div>) : (  <div className={style.headerStyle} >
          <span>💬 메신저</span>
        </div>
        )}
         {currentChat ? (<Chatting userName={currentChat} />) : (
            <div className={style.contentStyle}>
                <div className={style.left}>
                  <button className={style.empbtn} onClick={()=> navigate("/messenger/employee")}>사원</button>
                  <button className={style.chatbtn} onClick={()=> navigate("/messenger/chattingroom")}>1:1</button>
                </div>
                <div className={style.right}>
                  <Routes>
                    <Route path="employee" element={<EmployeePage openChat={openChatWindow}/>}></Route>
                    <Route path="/" element={<EmployeePage openChat={openChatWindow}/>}></Route>
                    <Route path="chatting" element={<Chatting />}></Route>
                    <Route path="chattingroom" element={<ChattingRoom />}></Route>
                  </Routes>
                </div>
            </div>

          )} 
        

      </div>
      
  );
}



export default MessengerPopup;
