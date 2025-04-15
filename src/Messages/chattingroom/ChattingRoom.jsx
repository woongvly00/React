import style from './ChattingRoom.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';



function ChattingRoom({ openChat }) {
    const [roomEmployees, setRoomEmployees] = useState([]);
    const [myId, setMyId] = useState(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, roomId: null });


    const ChatRooms = (userId) => {
        axios.get("http://10.5.5.2/Employee/selectMyId", {
            params: {
                userId: userId
            }
        })
            .then((resp) => {
                const myId = resp.data;
                setMyId(resp.data);

                axios.get("http://10.5.5.2/Employee/selectRoom", {
                    params: {
                        myId: myId
                    }
                }).then((room) => {
                    const sortedRooms = room.data.sort((a, b) =>
                        new Date(b.LAST_SEND_DATE) - new Date(a.LAST_SEND_DATE)
                    );
                    setRoomEmployees(sortedRooms);

                })


            })
    }

    const handleDelete = () => {

        axios.delete("http://10.5.5.2/Employee/deleteRoom",{
            params:{
                msgGroupId:contextMenu.roomId
            }
        }).then()


        setRoomEmployees(prev =>
            prev.filter(room => room.MSG_GROUP_ID !== contextMenu.roomId)
        );
        setContextMenu({ visible: false, x: 0, y: 0, roomId: null });
    };

    const handleContextMenu = (e, roomId) => {
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            roomId: roomId,
        });
    };

    useEffect(() => {
        const handleClick = () => setContextMenu({ visible: false, x: 0, y: 0, roomId: null });
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);


    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        ChatRooms(userId);
    }, [])

    useEffect(() => {
       console.log("room은: ",roomEmployees);

    }, [roomEmployees])


    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        const interval = setInterval(() => {
            ChatRooms(userId);
        }, 2500);

        return () => clearInterval(interval);
    }, [])




    return (
        <div className={style.main}>

                {roomEmployees.map((room, index) => (
                        <div key={index} className={style.another} onContextMenu={(e)=>handleContextMenu(e,room.MSG_GROUP_ID)}>
                            <div className={style.imgbox}>
                                <div className={style.anotherimg}>
                                    {/* <img src=""></img> 프로필 이미지 넣는곳*/}
                                </div>
                            </div>
                            <div className={style.namebox} onDoubleClick={() => openChat(room.EMP_CODE_ID, myId, room.EMP_NAME)}>
                                <div className={style.anothername}>{room.EMP_NAME}</div>
                                <div className={style.lastmsg}>{room.LAST_MSG}</div>
                                <div className={style.lasttime}>{new Date(room.LAST_SEND_DATE).toLocaleTimeString("ko-KR", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                })}
                                </div>
                            </div>
                        </div>

                ))}

                {contextMenu.visible && (
                <ul
                    className={style.contextMenu}
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <li onClick={handleDelete}>삭제</li>
                </ul>
            )}

        </div>
    )



}

export default ChattingRoom;