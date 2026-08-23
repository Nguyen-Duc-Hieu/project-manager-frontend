import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'



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
                    console.log(`Người dùng ${userName} đã đăng xuất, xóa thông tin user khỏi localStorage`);
                },
                checkUser: () => {
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        set({ user: JSON.parse(storedUser), isAuthenticated: true });
                    }
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