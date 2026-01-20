import React, { useState, useRef } from 'react';
import { Item } from '../types';
import { Check, User, GripVertical, ChevronsUp, ArrowLeft } from 'lucide-react';

interface RankingPhaseProps {
  items: Item[];
  onSubmit: (name: string, rankings: string[]) => void;
  onCancel: () => void;
}

export const RankingPhase: React.FC<RankingPhaseProps> = ({ items, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [sortedItems, setSortedItems] = useState<Item[]>(items);
  
  // 드래그 앤 드롭을 위한 Ref
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // 1. 드래그 시작
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragItem.current = position;
    e.currentTarget.classList.add('opacity-50'); // 드래그 중인 녀석 흐리게
  };

  // 2. 드래그 중 (자리 바꾸기 미리보기)
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    e.preventDefault(); // 필수!
    if (dragItem.current === null) return;
    
    // 원래 위치와 새 위치가 다르면 순서 변경
    if (dragItem.current !== position) {
      const newItems = [...sortedItems];
      const draggedItemContent = newItems[dragItem.current];
      
      newItems.splice(dragItem.current, 1); // 원래 자리에서 빼고
      newItems.splice(position, 0, draggedItemContent); // 새 자리에 넣음
      
      dragItem.current = position; // 현재 위치 업데이트
      setSortedItems(newItems);
    }
  };

  // 3. 드래그 끝
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50');
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // 🚀 퀵 액션: 맨 위로 보내기
  const moveToTop = (index: number) => {
    if (index === 0) return;
    const newItems = [...sortedItems];
    const [targetItem] = newItems.splice(index, 1);
    newItems.unshift(targetItem);
    setSortedItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && sortedItems.length > 0) {
      onSubmit(name.trim(), sortedItems.map(i => i.id));
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 상단 네비게이션 */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onCancel}
          className="flex items-center gap-2 text-zinc-500 hover:text-red-700 transition-colors rent-typewriter"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <div className="noline p-8 rounded-sm border-2 border-zinc-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] bg-[#e9e6e6]">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. 이름 입력 섹션 */}
          <div>
            <label className="block text-xl rent-typewriter font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <span className="p-1 bg-amber-500 text-zinc-900 rounded">
                <User size={18} />
              </span>
              YOUR NAME
            </label>
            <input
              autoFocus
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full px-4 py-3 bg-white/50 border-2 border-zinc-800 rounded text-lg focus:bg-white focus:border-amber-500 outline-none transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* 2. 랭킹 리스트 섹션 */}
          <div>
            <div className="flex items-end justify-between mb-4 border-b-2 border-zinc-800/20 pb-2">
              <label className="text-xl rent-typewriter font-bold text-zinc-900">
                RANKING LIST
              </label>
              <span className="text-xs text-zinc-500">
                * 드래그 하기
              </span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {sortedItems.map((item, idx) => (
                <div 
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragEnter={(e) => handleDragEnter(e, idx)}
                  onDragEnd={handleDragEnd}
                  className={`
                    group relative flex items-center gap-3 p-3 rounded border-2 border-zinc-800 
                    bg-white cursor-grab active:cursor-grabbing hover:border-amber-500 transition-all
                    ${idx === 0 ? 'bg-amber-50 border-amber-500 z-10' : ''} /* 1등 강조 */
                  `}
                >
                  {/* 드래그 핸들 */}
                  <div className="text-zinc-300 group-hover:text-zinc-500">
                    <GripVertical size={20} />
                  </div>

                  {/* 순위 표시 */}
                  <div className={`
                    w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg border-2
                    ${idx === 0 
                      ? 'bg-amber-300 border-amber-500 text-white' 
                      : 'bg-zinc-100 border-zinc-300 text-zinc-400 group-hover:border-zinc-800 group-hover:text-zinc-800'}
                  `}>
                    {idx + 1}
                  </div>
                  
                  {/* 노래 제목 */}
                  <span className={`flex-1 font-bold text-lg rent-typewriter truncate ${idx === 0 ? 'text-amber-500' : 'text-zinc-900'}`}>
                    {item.content}
                  </span>

                  {/* 🚀 퀵 버튼: 맨 위로 보내기 (1등이 아닐 때만 보임) */}
                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => moveToTop(idx)}
                      title="Move to Top"
                      className="p-2 text-zinc-300 hover:text-amber-500 hover:bg-amber-50 rounded transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronsUp size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3. 제출 버튼 */}
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-4 bg-zinc-900 text-white text-xl rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:bg-amber-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed rent-typewriter border-2 border-transparent hover:border-black"
          >
            <Check size={24} />
            <span>SUBMIT RANKING</span>
          </button>
        </form>
      </div>
    </div>
  );
};