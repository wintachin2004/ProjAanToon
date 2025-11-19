
// Navbar.tsx
// แถบเมนูด้านบน ประกอบด้วยชื่อแอป ลิงก์หมวดหมู่ และช่องค้นหา
// - เรียก `onSearch` เมื่อค่าช่องค้นหาเปลี่ยน
// - แสดง UI เข้าสู่ระบบ/ออกจากระบบ (ใช้ AuthContext)
import React, { useState, useContext } from 'react';
import Login from './Login';
import { AuthContext } from '../context/AuthContext';



interface NavbarProps {
  onSearch: (query: string) => void;
  onHomeClick?: () => void;
  onAdminClick?: () => void;
}

const categories = [
  { name: 'Action', url: '#' },
  { name: 'Fantasy', url: '#' },
  { name: 'Romance', url: '#' },
  { name: 'Comedy', url: '#' },
];

const Navbar: React.FC<NavbarProps> = ({ onSearch, onHomeClick, onAdminClick }) => {
  const [input, setInput] = useState<string>('');
  const [showLogin, setShowLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newQuery = e.target.value;
    setInput(newQuery);
    onSearch(newQuery);
  };

  const handleHomeClick = () => {
    if (onHomeClick) onHomeClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleAdminClick = () => {
    if (onAdminClick) onAdminClick();
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 bg-indigo-700 text-white shadow-xl flex items-center px-4 sm:px-6 z-50">
        {/* Logo / Home Button */}
        <button
          onClick={handleHomeClick}
          className="text-lg font-bold mr-4 whitespace-nowrap cursor-pointer bg-indigo-700 text-white border border-indigo-700 py-1 px-3 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="กลับสู่หน้าหลัก"
          title="กลับสู่หน้าหลัก"
        >
          AanToon
        </button>

        {/* Burger Menu Button (Mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="เปิด/ปิดเมนู"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Categories (Desktop) */}
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

        {/* Admin Button (Desktop) */}
        <div className="ml-2 mr-2 hidden md:block">
          <button
            onClick={handleAdminClick}
            className="text-sm font-medium text-white bg-indigo-700 border border-white/30 px-3 py-1 rounded hover:bg-indigo-600 transition-colors"
            title="Admin"
            aria-label="Admin"
          >
            Admin
          </button>
        </div>

        {/* Search Box */}
        <div className="hidden sm:block w-full max-w-xs ml-auto lg:max-w-md">
          <input
            type="text"
            placeholder="ค้นหาชื่อการ์ตูน..."
            value={input}
            onChange={handleInputChange}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-gray-700 bg-white"
          />
        </div>

        {/* Login/Logout (Desktop) */}
        <div className="ml-4 hidden md:block">
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">{currentUser.username}</span>
              <button
                onClick={() => logout()}
                className="px-3 py-1 bg-white text-indigo-700 rounded border hover:bg-gray-100 transition-colors"
              >
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setShowLogin((s) => !s)}
                className="px-3 py-1 bg-white text-indigo-700 rounded border hover:bg-gray-100 transition-colors"
              >
                เข้าสู่ระบบ
              </button>
              {showLogin && <Login onClose={() => setShowLogin(false)} />}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-indigo-800 text-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Search Box (Mobile) */}
          <div className="p-4 border-b border-indigo-700">
            <input
              type="text"
              placeholder="ค้นหาชื่อการ์ตูน..."
              value={input}
              onChange={handleInputChange}
              className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors text-gray-700 bg-white"
            />
          </div>

          {/* Categories (Mobile) */}
          <div className="flex flex-col py-4 border-b border-indigo-700">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={cat.url}
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                {cat.name}
              </a>
            ))}
          </div>

          {/* Admin Button (Mobile) */}
          <div className="px-6 py-4 border-b border-indigo-700">
            <button
              onClick={handleAdminClick}
              className="w-full text-sm font-medium text-white bg-indigo-700 border border-white/30 px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
            >
              Admin
            </button>
          </div>

          {/* Login/Logout (Mobile) */}
          <div className="px-6 py-4 mt-auto">
            {currentUser ? (
              <div className="flex flex-col space-y-3">
                <span className="text-sm font-medium">
                  ผู้ใช้: {currentUser.username}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-white text-indigo-700 rounded border hover:bg-gray-100 transition-colors"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-white text-indigo-700 rounded border hover:bg-gray-100 transition-colors"
                >
                  เข้าสู่ระบบ
                </button>
                {showLogin && <Login onClose={() => setShowLogin(false)} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;