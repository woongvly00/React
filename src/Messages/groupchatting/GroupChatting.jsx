import style from './GroupChatting.module.css';
import {useState,useEffect,useRef} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";

function GroupChatting({openChat}) {
    const [roomEmployees,setRoomEmployees] = useState([]);
    const navigate = useNavigate();
    const myIdRef = useRef(null);
    

    useEffect(() =>{
        const userId = sessionStorage.getItem("userId");

    
         axios.get("http://10.5.5.2/Employee/selectMyId",{
            params:{
                userId:userId
            }
         })
         .then((resp)=>{
            
            myIdRef.current = resp.data;
            // sql에서 내아이디가 그룹멤버에 포함되어있고 멤버수가 3이상일때
            axios.get("http://10.5.5.2/Employee/selectGroupChat",{
                params:{
                    myId: myIdRef.current
                }
            }).then((grouproom)=>{
             
                const filtered = grouproom.data.map(room=>{
                    const members = room.group_member.split(",");
                    const filteredMembers = members.filter(id => id !== String(myIdRef.current));
                    
                    return axios.post("http://10.5.5.2/Employee/getNamesIds",{
                        ids:filteredMembers
                    }).then((namesResp)=>{
                        console.log(namesResp.data);
                        return {
                            ...room,
                            group_member_list: filteredMembers,
                            group_name: namesResp.data
                        };
                    })

                })
                Promise.all(filtered).then((results)=>{
                    setRoomEmployees(results);

                })
            })

         })

    },[])

    useEffect(()=>{
        console.log(roomEmployees);
    },[roomEmployees])

    const group = (selectedNames,myId,seq)=>{
        navigate(`/messenger/chatting?chat=${selectedNames}&from=${myId}&seq=${seq}`);
    }

    return(
        <div className={style.main}>
            {roomEmployees.map((room,index)=>(
           
            <div key={index} className={style.another} onDoubleClick={()=>group(room.group_name.join(", "),myIdRef.current,room.msg_group_id)}>
                <div className={style.imgbox}>
                    <div className={style.anotherimg}>
                        {/* <img src=""></img> 프로필 이미지 넣는곳*/}
                    </div>
                </div>
                    <div className={style.namebox} >
                        <div className={style.anothername}>{room.group_name.join(", ")}</div>
                    </div>
            </div>
            ))}   

        </div>
    )



}

export default GroupChatting;