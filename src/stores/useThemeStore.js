import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

export const useThemeStore = create(
    persist(
        (set, get) => ({
            theme: 'light',
            toggleTheme: () => {
                set((state) => {
                    // Update class dark or light on the document element
                    const newTheme = state.theme === 'light' ? 'dark' : 'light';
                    const element = document.documentElement;
                    if (newTheme === 'dark') {
                        element.classList.add('dark');
                    } else {
                        element.classList.remove('dark');
                    }
                    return { theme: newTheme }
                });
                
            },
            
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
)