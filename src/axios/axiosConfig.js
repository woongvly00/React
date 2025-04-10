// // src/axios/axiosConfig.js
import axios from 'axios';

// // 기본 API 베이스 주소 설정 (옵션)
// axios.defaults.baseURL = 'http://10.10.55.66';

// // 요청 인터셉터: JWT 토큰 자동 첨부
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('jwtToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axios; // 이 axios를 쓰게 될 거야'



export const authAxios = axios.create({
  baseURL: 'http://10.10.55.66'
});
authAxios.interceptors.request.use(config => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default authAxios;
