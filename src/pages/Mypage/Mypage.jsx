import useAuthStore from "../../store/useAuthStore";
import style from './Mypage.module.css';
import { useEffect, useState } from "react";
import axios from "../../axios/axiosConfig";
import authAxios from '../../axios/axiosConfig';
// 조휘영
const Mypage = () => {
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({});   
    const [userInfo, setUserInfo] = useState(null);
    const { userId, isInitialized } = useAuthStore();
    const [profileImage, setProfileImage] = useState(null); // 미리보기용 1
    const [profileFile, setProfileFile] = useState(null);   // 서버로 보낼 파일

    useEffect(() => {
        if (!isInitialized || !userId) return;
        authAxios.get("http://10.10.55.66/mypage/info")
            .then(res => {
                setUserInfo(res.data);
                setFormData({
                    emp_code_id: res.data.emp_code_id,
                    emp_email:res.data.emp_email,
                    emp_phone:res.data.emp_phone,
                    postcode: res.data.postcode,
                    address1: res.data.address1,
                    address2: res.data.address2,
                });
                const path = res.data.profileDTO?.profile_path;
            setProfileImage(path ? `http://10.10.55.66${path}` : "/default-profile.png");
            })
            .catch(err => console.error("유저 정보 로딩 실패", err));
    }, [isInitialized, userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePostcode = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setFormData(prev => ({
                    ...prev,
                    postcode: data.zonecode,
                    address1: data.roadAddress,
                    address2: ''
                }));
            }
        }).open();
    };
    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        if(file){
            setProfileImage(URL.createObjectURL(file));  //이게 미리보기
            setProfileFile(file); //이게 전송
        }
    }

    const handleSave = () => {
        const formDataToSend = new FormData();
        const employeeBlob = new Blob(
            [JSON.stringify(formData)], 
            { type: "application/json" }
        );
        formDataToSend.append("data", employeeBlob);

        if (profileFile) {
            formDataToSend.append("profile", profileFile);
        }

        axios.put("http://10.10.55.66/mypage/update", formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            setUserInfo(prev => ({ ...prev, ...formData }));
            setEdit(false);
            alert("수정이 완료되었습니다.");
        })
        .catch(err => {
            console.error("수정 실패", err);
            alert("수정 중 오류가 발생했습니다.");
        });
    };
    

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.container}>
            <h2>마이페이지</h2>
            <div className={style.profileCard}>
                {/* 프로필 */}
                <div className={style.pro}>
                    <img src={profileImage} alt="프로필" onError={(e) => e.target.src = "/default-profile.png"} className={style.profileImage} />
                {edit && (
                    <input type="file" accept="image/*" onChange={handleFileChange}/>
                )}
                </div>
                <div className={style.row}>
                    <label>이름:</label>
                    <span>{userInfo.emp_name}</span>
                </div>
                <div className={style.row}>
                    <label>이메일:</label>
                    {edit ? (
                        <input name = "emp_email" value={formData.emp_email}
                        onChange={handleChange} placeholder="이메일"/>
                    ) : (
                        <span>{userInfo.emp_email}</span>
                    )}
                    
                </div>
                <div className={style.row}>
                    <label>전화번호:</label>
                    {edit ? (
                        <input name="emp_phone" value={formData.emp_phone}
                        onChange={handleChange} placeholder="전화번호"/>
                    ) : (
                        <span>{userInfo.emp_phone}</span>
                    )}
                </div>
                <div className={style.row}>
                    <label>주소:</label>
                    {edit ? (
                        <div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <input
                                    name="postcode"
                                    value={formData.postcode}
                                    readOnly
                                    placeholder="우편번호"
                                />
                                <button type="button" onClick={handlePostcode}>
                                    우편번호 찾기
                                </button>
                            </div>
                            <input
                                name="address1"
                                value={formData.address1}
                                readOnly
                                placeholder="주소"
                            />
                            <input
                                name="address2"
                                value={formData.address2}
                                onChange={handleChange}
                                placeholder="상세주소"
                            />
                        </div>
                    ) : (
                        <span>{userInfo.address1} {userInfo.address2} (우편번호: {userInfo.postcode})</span>
                    )}
                </div>
                <div className={style.row}>
                    <label>입사일:</label>
                    <span>{new Date(userInfo.hire_date).toLocaleDateString()}</span>
                </div>
                <div className={style.row}>
                    <label>급여:</label>
                    <span>{userInfo.salary.toLocaleString()} 원</span>
                </div>
                <div className={style.row}>
                    <label>부서:</label>
                    <span>{userInfo.departDTO?.dept_name || "미지정"}</span>
                </div>
                <div className={style.row}>
                    <label>직급:</label>
                    <span>{userInfo.jobDTO?.job_name || "미지정"}</span>
                </div>

                <div className={style.actions}>
                    {edit ? (
                        <>
                            <button onClick={handleSave}>저장</button>
                            <button onClick={() => setEdit(false)}>취소</button>
                        </>
                    ) : (
                        <button onClick={() => setEdit(true)}>수정</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Mypage;
