// ComicList.tsx
// แสดงรายการการ์ตูนเป็นกริดแบบตอบสนอง โดยใช้คอมโพเนนต์ `ComicCard`
// Props:
// - comics: อาร์เรย์ข้อมูลการ์ตูนที่จะแสดง
// - searchQuery: คำค้นปัจจุบัน (ใช้แสดงข้อความเมื่อไม่พบผล)
// - onSelectComic: callback เมื่อผู้ใช้เลือกการ์ตูน
import React from 'react';
import ComicCard from './ComicCard';
import type { Comic } from '../types/types';

interface ComicListProps {
  comics: Comic[];
  searchQuery: string;
  onSelectComic: (comic: Comic) => void;
}

const ComicList: React.FC<ComicListProps> = ({ comics, searchQuery, onSelectComic }) => {
  return (
    <div className="min-h-[calc(100vh-5rem)] pt-6 pb-6 w-full">
      {/* Optional heading area (currently empty) */}
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        {/* Title or search-summary could go here */}
      </h1>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-wrap justify-center items-start p-4">
          {comics.length > 0 ? (
            comics.map((comic: Comic) => (
              <ComicCard
                key={comic.id}
                imageUrl={comic.imageUrl || ''}
                title={comic.title}
                description={comic.description}
                onClick={() => onSelectComic(comic)}
              />
            ))
          ) : (
            <div className="flex-1 flex items-center justify-center w-full">
              <div className="text-center text-gray-500 text-lg">
                ไม่พบการ์ตูนที่ตรงกับคำค้นหา "{searchQuery}"
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComicList;