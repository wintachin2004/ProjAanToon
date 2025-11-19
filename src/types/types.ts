// src/types/types.ts
// ประเภทข้อมูล (TypeScript types) ที่ใช้ร่วมกันในแอปตัวอย่าง
// - Comment: ข้อมูลคอมเมนต์ของผู้ใช้
// - Episode: ตอนของการ์ตูน (อาจมี `imageUrl` ได้)
// - Comic: ข้อมูลเมตาของการ์ตูน รวมถึงรายการตอน

export interface Comment {
  id: string
  author: string
  text: string
  date: string
}

export interface Episode {
  number: number
  title: string
  content: string
  imageUrl?: string
  imageUrls?: string[]
  pdfUrl?: string
  // คอมเมนต์
  comments?: Comment[]
}

export interface Comic {
  id: string
  title: string
  description: string
  imageUrl?: string
  episodes: Episode[]
}
// - ควรเก็บชนิดข้อมูลให้เป็นระเบียบเพื่อความปลอดภัยของชนิดข้อมูลใน TypeScript

export interface Comment {
  id: string
  author: string
  text: string
  date: string
}

export interface Episode {
  // หมายเลขตอน (เช่น 1, 2, 3)
  number: number

  // ภาพประกอบของตอน (เป็น optional เพราะอาจไม่มีรูปสำหรับทุกตอน)
  imageUrl?: string
}

export interface Comic {
  id: string
  title: string
  description: string
  // ภาพปกของการ์ตูน (optional)
  imageUrl?: string
  episodes: Episode[]
  // คอมเมนต์รวมของการ์ตูน (optional)
  comments?: Comment[]
}