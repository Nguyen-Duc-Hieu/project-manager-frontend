import { useContext, createContext, useState, useEffect } from 'react';
import userApi from '../services/userApi.js';
import { useQueryClient } from '@tanstack/react-query';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const queryClient = useQueryClient();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    setTimeout(() => {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }, 3000);
  }, []);

  const login = async (userData) => {
    try {
      const { username, password } = userData;
      const user = await userApi.login(username, password);

      const userInfo = {
        id: user.id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
      }

      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    queryClient.clear();
    console.log("Người dùng đã đăng xuất, xóa thông tin user khỏi localStorage");
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1 className="font-bold text-2xl">Đang kiểm tra thông tin user trong localStorage...</h1>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
