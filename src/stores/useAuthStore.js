import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { useThemeStore } from './useThemeStore';


export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            actions: {
                login: (user) => {
                    set({ user, isAuthenticated: true })
                },
                logout: () => {
                    const userName = get().user?.username || "Unknown";
                    set({ user: null, isAuthenticated: false });
                    useThemeStore.getState().setLightTheme(); // Reset theme to light on logout
                    console.log(`Người dùng ${userName} đã đăng xuất, xóa thông tin user khỏi localStorage`);
                }
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            })
        }
    )
)

export const useAuthStoreActions = () => useAuthStore((state) => state.actions);