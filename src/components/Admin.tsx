import React, { useState } from 'react';
import type { Comic, Episode } from '../types/types';

interface AdminProps {
  comics: Comic[];
  onAddComic: (comic: Omit<Comic, 'id' | 'episodes'> & { episodes?: Episode[] }) => void;
  onUpdateComic: (comic: Comic) => void;
  onDeleteComic: (id: string) => void;
  onAddEpisode: (comicId: string, episode: Episode) => void;
  onUpdateEpisode: (comicId: string, episode: Episode) => void;
  onDeleteEpisode: (comicId: string, episodeNumber: number) => void;
  onClose: () => void;
}

const emptyComicForm = { title: '', description: '', imageUrl: '' };

const Admin: React.FC<AdminProps> = ({ comics, onAddComic, onUpdateComic, onDeleteComic, onAddEpisode, onUpdateEpisode, onDeleteEpisode, onClose }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<{ title: string; description: string; imageUrl: string }>(emptyComicForm);
  const [editing, setEditing] = useState<boolean>(false);
  const [episodeForm, setEpisodeForm] = useState<Partial<Episode>>({ number: 1, title: '', content: '', imageUrl: '' });

  const selectComic = (c?: Comic) => {
    if (!c) {
      setSelectedId(null);
      setForm(emptyComicForm);
      setEditing(false);
      return;
    }
    setSelectedId(c.id);
    setForm({ title: c.title, description: c.description, imageUrl: c.imageUrl || '' });
    setEditing(true);
  };

  const handleAddOrUpdate = () => {
    if (editing && selectedId) {
      onUpdateComic({ id: selectedId, title: form.title, description: form.description, imageUrl: form.imageUrl || undefined, episodes: comics.find(c => c.id === selectedId)?.episodes || [] });
    } else {
      onAddComic({ title: form.title, description: form.description, imageUrl: form.imageUrl || undefined, episodes: [] });
      setForm(emptyComicForm);
    }
  };

  const handleAddEpisode = () => {
    if (!selectedId) return;
    const ep: Episode = {
      number: episodeForm.number || (comics.find(c => c.id === selectedId)?.episodes.length || 0) + 1,
      title: episodeForm.title || `ตอนที่ ${(episodeForm.number || 1)}`,
      content: episodeForm.content || '',
      imageUrl: episodeForm.imageUrl,
    };
    onAddEpisode(selectedId, ep);
    setEpisodeForm({ number: (ep.number + 1), title: '', content: '', imageUrl: '' });
  };
  

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 overflow-y-auto pt-safe pb-safe flex items-start justify-center py-10">
      <div className="w-full flex justify-center items-start mt-10 mb-10 px-3">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200"
          >
            ปิด
          </button>

          <h2 className="text-2xl font-semibold mb-4">Edits</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">รายการการ์ตูน</h3>
                <button
                  onClick={() => selectComic()}
                  className="text-sm bg-indigo-600 text-white px-2 py-1 rounded"
                >
                  สร้างใหม่
                </button>
              </div>

              <div className="space-y-2 max-h-[55vh] overflow-y-auto">
                {comics.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-3">
                      <img src={c.imageUrl} alt={c.title} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <div className="font-medium">{c.title}</div>
                        <div className="text-xs text-gray-500">{c.episodes?.length || 0} ตอน</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => selectComic(c)} className="text-sm px-2 py-1 bg-yellow-100 rounded">แก้ไข</button>
                      <button onClick={() => onDeleteComic(c.id)} className="text-sm px-2 py-1 bg-red-100 rounded">ลบ</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-medium mb-2">{editing ? 'แก้ไขการ์ตูน' : 'สร้างการ์ตูนใหม่'}</h3>
              <div className="space-y-3 mb-4">
                <input className="w-full p-2 border rounded" placeholder="ชื่อเรื่อง" value={form.title} onChange={(e) => setForm(s => ({ ...s, title: e.target.value }))} />
                <input className="w-full p-2 border rounded" placeholder="URL รูปปก (imageUrl)" value={form.imageUrl} onChange={(e) => setForm(s => ({ ...s, imageUrl: e.target.value }))} />
                <textarea className="w-full p-2 border rounded" placeholder="คำอธิบาย" rows={3} value={form.description} onChange={(e) => setForm(s => ({ ...s, description: e.target.value }))} />
                <div className="flex gap-2">
                  <button onClick={handleAddOrUpdate} className="px-4 py-2 bg-indigo-600 text-white rounded">{editing ? 'บันทึก' : 'สร้าง'}</button>
                  {editing && <button onClick={() => { selectComic(); setEditing(false); }} className="px-4 py-2 bg-gray-100 rounded">ยกเลิก</button>}
                </div>
              </div>

              {editing && selectedId && (
                <div>
                  <h4 className="font-medium mb-2">จัดการตอน</h4>
                  <div className="mb-3 space-y-2">
                    <div className="flex gap-2">
                      <input type="number" className="p-2 border rounded w-24" placeholder="เลขตอน" value={episodeForm.number ?? ''} onChange={(e) => setEpisodeForm(s => ({ ...s, number: Number(e.target.value) }))} />
                      <input className="p-2 border rounded flex-1" placeholder="ชื่อบท" value={episodeForm.title ?? ''} onChange={(e) => setEpisodeForm(s => ({ ...s, title: e.target.value }))} />
                    </div>
                    <input className="w-full p-2 border rounded" placeholder="URL รูปของตอน" value={episodeForm.imageUrl ?? ''} onChange={(e) => setEpisodeForm(s => ({ ...s, imageUrl: e.target.value }))} />
                    <textarea className="w-full p-2 border rounded" placeholder="เนื้อหา" rows={2} value={episodeForm.content ?? ''} onChange={(e) => setEpisodeForm(s => ({ ...s, content: e.target.value }))} />
                    <div className="flex gap-2">
                      <button onClick={handleAddEpisode} className="px-3 py-1 bg-green-600 text-white rounded">เพิ่มตอน</button>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                    {(comics.find(c => c.id === selectedId)?.episodes || []).map((ep) => (
                      <div key={ep.number} className="p-2 border rounded flex items-start justify-between">
                        <div>
                          <div className="font-medium">{ep.title} (ตอน {ep.number})</div>
                          <div className="text-sm text-gray-600">{ep.content?.slice(0,120)}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button onClick={() => onDeleteEpisode(selectedId, ep.number)} className="px-2 py-1 bg-red-100 rounded text-sm">ลบ</button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
