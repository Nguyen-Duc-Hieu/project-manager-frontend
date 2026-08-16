import { useAuth } from '../context/AuthContext.jsx';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const { user } = useAuth();

    if (!user) {
        console.log("Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập");
        return (
            <Navigate to="/login" replace />
        );
       
    }
    console.log("Người dùng đã đăng nhập, cho phép truy cập vào các route con");

    return (    
        <Outlet />
    )
}

