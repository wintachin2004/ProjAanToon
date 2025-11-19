// App.tsx
// คอมโพเนนต์หลักของแอป: จัดการสถานะระดับบน การกรอง และการเลือกการ์ตูน
// - เก็บข้อมูลการ์ตูนและสถานะการค้นหา
// - เลือกระหว่างมุมมองรายการ (list) กับมุมมองรายละเอียด (detail)
// - ส่งฟังก์ชันจัดการ (เช่น การเพิ่มคอมเมนต์) ลงสู่คอมโพเนนต์ลูก
import React, { useState, useMemo, useContext } from 'react';
import Navbar from './components/Navbar';
import Admin from './components/Admin';
import ComicList from './components/ComicList';
import ComicDetailSection from './components/ComicDetailSection';
import type { Comic, Comment, Episode } from './types/types';
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
  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  // Auth context ให้ข้อมูลผู้ใช้ปัจจุบัน (ใช้แนบชื่อผู้โพสต์คอมเมนต์)
  const authContext = useContext(AuthContext);


  const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const comics = [
    { id: 1, title: "Naruto", category: "Action" },
    { id: 2, title: "OnePiece", category: "Action" },
    { id: 3, title: "Hunter X Hunter", category: "Fantasy" },
    { id: 4, title: "The Fragrant Flower", category: "Romance" },
    { id: 5, title: "MyHero Academia", category: "Action" },
    { id: 6, title: "Attack on Titan", category: "Action" },
    { id: 7, title: "Jujutsu Kaisen", category: "Action" },
    { id: 8, title: "Dragon Ball", category: "Comedy" },
  ];

  const filteredComics = comics.filter((comic) => {
    const matchSearch = comic.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory ? comic.category === selectedCategory : true;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      <Navbar
        onSearch={(q) => setSearchQuery(q)}
        onCategorySelect={(cat) => setSelectedCategory(cat)}
      />

      <div className="pt-20">
        <ComicList comics={filteredComics} />
      </div>
    </div>
  );
};

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
    const usernameForComment = authContext?.user?.username || 'ผู้ใช้งาน';

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

  // --- Admin CRUD handlers ---
  const handleAddComic = (comicData: Omit<Comic, 'id' | 'episodes'> & { episodes?: Episode[] }) => {
    const newComic: Comic = {
      id: String(Date.now()),
      title: comicData.title,
      description: comicData.description,
      imageUrl: comicData.imageUrl,
      episodes: comicData.episodes || [],
    };
    setComics((prev) => [newComic, ...prev]);
  };

  const handleUpdateComic = (updated: Comic) => {
    setComics((prev) => prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c)));
    if (selectedComic && selectedComic.id === updated.id) setSelectedComic(updated);
  };

  const handleDeleteComic = (id: string) => {
    setComics((prev) => prev.filter((c) => c.id !== id));
    if (selectedComic && selectedComic.id === id) setSelectedComic(null);
  };

  const handleAddEpisode = (comicId: string, episode: Episode) => {
    setComics((prev) =>
      prev.map((c) => {
        if (c.id !== comicId) return c;
        const exists = c.episodes.some((e) => e.number === episode.number);
        const newEpisodes = exists ? c.episodes.map((e) => (e.number === episode.number ? episode : e)) : [...c.episodes, episode];
        newEpisodes.sort((a, b) => a.number - b.number);
        return { ...c, episodes: newEpisodes };
      })
    );
    if (selectedComic && selectedComic.id === comicId) {
      setSelectedComic((prev) => {
        if (!prev) return prev;
        const exists = prev.episodes.some((e) => e.number === episode.number);
        const newEpisodes = exists ? prev.episodes.map((e) => (e.number === episode.number ? episode : e)) : [...prev.episodes, episode];
        newEpisodes.sort((a, b) => a.number - b.number);
        return { ...prev, episodes: newEpisodes };
      });
    }
  };

  const handleDeleteEpisode = (comicId: string, episodeNumber: number) => {
    setComics((prev) =>
      prev.map((c) => {
        if (c.id !== comicId) return c;
        return { ...c, episodes: c.episodes.filter((e) => e.number !== episodeNumber) };
      })
    );
    if (selectedComic && selectedComic.id === comicId) {
      setSelectedComic((prev) => {
        if (!prev) return prev;
        return { ...prev, episodes: prev.episodes.filter((e) => e.number !== episodeNumber) };
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar
        onSearch={setSearchQuery}
        onHomeClick={() => setSelectedComic(null)}
        onAdminClick={() => setShowAdmin(true)}
      />

      {showAdmin && (
        <Admin
          comics={comics}
          onAddComic={handleAddComic}
          onUpdateComic={handleUpdateComic}
          onDeleteComic={handleDeleteComic}
          onAddEpisode={handleAddEpisode}
          onUpdateEpisode={() => {}}
          onDeleteEpisode={handleDeleteEpisode}
          onClose={() => setShowAdmin(false)}
        />
      )}
      
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