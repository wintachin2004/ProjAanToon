// ComicCard.tsx
// การ์ดเล็กสำหรับแสดงในหน้ารายการ
// - รับ `imageUrl`, `title`, `description` และ `onClick` เป็น props
// - จัดการกรณีรูปโหลดไม่ขึ้นโดยแสดง placeholder แทน
import React from 'react';

interface ComicCardProps {
  imageUrl: string;
  title: string;
  description: string;
  onClick: () => void;
}

const ComicCard: React.FC<ComicCardProps> = ({ imageUrl, title, description, onClick }) => {
  // เปลี่ยนรูปที่โหลดไม่สำเร็จเป็นรูป placeholder
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/400x300/94A3B8/FFFFFF?text=No+Image';
  };

  return (
    <div className="w-full sm:w-[calc(50%-1.5rem)] md:w-80 lg:w-72 bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-[1.02] m-3 flex flex-col">
      <div className="relative pb-[75%] overflow-hidden bg-gray-200">
        <img
          className="absolute h-full w-full object-cover"
          src={imageUrl}
          alt={`ปกเรื่อง ${title}`}
          onError={handleImageError}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {/* ชื่อและคำอธิบายสั้น - คำอธิบายถูกตัดให้พอดีกับการ์ด */}
        <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">{title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{description}</p>

        {/* ปุ่มเปิดหน้ารายละเอียด (การจัดการอยู่ที่ parent) */}
        <button
          onClick={onClick}
          className="mt-auto w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-150"
        >
          อ่านรายละเอียด
        </button>
      </div>
    </div>
  );
};

export default ComicCard;