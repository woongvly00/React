import { create } from "zustand";



const useAuthStore = create((set)=>({
    token : null,
    userId : null,
    isAuth: false,

    setAuth: (token, userId)=>{
        set({token: token, userId: userId, isAuth: true});
        sessionStorage.setItem("token",token);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("isAuth", true);
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

        if(token && userId){
            set({token:token, userId:userId, isAuth: isAuth});
        }
    }
}))

export default useAuthStore;