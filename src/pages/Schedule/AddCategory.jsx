
import React, { useState, useEffect } from 'react';
import caxios from '../../Utils/caxios';
import addCategoryStyle from './AddCategoryStyle.module.css';



const AddCategory = ({ closeModal }) => {


  const [myInfo,setMyInfo] = useState(null);
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    console.log(userId);
    let mine = null;

      caxios.get("/Employee/SelectMine",{
        params: {userId: userId}
      }).then((userIdResp)=>{
        mine = userIdResp.data;
        setMyInfo(mine);
        console.log(mine.emp_code_id);
        

        if (!mine || !mine.emp_code_id) {
            console.error("내 정보가 잘못되었습니다:", mine);
            return;
          }
        console.log(mine.emp_dept_id);
         setCalender((prev) => ({...prev, dept_code : mine.emp_dept_id}));
          
      });

   
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [calender, setCalender] = useState({
    c_id: '',
    c_title: '',
    dept_code:'',
    color: '#FFFFFF',
    public_code: '10'
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === 'color') {
      setSelectedColor(value);
    }
    setCalender((prev) => ({ ...prev, [name]: value }));
  };
  const colors = ['#ee5074', '#fa7227', '#ac725e', '#f7d915', '#a3b90a', '#57b92a', '#4fced8', '#5990d5', '#777dbf', '#844285'];

  const handleAddCalender = () => {
    console.log("최종 전송할 데이터:", calender);

    caxios.post("/calendar", calender).catch((error) => {
        if (error.response?.status === 404 || 500) {
          alert("등록에 실패했습니다.");
    }})

    
    setCalender({
      c_id: '',
      c_title: '',
      dept_code:'',
      color: '#FFFFFF',
      public_code: '10'
    });
    setIsModalOpen(false);
    };

    const [selectedColor, setSelectedColor] = useState('');

    return (
        <div className={addCategoryStyle['modal-overlay']}>
          
          <div className={addCategoryStyle['modal-container']}>
            <div className={addCategoryStyle.closeBtn}><button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button></div>
            <select name="public_code" value={calender.public_code} onChange={handleInput}>
               <option value="10">내 캘린더</option>
               <option value="20">공유 캘린더</option>
            </select>

            <div>
              캘린더 이름
              <input type="text" name="c_title" value={calender.c_title}  onChange={handleInput}/>
            </div>
            <div>
              색상
            {colors.map((color) => (
              <label key={color} className="inline-block mx-1 cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  value={color}
                  onChange={handleInput}
                  checked={selectedColor === color}
                  style={{ display: 'none' }}
                />
                <span
                  style={{
                    display: 'inline-block',
                    width: '24px',
                    height: '24px',
                    backgroundColor: color,
                    borderRadius: '50%',
                    border: selectedColor === color ? '3px solid #000' : '1px solid #ccc',
                  }}
                />
              </label>
            ))}
            </div>
            
            <div className={addCategoryStyle['modal-buttons']}>
            <button onClick={handleAddCalender} disabled={!calender.dept_code || !calender.public_code} >
              저장
            </button>
            </div>
          </div>
        </div>
      )

}

export default AddCategory;