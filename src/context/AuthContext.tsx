import React, { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { users as demoUsers } from '../data/users';

// AuthContext.tsx
// Context สำหรับระบบล็อกอินฝั่งไคลเอนต์ (สำหรับเดโม)
// - เก็บข้อมูลผู้ใช้ที่ล็อกอินไว้ใน state ของ React และใน `localStorage`
// - ให้ฟังก์ชัน `login(username,password)` และ `logout()` แก่คอมโพเนนต์ลูก
// หมายเหตุ: วิธีนี้เหมาะสำหรับเดโมเท่านั้น (รหัสผ่านเป็น plain-text ใน `src/data/users.ts`)
// ในการใช้งานจริง ควรใช้ backend ที่ปลอดภัยในการจัดการ authentication
export interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // currentUser: null when no user is authenticated
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // On mount, attempt to restore user from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('authUser');
      if (raw) setCurrentUser(JSON.parse(raw));
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) localStorage.setItem('authUser', JSON.stringify(currentUser));
    else localStorage.removeItem('authUser');
  }, [currentUser]);

  // login: naive demo implementation that checks `src/data/users.ts` for a match
  const login = async (username: string, password: string) => {
    // simulate async delay
    await new Promise((r) => setTimeout(r, 200));
    const found = demoUsers.find((u) => u.username === username && u.password === password);
    if (found) {
      const u: User = { id: found.id, username: found.username };
      setCurrentUser(u);
      return true;
    }
    return false;
  };

  // logout clears the current user
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
