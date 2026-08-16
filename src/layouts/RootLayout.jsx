import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RootLayout() {
  const { user, logout } = useAuth();
  const activeClassName = ({isActive}) => {
    const baseClass = "text-center p-2 rounded-xl border-2 border-gray-300";
    const activeClass = "text-blue-500 font-bold bg-white";
    const inactiveClass = "text-black bg-white";
    return isActive ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;
  };

  return (
    <div className="flex h-screen">
      
      <aside className="w-60 h-full flex flex-col">
        <div className="bg-black text-white py-4">
          <h2 className="text-center">Chào mừng {user?.username}</h2>
        </div>

        <nav className="flex flex-col gap-4 bg-slate-500 p-4 flex-1">
          <NavLink
            to="/"
            className={activeClassName}
          >
            Trang chủ
          </NavLink>
          
          <NavLink
            to="/projects"
            className={activeClassName}
          >
            Dự án
          </NavLink>

          <div className="mt-auto flex justify-center">
            <button
              className="rounded-full bg-blue-500 text-white font-bold px-3 py-2 text-sm hover:bg-blue-700 hover:cursor-pointer"
              onClick={logout}
            >
              Đăng xuất
            </button>
          </div>
        </nav>

        
      </aside>


      <main className="h-full flex-1">
        <Outlet />
      </main>

    </div>
  );
}