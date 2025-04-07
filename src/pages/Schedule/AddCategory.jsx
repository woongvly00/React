
import React, { useState } from 'react';
import AddCategoryStyle from './AddCategoryStyle.module.css';
import caxios from '../../Utils/caxios';


const AddCategory = ({ closeModal, selectedInfo }) => {

//   const [isModalOpen, setIsModalOpen] = useState(false);
  const [calender, setCalender] = useState({
    s_c_id: '',
    s_c_name: '',
    color: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCalender((prev) => ({ ...prev, [name]: value }));
  };


  const handleAddCalender = () => {
    caxios.post("/schedule", calender).catch((error) => {
        if (error.response?.status === 404 || 500) {
          alert("등록에 실패했습니다.");
        }
  });


    return (
        <div className={AddCategoryStyle['modal-overlay']}>
          <div className={AddCategoryStyle['modal-container']}>
            <select name="s_c_id" value={calender.s_c_id} onChange={handleInput}>
               <option value="20">내 캘린더</option>
               <option value="21">공유 캘린더</option>
            </select>

            <div>
              캘린더 이름
              <input name="s_c_name" type="text" value={calender.s_c_name} onChange={handleInput} />
            </div>
            <div>
             색깔 
             <input type="color" name="color" value={calender.color} onChange={handleInput}/>
            </div>
            
            <div className={AddCategoryStyle['modal-buttons']}>
              <button onClick={handleAddCalender}>저장</button>
              <button onClick={closeModal}>취소</button>
            </div>
          </div>
        </div>
      )
}
}

export default AddCategory;