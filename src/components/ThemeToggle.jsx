import { useThemeStore } from '../stores/useThemeStore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();
    return (
        <div>
            <button
                onClick={toggleTheme}
                className={`text-xl cursor-pointer p-1 ${theme === 'light' ? 'hover:text-yellow-500' : 'hover:text-blue-500'}`}
                data-tooltip-id="theme-tooltip"
                data-tooltip-content={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
                {theme === 'light' ? (
                    <FontAwesomeIcon icon={faSun} />
                ) : (
                    <FontAwesomeIcon icon={faMoon} />
                )}
            
            </button>
            <Tooltip
                id="theme-tooltip"
            />
        </div>
        
        
    )
}