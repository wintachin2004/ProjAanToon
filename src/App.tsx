// App.tsx
// คอมโพเนนต์หลักของแอป: จัดการสถานะระดับบน การกรอง และการเลือกการ์ตูน
// - เก็บข้อมูลการ์ตูนและสถานะการค้นหา
// - เลือกระหว่างมุมมองรายการ (list) กับมุมมองรายละเอียด (detail)
// - ส่งฟังก์ชันจัดการ (เช่น การเพิ่มคอมเมนต์) ลงสู่คอมโพเนนต์ลูก
import React, { useState, useMemo, useContext } from 'react';
import Navbar from './components/Navbar';
import ComicList from './components/ComicList';
import ComicDetailSection from './components/ComicDetailSection';
import type {Comic, Comment } from './types/types';
import { initialComicsData } from './data/data';
import { AuthContext } from './context/AuthContext';

const App: React.FC = () => {
  // สถานะ UI ภายในคอมโพเนนต์
  // `comics` เก็บรายการการ์ตูนในหน่วยความจำ (มาจาก `initialComicsData`)
  const [comics, setComics] = useState<Comic[]>(initialComicsData);
  // `searchQuery` เก็บข้อความค้นหาที่ผู้ใช้พิมพ์
  const [searchQuery, setSearchQuery] = useState<string>('');
  // `selectedComic` คือการ์ตูนที่กำลังเปิดดูอยู่; ถ้าเป็น null จะแสดงมุมมองรายการ
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  // Auth context ให้ข้อมูลผู้ใช้ปัจจุบัน (ใช้แนบชื่อผู้โพสต์คอมเมนต์)
  const authContext = useContext(AuthContext);

  // กรองรายการการ์ตูนตามคำค้นหา (ไม่สนใจตัวพิมพ์)
  const filteredComics = useMemo(() => {
    if (!searchQuery.trim()) return comics;
    return comics.filter((comic) =>
      comic.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [comics, searchQuery]);

  // ฟังก์ชันเพิ่มคอมเมนต์ให้กับตอนของการ์ตูน
  // จะอัปเดตทั้งสถานะ `comics` หลัก และ `selectedComic` (ถ้ากำลังดูหน้ารายละเอียด)
  // เพื่อให้หน้า UI แสดงคอมเมนต์ใหม่ทันที
  const handleAddComment = (comicId: string, episodeNumber: number, text: string) => {
    // เลือกชื่อผู้โพสต์คอมเมนต์: ถ้ามีผู้ใช้ล็อกอินให้ใช้ชื่อนั้น มิฉะนั้นใช้ข้อความทั่วไป
    const usernameForComment = authContext?.currentUser?.username || 'ผู้ใช้งาน';

    // อัปเดตรายการการ์ตูนหลักแบบไม่แก้ไขตัวเดิม (immutable)
    setComics((prevComics) =>
      prevComics.map((comic) => {
        if (comic.id === comicId) {
          return {
            ...comic,
            episodes: comic.episodes.map((episode) => {
              if (episode.number === episodeNumber) {
                const newComment: Comment = {
                  id: String(Date.now()),
                  author: usernameForComment,
                  text: text,
                  date: new Date().toLocaleString('th-TH'),
                };
                return {
                  ...episode,
                  comments: [...(episode.comments || []), newComment],
                };
              }
              return episode;
            }),
          };
        }
        return comic;
      })
    );

    // ถ้าการ์ตูนที่เปิดดูตรงกับที่แก้ไข ให้ปรับ `selectedComic` ด้วย
    if (selectedComic && selectedComic.id === comicId) {
      const usernameForComment2 = usernameForComment;
      setSelectedComic((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          episodes: prev.episodes.map((episode) => {
            if (episode.number === episodeNumber) {
              const newComment: Comment = {
                id: String(Date.now()),
                author: usernameForComment2,
                text: text,
                date: new Date().toLocaleString('th-TH'),
              };
              return {
                ...episode,
                comments: [...(episode.comments || []), newComment],
              };
            }
            return episode;
          }),
        };
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar onSearch={setSearchQuery} />
      
      {selectedComic ? (
        <ComicDetailSection
          comic={selectedComic}
          onBack={() => setSelectedComic(null)}
          onAddComment={handleAddComment}
        />
      ) : (
        <div className="pt-20 pb-10">
          <ComicList
            comics={filteredComics}
            searchQuery={searchQuery}
            onSelectComic={setSelectedComic}
          />
        </div>
      )}
    </div>
  );
};

export default App;