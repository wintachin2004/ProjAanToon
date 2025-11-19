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
    <div className="min-h-[calc(100vh-5rem)] pt-6 pb-6 w-full bg-gray-50">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        {/* Title or search-summary could go here */}
      </h1>

      <div className="flex-1 flex flex-col px-4">
        <div className="flex-1">
          {comics.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {comics.map((comic: Comic) => (
                <ComicCard
                  key={comic.id}
                  imageUrl={comic.imageUrl || ''}
                  title={comic.title}
                  description={comic.description}
                  onClick={() => onSelectComic(comic)}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-96">
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