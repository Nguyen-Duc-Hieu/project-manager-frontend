import { useAuthStore } from '../stores/useAuthStore.js';

export function usePermission() {
    const user = useAuthStore.getState().user
    const userPermissions = user?.permissions || [];
    console.log("Custom hook usePermission vừa chạy: ", userPermissions);

    const hasPermission = (permission) => {
        return userPermissions.includes(permission);
    }

    const hasAllPermissions = (permissions = []) => {
        if (permissions.length === 0) return true;
        return permissions.every((permission) => userPermissions.includes(permission));
    }

    const hasSomePermissions = (permissions = []) => {
        if (permissions.length === 0) return true;
        return permissions.some((permission) => userPermissions.includes(permission));
    }

    return { hasPermission, hasAllPermissions, hasSomePermissions };
}