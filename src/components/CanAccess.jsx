import { usePermission } from '../hooks/usePermission.js';


export default function CanAccess({ 
    permissions = [], 
    requiredAll = false, 
    fallback = null,
    children 
}) {

    const { hasAllPermissions, hasSomePermissions } = usePermission();

    const isAuthorized = requiredAll ? hasAllPermissions(permissions) : hasSomePermissions(permissions);

    if (!isAuthorized) {
        return fallback;
    }

    return children;
}