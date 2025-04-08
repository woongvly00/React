
import React, { useState } from 'react';
import caxios from '../../Utils/caxios';
import addCategoryStyle from './AddCategoryStyle.module.css';


const AddCategory = ({ closeModal }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

  const [calender, setCalender] = useState({
    s_c_id: 0,
    s_c_name: '',
    color: '#FFFFFF'
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCalender((prev) => ({ ...prev, [name]: value }));
  };


  const handleAddCalender = () => {
    console.log(calender);

    caxios.post("/cSchedule", calender).catch((error) => {
        if (error.response?.status === 404 || 500) {
          alert("등록에 실패했습니다.");
    }})

    setIsModalOpen(false);
    setCalender({s_c_name:"", color:"#FFFFFF"})

    };


    return (
        <div className={addCategoryStyle['modal-overlay']}>
          <div className={addCategoryStyle['modal-container']}>
            <select name="s_c_id" value={calender.s_c_id} onChange={handleInput}>
               <option key="myCal" value="20">내 캘린더</option>
               <option key="shareCal" value="21">공유 캘린더</option>
            </select>

            <div>
              캘린더 이름
              <input name="s_c_name" type="text" value={calender.s_c_name} onChange={handleInput} />
            </div>
            <div>
             색깔 
             <input type="radio" name="color" value={calender.color} onChange={handleInput}/>
            </div>
            
            <div className={addCategoryStyle['modal-buttons']}>
              <button onClick={handleAddCalender}>저장</button>
              <button onClick={closeModal}>취소</button>
            </div>
          </div>
        </div>
      )

}

export default AddCategory;