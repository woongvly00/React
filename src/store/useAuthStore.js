import { create } from "zustand";



const useAuthStore = create((set)=>({
    token : null,
    userId : null,
    isAuth: false,
    per_function :"U",
    per_secure:3,
    


    setAuth: (token, userId, per_function, per_secure)=>{
        set({token: token, userId: userId, isAuth: true, per_function: per_function, per_secure:per_secure});
        sessionStorage.setItem("token",token);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("isAuth", true);
        sessionStorage.setItem("per_function",per_function);
        sessionStorage.setItem("per_secure",per_secure);
    },
    logout: ()=>{
        set({token:null, userId:null, isAuth:false});
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("isAuth");
    },
    initialize: ()=>{
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("userId");
        const isAuth = sessionStorage.getItem("isAuth");
        console.log("initialize 실행중")

        

        if(token && userId){
            set({token:token, userId:userId, isAuth: isAuth});
        }

    }

   
}))

export default useAuthStore;