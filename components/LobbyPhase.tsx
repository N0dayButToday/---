
import React from 'react';
import { UserPlus, Eye, Users } from 'lucide-react';
import { Participant } from '../types';

interface LobbyPhaseProps {
  participants: Participant[];
  onJoin: () => void;
  onReveal: () => void;
  canReveal: boolean;
}

export const LobbyPhase: React.FC<LobbyPhaseProps> = ({ participants, onJoin, onReveal, canReveal }) => {
  return (
    <div className="grid gap-6 w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="noline p-6 rounded-sm border-2 border-zinc-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-zinc-800/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-700 text-white rounded-lg shadow-sm">
              <Users size={24} />
            </div>
            <h2 className="text-2xl rent-typewriter text-slate-800">RENT HEADS</h2>
          </div>
          <span className="bg-emerald-700 text-white px-3 py-1 rounded-full text-sm font-bold">
            {participants.length}명 투표 완료
          </span>
        </div>

        <div className="p-6 min-h-[200px]">
          {participants.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 py-10">
              <p className="text-2xl rent-typewriter mb-1">empty</p>
              <p className="text-sm">첫 번째 투표자가 되어보세요!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {participants.map((p) => (
                <div 
                  key={p.id}
                  className="flex items-center gap-3 p-3 bg-slate/60 backdrop-blur-sm rounded-lg border border-zinc-700 animate-in zoom-in-95 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-white font-bold text-xs uppercase">
                    {p.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-slate-700 truncate">{p.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

   <div className="grid sm:grid-cols-2 gap-6">
      
      {/* RANK 버튼 */}
      <button
        onClick={onJoin}
        // 기본은 검정 테두리 -> 마우스 올리면 초록색 테두리 & 아이콘
        className="group flex flex-col items-center justify-center gap-4 p-8 noline border-2 border-zinc-800 rounded-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] hover:border-emerald-700 transition-all"
      >
        {/* 아이콘 원: 평소 검정 -> 호버 시 초록 */}
        <div className="p-4 bg-zinc-900 rounded-full text-white group-hover:bg-emerald-700 transition-colors">
          <UserPlus size={32} />
        </div>
        <div className="text-center">
          <h3 className="text-2xl rent-typewriter text-zinc-900 font-bold mb-1 group-hover:text-emerald-700 transition-colors">RANK</h3>
          <p className="text-zinc-600 text-sm font-medium">나만의 넘버 순위를 정해주세요</p>
        </div>
      </button>

      {/* REVEAL 버튼 */}
      <button
        onClick={onReveal}
        disabled={!canReveal}
        className={`group flex flex-col items-center justify-center gap-4 p-8 rounded-sm border-2 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] ${
          canReveal 
            // 활성 상태: noline 배경, 호버 시 초록색 강조
            ? 'noline border-zinc-800 cursor-pointer hover:border-emerald-700 hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)]' 
            // 비활성 상태: 어두운 회색 (잠김)
            : 'bg-zinc-800/80 border-zinc-900 cursor-not-allowed opacity-80'
        }`}
      >
        <div className={`p-4 rounded-full transition-colors ${
          canReveal ? 'bg-zinc-900 text-white group-hover:bg-emerald-700' : 'bg-zinc-700 text-zinc-500'
        }`}>
          <Eye size={32} />
        </div>
        <div className="text-center">
          <h3 className={`text-2xl rent-typewriter font-bold mb-1 ${canReveal ? 'text-zinc-900 group-hover:text-emerald-700' : 'text-zinc-500'}`}>REVEAL</h3>
          <p className={`text-sm font-medium ${canReveal ? 'text-zinc-600' : 'text-zinc-500'}`}>
            모든 렌트헤즈의 순위를 공개합니다
          </p>
        </div>
      </button>
      
    </div>
    </div>
  );
};
