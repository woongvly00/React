import style from './ChattingRoom.module.css';
import {useState} from 'react';


function ChattingRoom() {
    const [roomEmployees,setRoomEmployees] = useState([]);

    return(
        <div className={style.main}>
            <div className={style.another}>
                <div className={style.imgbox}>
                    <div className={style.anotherimg}>
                        {/* <img src=""></img> 프로필 이미지 넣는곳*/}
                    </div>
                </div>
                    <div className={style.namebox}>
                        <div className={style.anothername}>하정민{/*사원명*/}</div>
                    </div>
            </div>


        </div>
    )



}

export default ChattingRoom;