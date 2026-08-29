import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

export default function RootLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="h-full flex-1">
        <Outlet />
      </main>
    </div>
  );
}
