// Navbar.tsx
// แถบเมนูด้านบน ประกอบด้วยชื่อแอป ลิงก์หมวดหมู่ และช่องค้นหา
// - เรียก `onSearch` เมื่อค่าช่องค้นหาเปลี่ยน
// - แสดง UI เข้าสู่ระบบ/ออกจากระบบ (ใช้ AuthContext)
import React, { useState, useContext } from 'react';
import Login from './Login';
import { AuthContext } from '../context/AuthContext';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const categories = [
  { name: 'Action', url: '#' },
  { name: 'Fantasy', url: '#' },
  { name: 'Romance', url: '#' },
  { name: 'Comedy', url: '#' },
];

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  // Local input state for the search box
  const [input, setInput] = useState<string>('');
  // Toggle display of the Login panel
  const [showLogin, setShowLogin] = useState(false);
  // Auth context values (currentUser and logout function)
  const { currentUser, logout } = useContext(AuthContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newQuery = e.target.value;
    setInput(newQuery);
    onSearch(newQuery);
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-indigo-700 text-white shadow-xl flex items-center px-6 z-10">
      <h1 className="text-2xl font-bold mr-6 whitespace-nowrap">AanToon</h1>

      <div className="hidden md:flex items-center space-x-4 mr-6">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href={cat.url}
            className="text-sm font-medium text-white hover:text-indigo-200 transition-colors whitespace-nowrap"
          >
            {cat.name}
          </a>
        ))}
      </div>

      <div className="w-full max-w-xs ml-auto sm:max-w-md">
        <input
          type="text"
          placeholder="ค้นหาชื่อการ์ตูน..."
          value={input}
          onChange={handleInputChange}
          className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-gray-700 bg-white"
        />
      </div>

      <div className="ml-4">
        {currentUser ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium">{currentUser.username}</span>
            <button
              onClick={() => logout()}
              className="px-3 py-1 bg-white text-black rounded border"
            >
              ออกจากระบบ
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setShowLogin((s) => !s)}
              className="px-3 py-1 bg-white text-black rounded border"
            >
              เข้าสู่ระบบ
            </button>
            {showLogin && <Login onClose={() => setShowLogin(false)} />}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;