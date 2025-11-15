import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

// Login.tsx
// แผงล็อกอินขนาดเล็กที่ Navbar ใช้สำหรับยืนยันตัวตนผู้ใช้ตัวอย่าง
// - เรียก `AuthContext.login` และแสดงสถานะ loading / error แบบพื้นฐาน
interface LoginProps {
  onClose?: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  // get the login function from context
  const { login } = useContext(AuthContext);
  // controlled form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Submit form: call the context login and handle result
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const ok = await login(username.trim(), password);
    setLoading(false);
    if (!ok) setError('ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง');
    else if (onClose) onClose();
  };

  return (
    <div className="fixed right-6 top-20 w-80 bg-white border rounded-lg shadow-lg p-4 z-50">
      <h3 className="text-lg font-semibold mb-2">เข้าสู่ระบบ</h3>
      <form onSubmit={handleSubmit}>
        {/* username/password inputs are controlled components */}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ชื่อผู้ใช้"
          className="w-full p-2 border rounded mb-2 bg-white text-black placeholder-gray-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="รหัสผ่าน"
          className="w-full p-2 border rounded mb-2"
        />
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'กำลังเชื่อมต่อ...' : 'เข้าสู่ระบบ'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 border rounded text-white bg-gray-500 hover:bg-gray-600"
          >
            ปิด
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
