import React, { useState } from 'react';
import { HTML_SCREEN_PRESETS } from '../data/mockScreens';
import { Monitor, Tablet, Smartphone, ZoomIn, ZoomOut } from 'lucide-react';

export const DeviceMatrixScreen: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(HTML_SCREEN_PRESETS[0].id);
  const [zoomLevel, setZoomLevel] = useState<number>(75);

  const currentPreset =
    HTML_SCREEN_PRESETS.find((p) => p.id === selectedPresetId) || HTML_SCREEN_PRESETS[0];

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8 space-y-8">
      {/* Top Header & Zoom Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <span>DEVICE MATRIX VIEW</span>
            <span>·</span>
            <span>SIMULTANEOUS RESPONSIVE INSPECTION</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Multi-Device Screen Matrix
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Preset Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-500 font-mono">PRESET:</span>
            <select
              value={selectedPresetId}
              onChange={(e) => setSelectedPresetId(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-zinc-600 text-xs cursor-pointer"
            >
              {HTML_SCREEN_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-xs">
            <button
              onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
              className="p-1 text-zinc-400 hover:text-white cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-zinc-300 px-2 select-none">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(100, z + 10))}
              className="p-1 text-zinc-400 hover:text-white cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 3 synchronized device viewports */}
      <div
        className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start transition-all"
        style={{ transformOrigin: 'top center' }}
      >
        {/* 1. Desktop Viewport (XL: span 7) */}
        <div className="xl:col-span-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <Monitor className="w-4 h-4 text-zinc-300" /> Desktop Viewport
            </span>
            <span>1200px (Scaled)</span>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
            <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span>https://atelier.internal/desktop</span>
              <span>100% SCALE</span>
            </div>
            <div
              className="w-full h-[620px] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: currentPreset.htmlContent }}
            />
          </div>
        </div>

        {/* 2. Tablet Viewport (XL: span 3) */}
        <div className="xl:col-span-3 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <Tablet className="w-4 h-4 text-zinc-300" /> Tablet (iPad Mini)
            </span>
            <span>768px</span>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
            <div className="px-3 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span>Tablet Mode</span>
              <span>768 × 1024</span>
            </div>
            <div
              className="w-full h-[620px] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: currentPreset.htmlContent }}
            />
          </div>
        </div>

        {/* 3. Mobile Viewport (XL: span 3) */}
        <div className="xl:col-span-3 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono px-1">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <Smartphone className="w-4 h-4 text-zinc-300" /> Mobile (iPhone 16)
            </span>
            <span>390px</span>
          </div>
          <div className="rounded-3xl border-2 border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl max-w-[390px] mx-auto">
            {/* Dynamic island mock */}
            <div className="pt-2 pb-1 bg-zinc-900 border-b border-zinc-800 flex justify-center items-center">
              <div className="w-20 h-4 bg-zinc-950 rounded-full" />
            </div>
            <div
              className="w-full h-[580px] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: currentPreset.htmlContent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
