// src/data/users.ts
// ฐานข้อมูลผู้ใช้ตัวอย่าง (เก็บในหน่วยความจำ) ไฟล์นี้สำหรับการพัฒนา/ทดสอบเท่านั้น
// ห้ามใช้รหัสผ่านแบบ plain-text ใน production ให้เปลี่ยนไปใช้ backend ที่ปลอดภัย
export interface DemoUser {
  id: number;
  username: string;
  password: string; // Plain text for demo only
  role?: 'admin' | 'user';
}

// Example demo users used by AuthContext.login
export const users: DemoUser[] = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'guest', password: 'guest', role: 'user' },
  
];
