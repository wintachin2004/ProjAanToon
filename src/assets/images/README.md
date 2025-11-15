คำแนะนำการจัดการรูปภาพ

สองวิธีที่แนะนำในการเก็บรูปภาพสำหรับโปรเจกต์นี้:

1) เก็บใน public/images/ (แนะนำสำหรับไฟล์ภาพที่ไม่เปลี่ยนบ่อย)
   - วางไฟล์ภาพลงที่ `public/images/` เช่น `public/images/comic1-ep1.jpg`
   - เรียกใช้ใน `data.ts` หรือคอมโพเนนต์ด้วย URL ตรง ๆ เช่น:
     `imageUrl: '/images/comic1-ep1.jpg'`
   - ข้อดี: ไม่ต้อง import, เปลี่ยนไฟล์ได้โดยไม่ต้อง rebuild ในบางกรณี

2) เก็บใน src/assets/images/ แล้ว import (ใช้ bundler เพื่อจัดการ)
   - วางไฟล์ภาพลงที่ `src/assets/images/` เช่น `src/assets/images/comic1-ep1.jpg`
   - import ในไฟล์ TypeScript/TSX เช่น:
     `import comic1ep1 from '../assets/images/comic1-ep1.jpg';`
   - จากนั้นใช้ตัวแปรที่ import เป็นค่า `imageUrl` ใน `data.ts` หรือคอมโพเนนต์
   - ข้อดี: bundler จะจัดการ fingerprinting/caching และ path ให้เรียบร้อย

ตัวอย่างการใช้งานและคำแนะนำมีในไฟล์ `example-imports.ts` ในโฟลเดอร์เดียวกัน

หมายเหตุ: ผมได้เพิ่มไฟล์ตัวอย่าง แต่ไม่ได้รวมไฟล์ภาพไบนารี — กรุณาวางไฟล์ภาพจริงลงในโฟลเดอร์ที่คุณเลือก (public/images หรือ src/assets/images) แล้วบอกผม ถ้าต้องการ ผมจะแก้ `data.ts` ให้ import รูปจริงให้เรียบร้อย
