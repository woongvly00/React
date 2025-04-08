import style from './ChattingRoom.module.css';
import {useState,useEffect} from 'react';
import axios from 'axios';

function ChattingRoom({openChat}) {
    const [roomEmployees,setRoomEmployees] = useState([]);
    const [myId,setMyId] = useState(null);

    useEffect(() =>{
        const userId = sessionStorage.getItem("userId");
    
         axios.get("http://10.5.5.2/Employee/selectMyId",{
            params:{
                userId:userId
            }
         })
         .then((resp)=>{
     
            setMyId(resp.data);

            axios.get("http://10.5.5.2/Employee/selectRoom",{
                params:{
                    myId:resp.data
                }
            }).then((room)=>{
              
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
                    <div className={style.namebox} onDoubleClick={()=>openChat(room.EMP_CODE_ID,myId,room.EMP_NAME)}>
                        <div className={style.anothername}>{room.EMP_NAME}</div>
                    </div>
            </div>
            ))}   

        </div>
    )



}

export default ChattingRoom;