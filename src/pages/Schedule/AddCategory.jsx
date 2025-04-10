
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
         setCalender((prev) => ({...prev, dept_code : mine.emp_dept_id, emp_id : mine.emp_code_id}));
        
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

  const handleCalInput = (e) => {
    const { name, value } = e.target;

    if (name === 'color') {
      setSelectedColor(value);
    }
    setCalender((prev) => ({ ...prev, [name]: value }));
  };
  const colors = ['#ee5074', '#fa7227', '#ac725e', '#f7d915', '#a3b90a', '#57b92a', '#4fced8', '#5990d5', '#777dbf', '#844285'];



  const handleAddCalender = () => {

    caxios.post("/calendar", {calender:calender, selectedTargets:selectedTargets}).catch((error) => {
        if (error.response?.status === 404 || 500) {
          alert("등록에 실패했습니다.");
    }})

    
    setCalender({
      c_id: '',
      c_title: '',
      emp_id: '',
      dept_code:'',
      color: '#FFFFFF',
      created_date: '',
      public_code: '10'
    });

    setIsModalOpen(false);
    };

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedTargets, setSelectedTargets] = useState([]);

  const handleAddTarget = (e) => {
    const value = e.target.value;
    if (!value) return;

    const exists = selectedTargets.some(t => t.id === value);
    if (exists) return;

    const label = e.target.options[e.target.selectedIndex].text;
    setSelectedTargets(prev => [...prev, { id: value, name: label }]);

    e.target.selectedIndex = 0;
  };

  const removeTarget = (id) => {
    setSelectedTargets(prev => prev.filter(t => t.id !== id));
  };

  const [employees, setEmployees] = useState([]);
  const [ departments, setDepartments ] = useState([]);

  useEffect(() => {
    caxios.get("/emp/selectAllEmps").then((resp) => {
      const emps = resp.data;
      setEmployees(emps);

    }).catch((error) => {
      if (error.response?.status === 404 || 500) {
        alert("부서 목록을 불러오는데 실패했습니다.");
    }});

    caxios.get("/emp/selectAllDepts").then((resp) => {
      const depts = resp.data;
      setDepartments(depts);

    }).catch((error) => {
      if (error.response?.status === 404 || 500) {
        alert("부서 목록을 불러오는데 실패했습니다.");
    }});

  },[])


    return (
        <div className={addCategoryStyle['modal-overlay']}>
          <div className={addCategoryStyle['modal-container']}>
            <div className={addCategoryStyle.closeBtn}><button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button></div>
            <select name="public_code" value={calender.public_code} onChange={handleCalInput}>
               <option value="10">내 캘린더</option>
               <option value="20">공유 캘린더</option>
            </select>
            {
              calender.public_code == 20 
              ? <div>
                  <div><strong>공유 대상</strong></div>
                  <div>
                    부서 선택
                    <select name='target_id' onChange={handleAddTarget}>
                      <option value="">부서</option>
                      
                      {
                        departments.map((dept) => (
                          <>
                          <option value={dept.dept_id}>{dept.dept_name}</option>
                          </>
                        ))
                      }
                    </select>
                    개별 선택
                    <select name='target_id' onChange={handleAddTarget}> 
                      <option value="">개인</option>
                      {
                        employees.map((emp) => (
                          <>
                          <option value={emp.emp_code_id}>{emp.emp_name}{emp.job_}</option>
                          </>
                        ))
                      }
                    </select>
                  </div>
                  <div>
                    <p>선택된 대상:</p>
                    {selectedTargets.length > 0 ? (
                      selectedTargets.map(t => (
                        <span key={t.id} style={{ marginRight: '8px' }}>
                          {t.name} <button onClick={() => removeTarget(t.id)}>❌</button>
                        </span>
                      ))
                    ) : (
                      <p style={{ color: '#888' }}>선택된 대상이 없습니다.</p>
                    )}
                  </div>
                </div> 
              : <></> 
            }

            <div>
              캘린더 이름
              <input type="text" name="c_title" value={calender.c_title}  onChange={handleCalInput}/>
            </div>
            <div>
              색상
            {colors.map((color) => (
              <label key={color} className="inline-block mx-1 cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  value={color}
                  onChange={handleCalInput}
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
            <button onClick={handleAddCalender}>
              저장
            </button>
            </div>
          </div>
        </div>
      )

}

export default AddCategory;