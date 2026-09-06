import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

export const useThemeStore = create(
    persist(
        (set, get) => ({
            theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light",
            toggleTheme: () => set((state) => {
                // Update class dark or light on the document element
                const newTheme = state.theme === 'light' ? 'dark' : 'light';
                const element = document.documentElement;
                if (newTheme === 'dark') {
                    element.classList.add('dark');
                } else {
                    element.classList.remove('dark');
                }
                return { theme: newTheme }
            }),
            setLightTheme: () => set((state) => {
                const element = document.documentElement;
                element.classList.remove('dark');

                return { theme: "light" }
            })
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => localStorage),
            // onRehydrateStorage: () => {

            // }
        }
    )
)