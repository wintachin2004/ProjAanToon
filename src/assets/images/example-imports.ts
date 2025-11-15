// ตัวอย่างการ import รูปภาพ (อ่านคู่กับ README.md)

// --- วิธีที่ 1: ใช้โฟลเดอร์ public (ไม่ต้อง import) ---
// วางไฟล์ภาพที่: public/images/comic1-ep1.jpg
// แล้วใน data.ts ให้ใช้
// episodes: [ { episodeNumber: 1, imageUrl: '/images/comic1-ep1.jpg', title: 'ตอนที่ 1', comments: [...] } ]

// --- วิธีที่ 2: เก็บใน src/assets/images และ import ---
// วางไฟล์ภาพที่: src/assets/images/comic1-ep1.jpg
// จากนั้นในไฟล์ที่ต้องการ (เช่น src/data/data.ts) จะเขียนแบบนี้:

/*
import comic1ep1 from '../assets/images/comic1-ep1.jpg';
import comic1ep2 from '../assets/images/comic1-ep2.jpg';

export const initialComicsData = [
  {
    id: 1,
    title: 'ตัวอย่าง',
    imageUrl: comic1ep1, // รูปปกเรื่อง
    description: 'คำอธิบาย',
    episodes: [
      { episodeNumber: 1, imageUrl: comic1ep1, title: 'ตอนที่ 1', comments: [] },
      { episodeNumber: 2, imageUrl: comic1ep2, title: 'ตอนที่ 2', comments: [] },
    ],
  },
];
*/

// ข้อควรระวัง:
// - ถ้า import แล้วไฟล์ภาพยังไม่อยู่ จะทำให้คอมไพล์ล้มเหลว
// - ถ้าจะทดลองเร็ว ๆ แนะนำใช้ public/images เพราะไม่ต้อง import

// ถ้าคุณวางไฟล์ภาพแล้ว บอกผมชื่อไฟล์หรืออัปโหลด ผมจะช่วยแก้ `src/data/data.ts` ให้ใช้รูปนั้นอัตโนมัติ
