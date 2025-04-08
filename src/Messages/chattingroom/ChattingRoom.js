import style from './ChattingRoom.module.css';
import {useState,useEffect} from 'react';
import axios from 'axios';

function ChattingRoom({openChat}) {
    const [roomEmployees,setRoomEmployees] = useState([]);
    const [myId,setMyId] = useState(null);

    useEffect(() =>{
        const userId = sessionStorage.getItem("userId");
        
        console.log(userId);
        // userId로 내 사원id 가져오기
        // 본인 사원id 랑 채팅했던 채팅방 테이블 출력
        // 채팅방 메시지테이블 조인해서 값이 나오는지 유무
         axios.get("http://10.5.5.2/Employee/selectMyId",{
            params:{
                userId:userId
            }
         })
         .then((resp)=>{
            console.log("myid: " + resp.data)
            setMyId(resp.data);

            axios.get("http://10.5.5.2/Employee/selectRoom",{
                params:{
                    myId:resp.data
                }
            }).then((room)=>{
                console.log(room.data)
                setRoomEmployees(room.data);
              
            })


         })

    },[])
    


    return(
        <div className={style.main}>
            {roomEmployees.map((room,index)=>(
           
            <div key={index} className={style.another}>
                <div className={style.imgbox}>
                    <div className={style.anotherimg}>
                        {/* <img src=""></img> 프로필 이미지 넣는곳*/}
                    </div>
                </div>
                    <div className={style.namebox} onDoubleClick={()=>openChat(room.MSG_GROUP_NAME,myId,room.EMP_NAME)}>
                        <div className={style.anothername}>{room.EMP_NAME}</div>
                    </div>
            </div>
            ))}   

        </div>
    )



}

export default ChattingRoom;