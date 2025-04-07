import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore"



const RouteFilter =()=>{
    const isAuth = useAuthStore((state)=>state.isAuth);
    const isInitialized = useAuthStore((state) => state.isInitialized);

    if (!isInitialized) return null; // 아직 초기화 중이면 아무것도 렌더하지 않음
    return isAuth ? <Outlet /> : <Navigate to="/" />;
}



export default RouteFilter;