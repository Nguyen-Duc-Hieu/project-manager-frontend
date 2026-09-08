// import { useAuth } from '../context/AuthContext.jsx';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore.js';
import { usePermission } from '../hooks/usePermission.js';

export default function ProtectedRoute({ permissions = [], requiredAll = false }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const { hasAllPermissions, hasSomePermissions } = usePermission();
    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <Navigate to="/login" state={{ from: location }} replace />
        );
       
    }

    const isAuthorized = requiredAll 
        ? hasAllPermissions(permissions) 
        : hasSomePermissions(permissions);


    if (!isAuthorized) {
        return (
            <Navigate to="/unauthorized" replace />
        )
    }

    return (    
        <Outlet />
    )
}

