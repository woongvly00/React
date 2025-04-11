import style from './Index.module.css';
import axios from 'axios';
import useAuthStore from '../../store/useAuthStore';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

const Index = () => {
    const navi = useNavigate();
    const [login, setLogin] = useState({ id: '', pw: '' });
    const setAuth = useAuthStore((state) => state.setAuth);
    

    useEffect(() => {
        // ✅ Axios 요청 시 자동으로 JWT 헤더 추가
        axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('jwtToken');
                if (token && !config.url.includes("/auth/login")) {
                    config.headers.Authorization = `Bearer ${token}`;
                  }
                  
                return config;
            },
            (error) => Promise.reject(error)
        );
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://10.5.5.6/auth/login', login)
            .then((resp) => {
                const token = resp.data;
                const decodedToken = jwtDecode(token);
                const per_function = decodedToken.per_function;
                const per_secure = decodedToken.per_secure;

                // ✅ 로컬스토리지에 저장
                localStorage.setItem('jwtToken', token);

                // ✅ 상태관리도 병행 (Zustand 등)
                setAuth(token, login.id, per_function, per_secure);

                navi('/mainpage');
            })
            .catch((error) => {
                console.error('로그인 실패', error);
            });
    };

    return (
        <div className={style.container}>
            <div className={style.formWrapper}>
                <div className={style.logoContainer}>
                    <img src="/path-to-your-logo.png" alt="Code Breaker 로고" className={style.logo} />
                </div>

                <form className={style.form}>
                    <div className={style.inputGroup}>
                        <input
                            type="text"
                            placeholder="아이디"
                            name="id"
                            className={style.input}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={style.inputGroup}>
                        <input
                            type="password"
                            placeholder="비밀번호"
                            name="pw"
                            className={style.input}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" onClick={handleLogin} className={style.loginButton}>
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Index;
