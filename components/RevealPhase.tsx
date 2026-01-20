import React, { useState } from 'react';
import { Item, Participant } from '../types';
import { ChevronLeft, ChevronRight, MapPin, Eye, Lock, Music } from 'lucide-react';

interface RevealPhaseProps {
  items: Item[];
  participants: Participant[];
  onBack: () => void;
}

export const RevealPhase: React.FC<RevealPhaseProps> = ({ items, participants, onBack }) => {
  // 한 화면에 보여줄 순위 박스 개수 (4개)
  const RANKS_PER_PAGE = 4;
  
  const totalRanks = items.length; 
  const totalPages = Math.ceil(totalRanks / RANKS_PER_PAGE);

  const [currentPage, setCurrentPage] = useState(0);
  const [revealedRanks, setRevealedRanks] = useState<Set<number>>(new Set());

  const startRankIndex = currentPage * RANKS_PER_PAGE;

  const getItemContent = (id: string) => items.find(i => i.id === id)?.content || '-';

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  const toggleReveal = (rankIndex: number) => {
    const newRevealed = new Set(revealedRanks);
    if (newRevealed.has(rankIndex)) {
      newRevealed.delete(rankIndex);
    } else {
      newRevealed.add(rankIndex);
    }
    setRevealedRanks(newRevealed);
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. 상단 컨트롤러 */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-300 hover:text-blue-700 transition-colors rent-typewriter group order-2 md:order-1"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-2 rounded-full border border-zinc-300 shadow-sm order-1 md:order-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="p-2 hover:bg-blue-100 text-zinc-600 hover:text-blue-700 rounded-full disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="text-center min-w-[180px]">
            <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-700 mb-0.5 rent-typewriter">
              RANKING PAGE
            </span>
            <span className="text-lg font-black text-zinc-900">
              {startRankIndex + 1}위 - {Math.min(startRankIndex + RANKS_PER_PAGE, totalRanks)}위
            </span>
          </div>
          
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="p-2 hover:bg-blue-100 text-zinc-600 hover:text-blue-700 rounded-full disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="text-right hidden md:block order-3">
          <h2 className="text-xl font-bold rent-typewriter text-slate-300 flex items-center justify-end gap-2">
            EAST VILL
            <span className="p-1.5 bg-blue-700 text-white rounded shadow-sm">
              <MapPin size={18} />
            </span>
          </h2>
        </div>
      </div>

      {/* 2. 순위별 박스 리스트 (4x1 Vertical Stack) */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: RANKS_PER_PAGE }).map((_, i) => {
          const rankIndex = startRankIndex + i;
          
          if (rankIndex >= totalRanks) return null;

          const isRevealed = revealedRanks.has(rankIndex);
          const isFirstPlace = rankIndex === 0;

          return (
            <div 
              key={rankIndex}
              onClick={() => toggleReveal(rankIndex)}
              className={`
                group relative w-full noline rounded-sm border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] 
                transition-all duration-300 cursor-pointer overflow-hidden
                ${isFirstPlace ? 'border-blue-700' : 'border-zinc-800'}
                ${isRevealed ? 'bg-[#e9e6e6]' : 'hover:translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]'}
              `}
            >
              {/* 박스 헤더 (Rank Title) */}
              <div className={`
                px-6 py-3 border-b-2 flex items-center justify-between
                ${isFirstPlace ? 'bg-blue-50 border-blue-200' : 'bg-white/40 border-zinc-800/10'}
              `}>
                <div className="flex items-center gap-4">
                  <span className={`
                    w-8 h-8 flex items-center justify-center font-black text-lg border-2 rent-typewriter rounded-full shadow-sm
                    ${isFirstPlace ? 'bg-blue-700 border-blue-700 text-white' : 'bg-white border-zinc-800 text-zinc-900'}
                  `}>
                    {rankIndex + 1}
                  </span>
                  <span className={`font-bold rent-typewriter ${isFirstPlace ? 'text-blue-900' : 'text-zinc-700'}`}>
                    Rank {rankIndex + 1}
                  </span>
                </div>
                
                <div className="text-zinc-400 group-hover:text-blue-700 transition-colors">
                  {isRevealed ? <Eye size={20} /> : <Lock size={20} />}
                </div>
              </div>

              {/* 컨텐츠 영역 */}
              <div className="relative min-h-[100px] bg-white/30">
                
                {/* 1) 비공개 상태 (커버) */}
                {!isRevealed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-100/80 backdrop-blur-sm z-10 group-hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center gap-3 text-zinc-500 group-hover:text-blue-700 transition-colors">
                      <span className="text-2xl animate-bounce">👇</span>
                      <p className="rent-typewriter font-bold text-lg tracking-widest uppercase">
                        Click to Reveal
                      </p>
                    </div>
                  </div>
                )}

                {/* 2) 공개 상태 (가로형 그리드: Columns are Users) */}
                <div className={`p-4 ${!isRevealed ? 'opacity-0' : 'animate-in fade-in duration-500'}`}>
                  {/* 반응형 그리드: 모바일 2열, PC 4열 이상 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {participants.map((p) => {
                      const selectedItemId = p.rankings[rankIndex];
                      return (
                        <div key={p.id} className="flex flex-col gap-2 p-3 bg-white rounded border border-zinc-200 shadow-sm hover:border-blue-300 transition-colors">
                          {/* 유저 이름 (Column Header 느낌) */}
                          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 mb-1">
                            <div className="w-5 h-5 rounded-full bg-zinc-800 text-white flex items-center justify-center text-[10px] font-bold">
                              {p.name.charAt(0)}
                            </div>
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider truncate">
                              {p.name}
                            </span>
                          </div>
                          
                          {/* 선택한 노래 */}
                          <div className="flex items-start gap-2">
                            <Music size={14} className={`mt-0.5 shrink-0 ${isFirstPlace ? 'text-blue-600' : 'text-zinc-400'}`} />
                            <span className={`text-sm rent-typewriter font-bold leading-tight ${isFirstPlace ? 'text-blue-900' : 'text-zinc-800'}`}>
                              {selectedItemId ? getItemContent(selectedItemId) : '-'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {participants.length === 0 && (
                    <p className="text-center text-zinc-400 py-4">참여자가 없습니다</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};