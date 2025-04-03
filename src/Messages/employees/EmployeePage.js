import { useState,useEffect } from "react";
import style from './Employee.module.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";



function EmployeePage({openChat}) {
    const [employees,setEmployees] = useState([]);
    const [groupedEmployees, setGroupedEmployees] = useState({});
    const [groupedRooms, setGroupedRooms ] = useState({});
    const Navigate = useNavigate();
    
    //사원목록 가져오기
    useEffect(() => {
        axios.get("http://10.5.5.2/Employee/SelectEmp").then((resp) => {
          setEmployees(resp.data);
          console.log(resp.data);
    
          // 부서별로 직원 그룹화
          const grouped = resp.data.reduce((acc, emp) => {
            if (!acc[emp.dept_name]) {
              acc[emp.dept_name] = [];
            }
            acc[emp.dept_name].push(emp.emp_name);
            return acc;
          }, {});
    
          setGroupedEmployees(grouped);

          return axios.get("http://10.5.5.2/Employee/SelectGroupId");
        }).then((groupIdResp)=>{
            console.log(groupIdResp.data);
        })
      }, []);

     


    return (
        <div className={style.main}>
            <div className={style.myprofile}>
                <div className={style.imgbox}>
                    <div className={style.img}>
                        {/* <img src=""></img> 프로필 이미지 넣는곳*/}
                    </div>
                </div>
                <div className={style.namebox}>
                    <div className={style.name}>임태웅</div>
                </div>
            </div>
            {Object.entries(groupedEmployees).map(([dept, names]) => (
                <div key={dept}>
                    <p>{dept}</p> {/* 부서명 출력 */}
                    {names.map((name, index) => (
                        <div key={index} className={style.another}>
                            <div className={style.imgbox}>
                                <div className={style.anotherimg}>
                                    {/* <img src=""></img> 프로필 이미지 넣는곳 */}
                                </div>
                            </div>
                            <div className={style.namebox} onDoubleClick={()=>openChat(name)}>
                                <div className={style.anothername}>{name}</div> {/* 사원명 출력 */}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            

        </div>

    )



}

                                                                                    
export default EmployeePage;