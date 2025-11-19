import React, { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { users as demoUsers } from '../data/users';

// เพิ่ม role ให้ user
export interface User {
  id: number;
  username: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin?: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAdmin: false,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // restore user from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('authUser');
      // **ต้องมีการตรวจสอบว่า JSON.parse(raw) มี role หรือไม่**
      if (raw) {
        const parsed = JSON.parse(raw);
        // Ensure role exists, default to 'user' if not found (for legacy stored data)
        if (parsed.username) {
            setCurrentUser({
                id: parsed.id,
                username: parsed.username,
                role: parsed.role || 'user' // Default role
            });
        }
      }
    } catch (e) {}
  }, []);

  // persist user
  useEffect(() => {
    if (currentUser) localStorage.setItem('authUser', JSON.stringify(currentUser));
    else localStorage.removeItem('authUser');
  }, [currentUser]);

  const login = async (username: string, password: string) => {
    await new Promise((r) => setTimeout(r, 200));
    // demoUsers ต้องมี role field ด้วย
    const found = demoUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      const u: User = { id: found.id, username: found.username, role: found.role };
      setCurrentUser(u);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user: currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
