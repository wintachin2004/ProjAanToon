// ComicDetailSection.tsx
// คอมโพเนนต์แสดงรายละเอียดของการ์ตูนหนึ่งเรื่อง: คำอธิบาย, ตัวเลือกตอน,
// รูปของตอน, รายการคอมเมนต์ และพื้นที่ป้อนคอมเมนต์
// Props:
// - comic: วัตถุ Comic ที่จะแสดง
// - onBack: callback สำหรับกลับไปหน้ารายการ
// - onAddComment: ฟังก์ชันสำหรับเพิ่มคอมเมนต์ (ถูกส่งมาจาก App)
import React, { useState } from 'react';
import type { Comic, Episode } from '../types/types';


interface ComicDetailProps {
  comic: Comic;
  onBack: () => void;
  onAddComment: (comicId: string, episodeNumber: number, text: string) => void;
}

const ComicDetailSection: React.FC<ComicDetailProps> = ({ comic, onBack, onAddComment }) => {
  // selectedEpisode: ตอนที่ผู้ใช้กำลังดูในหน้ารายละเอียด
  const [selectedEpisode, setSelectedEpisode] = useState<Episode>(comic.episodes[0]);
  // newCommentText: ค่าควบคุมของ textarea สำหรับใส่คอมเมนต์
  const [newCommentText, setNewCommentText] = useState('');

  // หากโหลดรูปของตอนล้มเหลว ให้ใช้รูปปกการ์ตูนหรือ placeholder แทน
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = comic.imageUrl || 'https://placehold.co/800x450/94A3B8/FFFFFF?text=No+Image';
  };

  // ส่งคอมเมนต์ใหม่ให้พาเรนต์จัดการ และคืนค่า textarea เป็นค่าว่าง
  const handleSubmit = () => {
    if (newCommentText.trim()) {
      onAddComment(comic.id, selectedEpisode.number, newCommentText);
      setNewCommentText('');
    }
  };

  // กด Enter เพื่อส่ง (รองรับ Shift+Enter สำหรับขึ้นบรรทัดใหม่)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 top-20 bg-white overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={onBack}
          className="bg-white text-black hover:bg-gray-100 mb-4 font-medium border border-gray-200 py-1 px-3 rounded"
        >
          ← กลับสู่หน้าหลัก
        </button>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{comic.title}</h2>
        <p className="mb-4 text-gray-600">{comic.description}</p>

        {/* Episode PDF or Images */}
        <div className="mb-6">
          {/* Show image first if available */}
          {selectedEpisode.imageUrl && (
            <div className="mb-4">
              <img
                src={selectedEpisode.imageUrl}
                alt={`${comic.title} - ${selectedEpisode.title}`}
                onError={handleImageError}
                className="w-full max-h-96 object-cover rounded-lg shadow-sm"
              />
            </div>
          )}

          {/* Then show PDF or additional images */}
          {selectedEpisode.pdfUrl ? (
            <div className="w-full bg-gray-100 rounded-lg shadow-sm p-4">
              <p className="mb-3 text-gray-700 font-semibold"> PDF</p>
              <iframe
                src={selectedEpisode.pdfUrl}
                width="100%"
                height="600px"
                style={{ border: 'none', borderRadius: '8px' }}
              ></iframe>
              <a
                href={selectedEpisode.pdfUrl}
                download
                className="mt-3 inline-block py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                ดาวน์โหลด PDF
              </a>
            </div>
          ) : selectedEpisode.imageUrls && selectedEpisode.imageUrls.length > 0 ? (
            <div className="flex flex-col gap-4">
              {selectedEpisode.imageUrls.map((imageUrl, index) => (
                <div key={index} className="w-full">
                  <img
                    src={imageUrl}
                    alt={`${comic.title} - ${selectedEpisode.title} - ภาพที่ ${index + 1}`}
                    onError={handleImageError}
                    className="w-full h-auto object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* ส่วนเลือกตอน */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">เลือกตอน</h3>
          <select
            onChange={(e) => {
              const epNum = parseInt(e.target.value);
              const ep = comic.episodes.find((e) => e.number === epNum);
              if (ep) setSelectedEpisode(ep);
            }}
            className="p-2 border rounded-lg w-full md:w-1/2 bg-white text-black"
            value={selectedEpisode.number}
          >
            {comic.episodes.map((ep) => (
              <option key={ep.number} value={ep.number} className="bg-white text-black">
                {ep.title}
              </option>
            ))}
          </select>
          <p className="text-lg mt-2 font-medium text-black">{selectedEpisode.title}</p>
        </div>

        {/* ส่วนแสดงคอมเมนต์ */}
        <h3 className="text-xl font-semibold mb-3 border-t pt-4">
          ความคิดเห็น ({(selectedEpisode.comments?.length) || 0})
        </h3>
        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto p-2 border rounded-lg bg-gray-50">
          {(selectedEpisode.comments?.length || 0) > 0 ? (
            selectedEpisode.comments?.map((comment) => (
              <div key={comment.id} className="bg-white p-3 rounded-lg shadow-sm">
                <div className="font-semibold text-gray-800">@{comment.author}</div>
                <p className="text-gray-700">{comment.text}</p>
                <span className="text-xs text-gray-400 mt-1 block">{comment.date}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">ยังไม่มีความคิดเห็นในตอนนี้</p>
          )}
        </div>

        {/* ส่วนเพิ่มคอมเมนต์ */}
        <div className="mt-4 pt-4 border-t">
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
            rows={3}
            className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 mb-3"
          />
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            ส่งความคิดเห็น
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComicDetailSection;