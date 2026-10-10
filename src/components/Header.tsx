import React from 'react';
import { ScreenId } from '../types';
import { Plus } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  onOpenImportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onSelectScreen,
  onOpenImportModal,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur sticky top-0 z-50">
      {/* Zone 1: Single text element wordmark */}
      <div
        onClick={() => onSelectScreen('html-studio')}
        className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 cursor-pointer hover:text-zinc-200 transition-colors flex items-center gap-2"
      >
        <span className="w-2.5 h-2.5 bg-white rounded-sm inline-block" />
        <span>ScreenCraft Studio</span>
      </div>

      {/* Zone 2: 4-5 concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
        <button
          onClick={() => onSelectScreen('html-studio')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            currentScreen === 'html-studio' ? 'text-white font-semibold' : ''
          }`}
        >
          HTML Canvas
        </button>
        <button
          onClick={() => onSelectScreen('atelier')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            currentScreen === 'atelier' ? 'text-white font-semibold' : ''
          }`}
        >
          Atelier Screen
        </button>
        <button
          onClick={() => onSelectScreen('nordic')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            currentScreen === 'nordic' ? 'text-white font-semibold' : ''
          }`}
        >
          Object Store
        </button>
        <button
          onClick={() => onSelectScreen('device-matrix')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            currentScreen === 'device-matrix' ? 'text-white font-semibold' : ''
          }`}
        >
          Device Matrix
        </button>
        <button
          onClick={() => onSelectScreen('asset-library')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            currentScreen === 'asset-library' ? 'text-white font-semibold' : ''
          }`}
        >
          Hotlink Assets
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenImportModal}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 bg-white rounded-lg hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Import HTML</span>
        </button>
      </div>
    </header>
  );
};
