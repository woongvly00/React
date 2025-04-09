import useAuthStore from "../../store/useAuthStore";
import style from './Mypage.module.css';
import { useEffect, useState } from "react";
import axios from "../../axios/axiosConfig";

const Mypage = () => {

    const [userInfo, setUserInfo] = useState(null);
    const { userId, isInitialized } = useAuthStore();

    useEffect(() => {
        if (!isInitialized || !userId) return;
        axios.get("http://10.10.55.66/mypage/info")
            .then(res => setUserInfo(res.data))
            .catch(err => console.error("유저 정보 로딩 실패", err));
    }, [isInitialized, userId]);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.container}>
            <h2>마이페이지</h2>
            <div className={style.profileCard}>
                <div className={style.row}>
                    <label>이름:</label>
                    <span>{userInfo.emp_name}</span>
                </div>
                <div className={style.row}>
                    <label>이메일:</label>
                    <span>{userInfo.emp_email}</span>
                </div>
                <div className={style.row}>
                    <label>전화번호:</label>
                    <span>{userInfo.emp_phone}</span>
                </div>
                <div className={style.row}>
                    <label>주소:</label>
                    <span>{userInfo.address1} {userInfo.address2} (우편번호: {userInfo.postcode})</span>
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
            </div>
        </div>
    );
};

export default Mypage;
