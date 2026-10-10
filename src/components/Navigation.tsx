import React, { useState } from 'react';
import { ScreenId } from '../types';
import {
  Code2,
  Compass,
  ShoppingBag,
  LayoutGrid,
  Link2,
  Plus,
  MessageSquare,
  Menu,
  X,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';

interface NavigationProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  onOpenImportModal: () => void;
  onOpenContactModal: () => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onSelectScreen,
  onOpenImportModal,
  onOpenContactModal,
  isSidebarCollapsed,
  onToggleSidebar,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ScreenId; label: string; icon: React.ReactNode; shortcut: string }[] = [
    {
      id: 'html-studio',
      label: 'HTML Canvas',
      icon: <Code2 className="w-4 h-4 shrink-0" />,
      shortcut: '1',
    },
    {
      id: 'atelier',
      label: 'Atelier Studio',
      icon: <Compass className="w-4 h-4 shrink-0" />,
      shortcut: '2',
    },
    {
      id: 'nordic',
      label: 'Object Store',
      icon: <ShoppingBag className="w-4 h-4 shrink-0" />,
      shortcut: '3',
    },
    {
      id: 'device-matrix',
      label: 'Device Matrix',
      icon: <LayoutGrid className="w-4 h-4 shrink-0" />,
      shortcut: '4',
    },
    {
      id: 'asset-library',
      label: 'Hotlink Assets',
      icon: <Link2 className="w-4 h-4 shrink-0" />,
      shortcut: '5',
    },
  ];

  return (
    <>
      {/* 1. Persistent Top Bar (Standard 3-Zone Contract with Mobile Menu Toggle) */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur sticky top-0 z-40">
        {/* Zone 1: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            {isSidebarCollapsed ? (
              <PanelLeft className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>

          <div
            onClick={() => onSelectScreen('html-studio')}
            className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 cursor-pointer hover:text-zinc-200 transition-colors flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 bg-white rounded-sm inline-block" />
            <span>ScreenCraft Studio</span>
          </div>
        </div>

        {/* Zone 2: Primary Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectScreen(item.id)}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentScreen === item.id ? 'text-white font-semibold' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions & Mobile Hamburger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenContactModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact Studio</span>
          </button>

          <button
            onClick={onOpenImportModal}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 bg-white rounded-lg hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Import HTML</span>
          </button>

          {/* Mobile hamburger trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* 2. Persistent Desktop Sidebar (Collapsible Rail or Full Sidebar) */}
      <aside
        className={`hidden lg:flex flex-col justify-between fixed top-[53px] bottom-0 left-0 z-30 bg-zinc-950 border-r border-zinc-800 transition-all duration-200 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="p-3 space-y-6">
          <div className="space-y-1">
            {!isSidebarCollapsed && (
              <div className="px-3 py-1 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                App Screens
              </div>
            )}
            {navItems.map((item) => {
              const active = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectScreen(item.id)}
                  title={item.label}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-zinc-900 text-white border border-zinc-800 shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                  } ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <span className={active ? 'text-white' : 'text-zinc-400'}>{item.icon}</span>
                  {!isSidebarCollapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="space-y-1 pt-4 border-t border-zinc-900">
            {!isSidebarCollapsed && (
              <div className="px-3 py-1 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                Quick Actions
              </div>
            )}
            <button
              onClick={onOpenContactModal}
              title="Direct Inquiry"
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40 transition-all cursor-pointer ${
                isSidebarCollapsed ? 'justify-center px-0' : ''
              }`}
            >
              <MessageSquare className="w-4 h-4 text-zinc-400" />
              {!isSidebarCollapsed && <span className="text-left">Studio Inquiry</span>}
            </button>
            <button
              onClick={onOpenImportModal}
              title="Import HTML"
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40 transition-all cursor-pointer ${
                isSidebarCollapsed ? 'justify-center px-0' : ''
              }`}
            >
              <Plus className="w-4 h-4 text-zinc-400" />
              {!isSidebarCollapsed && <span className="text-left">Import HTML</span>}
            </button>
          </div>
        </div>

        {/* Sidebar Footer info */}
        {!isSidebarCollapsed && (
          <div className="p-4 border-t border-zinc-900 text-[11px] text-zinc-500 font-mono space-y-1">
            <div className="text-zinc-400 font-semibold">SCREENCRAFT 2026</div>
            <div>Hotlinked Visual Suite</div>
          </div>
        )}
      </aside>

      {/* 3. Mobile Slide-out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-sm flex flex-col">
          <div className="p-6 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
            <span className="font-bold text-white text-base">Navigation Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-3 bg-zinc-950 flex-1 overflow-y-auto">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-2">
              Screens &amp; Workspaces
            </span>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectScreen(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  currentScreen === item.id
                    ? 'bg-zinc-900 text-white border border-zinc-800'
                    : 'text-zinc-400 hover:text-white bg-zinc-950'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <div className="pt-6 border-t border-zinc-900 space-y-3">
              <button
                onClick={() => {
                  onOpenContactModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-xl text-xs font-medium cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact Studio</span>
              </button>

              <button
                onClick={() => {
                  onOpenImportModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white text-zinc-950 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Import HTML Screen</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Mobile Bottom Persistent Dock (Easy thumb-reach navigation) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 border-t border-zinc-800/90 backdrop-blur-lg px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const active = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectScreen(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg cursor-pointer transition-colors ${
                active ? 'text-white font-medium' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {item.icon}
              <span className="text-[10px] truncate max-w-[56px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
