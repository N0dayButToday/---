
import React, { useState } from 'react';
import { Plus, X, ListOrdered, ArrowRight } from 'lucide-react';

interface SetupPhaseProps {
  onComplete: (items: string[]) => void;
}

export const SetupPhase: React.FC<SetupPhaseProps> = ({ onComplete }) => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const addItem = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !items.includes(trimmed)) {
      setItems([...items, trimmed]);
      setInputValue('');
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addItem();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-[#e9e6e6] text-zinc-900
    rounded-sm border-zinc-800 ruled-paper
    shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] animate-in fade-in slide-in-from-bottom-4 duration-500
    rent-paper">
      <div className="mb-6">
          <h2 className="text-3xl rent-typewriter mb-2 text-black">Number List</h2>
          <p className="text-zinc-600 text-sm">넘버를 입력해주세요 (최소 2개)</p>
    </div>

      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Seasons of Love..."
          className="flex-1 bg-zinc-900 border-zinc-600 text-white placeholder:text-zinc-500 rounded-lg px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-600 transition-all rent-typewriter"
          onKeyDown={(e) => {if (e.key === 'Enter') {addItem();}}}
        />
        <button
          onClick={addItem}
          className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 rent-typewriter"
        >
          <Plus size={20} />
          <span>Add</span>
        </button>
      </div>

      <div className="space-y-3 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {items.length === 0 ? (
          <div className="py-12 border-2 border-dashed border-zinc-700 rounded-xl flex flex-col items-center justify-center text-zinc-500">
            <p className="text-xl rent-typewriter">empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 p-2">
          {items.map((item, idx) => (
            <div 
              key={idx}  
              className="group flex items-center justify-between p-3 border-2 border-zinc-800 rounded-lg backdrop-blur-sm hover:bg-zinc-900/5 transition-all rent-typewriter
              odd:-rotate-1 even:rotate-1 hover:rotate-0 transition-transform duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-red-700 min-w-[20px]">
                  #{idx + 1}
                </span>
                <span className="text-lg font-medium text-zinc-900 break-words">
                  {item}
                </span>  
              </div>

              <button
                onClick={() => removeItem(idx)}
                className="p-1 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
              >
                <X size={18} />
              </button>
            </div>
          ))}
      </div>
    )}
  </div>  

      <button
        onClick={() => onComplete(items)}
        disabled={items.length < 2}
        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
          items.length >= 2
            ? 'bg-slate-600 text-white hover:bg-red-700 shadow-lg shadow-indigo-100'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
      >
        <span>투표 시작하기</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
};
