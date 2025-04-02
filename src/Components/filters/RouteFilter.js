import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore"



const RouteFilter =()=>{
    const isAuth = useAuthStore((state)=>state.isAuth);
    return isAuth ? <Outlet /> : <Navigate to="/" />;
}



export default RouteFilter;