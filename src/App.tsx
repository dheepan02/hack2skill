import React, { useState, useEffect } from 'react';
import { ScreenId } from './types';
import { Navigation } from './components/Navigation';
import { AtelierScreen } from './components/AtelierScreen';
import { NordicObjectScreen } from './components/NordicObjectScreen';
import { HtmlStudioScreen } from './components/HtmlStudioScreen';
import { DeviceMatrixScreen } from './components/DeviceMatrixScreen';
import { AssetLibraryScreen } from './components/AssetLibraryScreen';
import { ImportModal } from './components/ImportModal';
import { ContactModal } from './components/ContactModal';
import { HTML_SCREEN_PRESETS } from './data/mockScreens';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('html-studio');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Keyboard shortcut listener for instantaneous navigation (1, 2, 3, 4, 5)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === '1') setCurrentScreen('html-studio');
      if (e.key === '2') setCurrentScreen('atelier');
      if (e.key === '3') setCurrentScreen('nordic');
      if (e.key === '4') setCurrentScreen('device-matrix');
      if (e.key === '5') setCurrentScreen('asset-library');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleImportHtml = (title: string, htmlContent: string) => {
    const newPreset = {
      id: `custom-${Date.now()}`,
      title,
      category: 'User Custom HTML',
      description: 'Imported by user with hotlinked assets.',
      thumbnailUrl: '',
      htmlContent,
    };
    HTML_SCREEN_PRESETS.unshift(newPreset);
    setCurrentScreen('html-studio');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white pb-14 md:pb-0">
      {/* Persistent Navigation (Desktop TopBar, Collapsible Sidebar, and Mobile Dock) */}
      <Navigation
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        onOpenImportModal={() => setIsImportModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Viewport adjusted for persistent desktop sidebar */}
      <main
        className={`flex-1 flex flex-col transition-all duration-200 ${
          isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
        }`}
      >
        {currentScreen === 'html-studio' && <HtmlStudioScreen />}
        {currentScreen === 'atelier' && (
          <AtelierScreen onOpenContactModal={() => setIsContactModalOpen(true)} />
        )}
        {currentScreen === 'nordic' && (
          <NordicObjectScreen onOpenContactModal={() => setIsContactModalOpen(true)} />
        )}
        {currentScreen === 'device-matrix' && <DeviceMatrixScreen />}
        {currentScreen === 'asset-library' && <AssetLibraryScreen />}
      </main>

      {/* Interactive Import HTML Modal */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportHtml}
      />

      {/* Interactive Contact & Inquiry Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Quiet Non-Slop Footer */}
      {currentScreen !== 'html-studio' && (
        <footer
          className={`border-t border-zinc-900 bg-zinc-950 px-6 py-8 text-xs text-zinc-500 transition-all duration-200 ${
            isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
          }`}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-400">ScreenCraft Studio</span>
              <span aria-hidden="true">·</span>
              <span>Responsive screen rendering &amp; resilient hotlinked visual assets</span>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setCurrentScreen('html-studio')}
                className="hover:text-zinc-300 transition-colors cursor-pointer"
              >
                HTML Canvas
              </button>
              <button
                onClick={() => setCurrentScreen('device-matrix')}
                className="hover:text-zinc-300 transition-colors cursor-pointer"
              >
                Device Matrix
              </button>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="hover:text-zinc-300 transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
