import axios from 'axios';


const caxios = axios.create({
    baseURL:'http://10.10.54.192'
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