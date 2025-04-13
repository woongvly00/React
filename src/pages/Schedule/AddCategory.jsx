
import React, { useState, useEffect } from 'react';
import caxios from '../../Utils/caxios';
import addCategoryStyle from './AddCategoryStyle.module.css';



const AddCategory = ({ closeModal, selectedInfo }) => {


  const [userInfo,setUserInfo] = useState(null);
  useEffect(()=>{
          caxios.get("/mypage/info").then((resp)=>{
              setUserInfo(resp.data);
              
          }).catch((error) => {
              console.error("실패", error);
          });
          
      }, [])


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
    setCalender((prev) => ({...prev, dept_code : userInfo.emp_dept_id, emp_id : userInfo.emp_code_id}));
  };
  const colors = ['#ee5074', '#fa7227', '#ac725e', '#f7d915', '#a3b90a', '#57b92a', '#4fced8', '#5990d5', '#777dbf', '#844285'];



  const handleAddCalender = () => {

    caxios.post("/calendar", calender).then((resp)=> {
      const c_id = resp.data.c_id;
      console.log(c_id);
      const shareData = selectedTargets.map(t => ({
        c_id: c_id,
        target_type: t.target_type,
        target_id: t.target_id
      }));

      return caxios.post("/calendar/calendarShare", shareData);
    })
    .catch((error) => {
        if (error.response?.status === 404 || error.response?.status === 500) {
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
    setSelectedTargets(prev => [...prev, { target_id: Number(value), target_type:label, name:label }]);

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
            <div className={addCategoryStyle.closeBtn}>
              <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
            </div>

            <select className={addCategoryStyle['form-select']} value={calender.public_code} onChange={handleCalInput}>
              <option value="10">내 캘린더</option>
              <option value="20">공유 캘린더</option>
            </select>

            {calender.public_code == 20 && (
              <div>
                <div><strong>공유 대상</strong></div>
                <div>
                  부서 선택
                  <select className={addCategoryStyle['form-select']} data-type="dept" onChange={handleAddTarget}>
                    <option value="">부서</option>
                    {departments.map((dept) => (
                      <option key={dept.dept_id} value={dept.dept_id}>{dept.dept_name}</option>
                    ))}
                  </select>
                  개별 선택
                  <select className={addCategoryStyle['form-select']} data-type="emp" onChange={handleAddTarget}>
                    <option value="">개인</option>
                    {employees.map((emp) => (
                      <option key={emp.emp_code_id} value={emp.emp_code_id}>
                        {emp.emp_name}{emp.job_}
                      </option>
                    ))}
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
            )}

            <div>
              캘린더 이름
              <input
                type="text"
                className={addCategoryStyle['form-input']}
                value={calender.c_title}
                onChange={handleCalInput}
              />
            </div>

            <div className={addCategoryStyle['color-section']}>
              <p className={addCategoryStyle['color-label']}>색상 (캘린더 이름 색상)</p>
              <div className={addCategoryStyle['color-options']}>
                {colors.map((color) => (
                  <label key={color} className={addCategoryStyle['form-radio']}>
                    <input
                      type="radio"
                      className={addCategoryStyle['form-radio-input']}
                      value={color}
                      onChange={handleCalInput}
                      checked={selectedColor === color}
                      style={{ display: 'none' }}
                    />
                    <span
                      className={addCategoryStyle['color-circle']}
                      style={{
                        backgroundColor: color,
                        border: selectedColor === color ? '3px solid #000' : '1px solid #ccc',
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className={addCategoryStyle['modal-buttons']}>
              <button className={addCategoryStyle['form-button']} onClick={handleAddCalender}>저장</button>
            </div>
          </div>
        </div>

    
      )

}

export default AddCategory;