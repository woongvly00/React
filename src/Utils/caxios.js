import axios from 'axios';


const caxios = axios.create({
    baseURL:'http://192.168.219.102'
});

caxios.interceptors.request.use(
    (config)=>{
        const token = sessionStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)

export default caxios;