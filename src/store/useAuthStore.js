import { create } from "zustand";

const useAuthStore = create((set) => ({
    token: null,
    userId: null,
    isAuth: false,
    per_function: "U",
    per_secure: 3,
    isInitialized: false,

    setAuth: (token, userId, per_function, per_secure) => {
        set({
            token,
            userId,
            isAuth: true,
            per_function,
            per_secure
        });

        // ✅ localStorage에 저장, 키 이름 통일
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("per_function", per_function);
        localStorage.setItem("per_secure", per_secure.toString());
    },

    logout: () => {
        set({
            token: null,
            userId: null,
            isAuth: false,
            per_function: null,
            per_secure: 0
        });

        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("isAuth");
        localStorage.removeItem("per_function");
        localStorage.removeItem("per_secure");
    },

    initialize: () => {
        const token = localStorage.getItem("jwtToken");
        const userId = localStorage.getItem("userId");
        const isAuth = localStorage.getItem("isAuth") === "true";
        const per_function = localStorage.getItem("per_function");
        const per_secure = parseInt(localStorage.getItem("per_secure"));

        console.log("initialize 실행중");

        if (token && userId) {
            set({
                token,
                userId,
                isAuth,
                per_function,
                per_secure,
                isInitialized: true
            });
        } else {
            set({
                token: null,
                userId: null,
                isAuth: false,
                per_function: null,
                per_secure: 0,
                isInitialized: true
            });
        }
    }
}));

export default useAuthStore;