import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavItem({ icon, label, isSidebarOpen, path, actionOpen }) {

  const activeClassName = ({ isActive }) => {
    const baseClass = "flex items-center gap-2 p-1 rounded-md overflow-x-hidden";
    const activeClass = isActive ? baseClass + " bg-blue-400 text-white" : baseClass + " hover:bg-blue-200 dark:hover:bg-blue-600";
    return activeClass;
  };

  const handleClick = () => {
    if (!isSidebarOpen) {
      actionOpen();
    }
  }

  return (
    <motion.div
      initial={{ marginRight: 8 }}
      animate={{ marginRight: isSidebarOpen ? 8 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <NavLink
        to={path}
        className={activeClassName}
        onClick={handleClick}
      >
        <div
          data-tooltip-id={!isSidebarOpen ? "sidebar-tooltip" : undefined}
          data-tooltip-content={label}
          className="text-xl"
        >
          {icon}
        </div>

        {isSidebarOpen && (<div className="font-bold whitespace-nowrap">{label}</div>)}
      </NavLink>
    </motion.div>
  )
}