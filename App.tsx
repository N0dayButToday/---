
import React, { useState, useCallback } from 'react';
import { SetupPhase } from './components/SetupPhase';
import { LobbyPhase } from './components/LobbyPhase';
import { RankingPhase } from './components/RankingPhase';
import { RevealPhase } from './components/RevealPhase';
import { AppPhase, Item, Participant } from './types';
import { Trophy, Users, Settings2, Eye } from 'lucide-react';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('setup');
  const [items, setItems] = useState<Item[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const handleStartLobby = (newItems: string[]) => {
    const formattedItems = newItems.map((content, idx) => ({
      id: `item-${idx}`,
      content
    }));
    setItems(formattedItems);
    setPhase('lobby');
  };

  const handleAddParticipant = (name: string, rankings: string[]) => {
    const newParticipant: Participant = {
      id: `p-${Date.now()}`,
      name,
      rankings
    };
    setParticipants(prev => [...prev, newParticipant]);
    setPhase('lobby');
  };

  const resetApp = () => {
    if (window.confirm('정말 초기화하시겠습니까? 모든 데이터가 삭제됩니다.')) {
      setItems([]);
      setParticipants([]);
      setPhase('setup');
    }
  };

  return (
    <div className="min-h-screen text-slate-900 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-end gap-2 pb-1">
            <img
              src="/images/rent@2x-8.png"
              alt="RENT"
              className="h-12 w-auto object-contain"
            />

            <h1 className="text-4xl font-['Special_Elite'] tracking-tight leading-none text-zinc-800 antialiased rent-typewriter">
              NUMBER 
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-500 text-sm font-medium bg-slate-100 px-3 py-1 rounded-full">
              <Users size={16} />
              <span>{participants.length}명 참여중</span>
            </div>
            <button 
              onClick={resetApp}
              className="text-slate-400 hover:text-red-500 transition-colors"
              title="초기화"
            >
              <Settings2 size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {phase === 'setup' && (
          <SetupPhase onComplete={handleStartLobby} />
        )}
        
        {phase === 'lobby' && (
          <LobbyPhase 
            participants={participants} 
            onJoin={() => setPhase('ranking')}
            onReveal={() => setPhase('reveal')}
            canReveal={participants.length > 0}
          />
        )}

        {phase === 'ranking' && (
          <RankingPhase 
            items={items} 
            onCancel={() => setPhase('lobby')}
            onSubmit={handleAddParticipant} 
          />
        )}

        {phase === 'reveal' && (
          <RevealPhase 
            items={items} 
            participants={participants} 
            onBack={() => setPhase('lobby')}
          />
        )}
      </main>
    </div>
  );
};

export default App;
