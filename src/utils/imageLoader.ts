// ใช้ glob pattern แบบ static แทน
export function loadImagesFromFolder() {
  const modules = import.meta.glob('../assets/images/*.{jpg,jpeg,png}', { eager: true });
  
  const images: Record<string, string> = {};
  
  Object.keys(modules).forEach((path) => {
    // แยกชื่อไฟล์จาก path เช่น '../assets/images/image1.jpg' -> 'image1'
    const fileName = path.split('/').pop()?.replace(/\.\w+$/, '') || '';
    const module = modules[path] as { default: string };
    images[fileName] = module.default;
  });
  
  return images;
}

// helper สำหรับ lookup รูปภาพ
export function getImage(name: string, images: Record<string, string>) {
  return images[name] || images[`${name}.jpg`] || images[`${name}.jpeg`] || images[`${name}.png`];
}