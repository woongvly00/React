import style from './Index.module.css';
import axios from 'axios';
import useAuthStore from '../../store/useAuthStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navi = useNavigate();
    const [login, setLogin] = useState({ id: "", pw: "" });
    const setAuth = useAuthStore((state)=>state.setAuth);
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setLogin((prev)=> ({...prev, [name]:value}));
    }

    const handleLogin = (e)=>{
        e.preventDefault();
        axios.post("http://10.10.55.69/auth/login", login).then(resp=>{
            setAuth(resp.data, login.id);
            navi("/mainpage");
        }).catch((error) => {
            console.error("로그인 실패", error);
        });
    }

    return (
        <div className={style.container}>
            <div className={style.formWrapper}>
                {/* 로고 */}
                <div className={style.logoContainer}>
                    <img src="/path-to-your-logo.png" alt="Code Breaker 로고" className={style.logo} />
                </div>

                {/* 로그인 폼 */}
                <form className={style.form}>
                    <div className={style.inputGroup}>
                        <input type="text" placeholder="아이디" name='id'
                        className={style.input} onChange={handleChange} required/>
                    </div>

                    <div className={style.inputGroup}>
                        <input type="password" placeholder="비밀번호" name='pw'
                            className={style.input} onChange={handleChange} required/>
                    </div>
                    <button type="submit" onClick={handleLogin} className={style.loginButton}>로그인</button>
                </form>
            </div>
        </div>
    );

}

export default Index;