import React, { useState, useMemo, useEffect, useRef } from 'react';
import { HTML_SCREEN_PRESETS, INITIAL_HOTLINKED_ASSETS } from '../data/mockScreens';
import { DeviceMode, HotlinkedAsset } from '../types';
import {
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Maximize2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Link2,
  Code2,
  Eye,
  Plus,
  ExternalLink,
} from 'lucide-react';

interface HtmlStudioScreenProps {
  onSelectScreen?: (screen: any) => void;
}

export const HtmlStudioScreen: React.FC<HtmlStudioScreenProps> = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(HTML_SCREEN_PRESETS[0].id);
  const [htmlCode, setHtmlCode] = useState<string>(HTML_SCREEN_PRESETS[0].htmlContent);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'split'>('split');
  const [copied, setCopied] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const [showImageInserter, setShowImageInserter] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(true);

  // When preset changes, load its code
  const handleSelectPreset = (presetId: string) => {
    const preset = HTML_SCREEN_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setSelectedPresetId(presetId);
      setHtmlCode(preset.htmlContent);
    }
  };

  // Detect hotlinked images in HTML code
  const detectedImages = useMemo(() => {
    const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    const matches: { fullTag: string; src: string; alt: string }[] = [];
    let match;
    while ((match = regex.exec(htmlCode)) !== null) {
      const fullTag = match[0];
      const src = match[1];
      const altMatch = /alt=["']([^"']*)["']/i.exec(fullTag);
      const alt = altMatch ? altMatch[1] : 'Image';
      matches.push({ fullTag, src, alt });
    }
    return matches;
  }, [htmlCode]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsertImage = (url: string, altText: string) => {
    const snippet = `\n<div class="my-6 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">\n  <img src="${url}" alt="${altText}" referrerpolicy="no-referrer" class="w-full h-auto object-cover" />\n</div>\n`;
    setHtmlCode((prev) => prev + snippet);
    setNewImageUrl('');
    setNewImageAlt('');
    setShowImageInserter(false);
  };

  // Viewport device widths
  const deviceWidthClasses: Record<DeviceMode, string> = {
    desktop: 'max-w-[1280px]',
    laptop: 'max-w-[1024px]',
    tablet: 'max-w-[768px]',
    mobile: 'max-w-[390px]',
    responsive: 'w-full',
  };

  return (
    <div className="flex flex-col h-[calc(100vh-61px)] bg-zinc-950 overflow-hidden">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-2.5 border-b border-zinc-800 bg-zinc-900/80 text-xs">
        {/* Left: Preset Selector */}
        <div className="flex items-center gap-3">
          <span className="text-zinc-500 font-mono">SCREEN PRESET:</span>
          <select
            value={selectedPresetId}
            onChange={(e) => handleSelectPreset(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-zinc-600 text-xs cursor-pointer"
          >
            {HTML_SCREEN_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              const preset = HTML_SCREEN_PRESETS.find((p) => p.id === selectedPresetId);
              if (preset) setHtmlCode(preset.htmlContent);
            }}
            title="Reset to original preset"
            className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Viewport Device Switcher */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => setDeviceMode('desktop')}
            title="Desktop 1280px"
            className={`p-1.5 rounded-md cursor-pointer transition-colors ${
              deviceMode === 'desktop' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode('laptop')}
            title="Laptop 1024px"
            className={`p-1.5 rounded-md cursor-pointer transition-colors ${
              deviceMode === 'laptop' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Laptop className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            title="Tablet 768px"
            className={`p-1.5 rounded-md cursor-pointer transition-colors ${
              deviceMode === 'tablet' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            title="Mobile 390px"
            className={`p-1.5 rounded-md cursor-pointer transition-colors ${
              deviceMode === 'mobile' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode('responsive')}
            title="Fluid 100%"
            className={`p-1.5 rounded-md cursor-pointer transition-colors ${
              deviceMode === 'responsive' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Tab Mode & Actions */}
        <div className="flex items-center gap-3">
          {/* Layout mode */}
          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-2.5 py-1 rounded text-xs cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'preview' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('split')}
              className={`px-2.5 py-1 rounded text-xs cursor-pointer hidden md:flex items-center gap-1.5 ${
                activeTab === 'split' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span>Split</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-2.5 py-1 rounded text-xs cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'code' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>HTML</span>
            </button>
          </div>

          <button
            onClick={() => setShowImageInserter(!showImageInserter)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Insert Image Hotlink</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy HTML'}</span>
          </button>
        </div>
      </div>

      {/* Insert Image Hotlink Drawer */}
      {showImageInserter && (
        <div className="bg-zinc-900 border-b border-zinc-800 p-4 animate-in slide-in-from-top duration-200">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Link2 className="w-4 h-4 text-emerald-400" />
                <span>Inject Hotlinked Image into HTML Screen</span>
              </div>
              <button
                onClick={() => setShowImageInserter(false)}
                className="text-xs text-zinc-500 hover:text-white cursor-pointer"
              >
                Dismiss
              </button>
            </div>

            {/* Quick Presets from Local Studio Assets */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 block">AVAILABLE STUDIO HOTLINKS:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {INITIAL_HOTLINKED_ASSETS.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => handleInsertImage(asset.url, asset.title)}
                    className="p-2 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-lg text-left flex items-center gap-2 group transition-all cursor-pointer"
                  >
                    <img
                      src={asset.url}
                      alt={asset.title}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <div className="text-xs font-medium text-white truncate">{asset.title}</div>
                      <div className="text-[10px] text-zinc-500 font-mono">
                        {asset.isLocal ? 'Local Studio Asset' : 'Hotlink CDN'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom URL Input */}
            <div className="pt-2 border-t border-zinc-800/80 flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Paste image URL (e.g. https://... or local path)"
                className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              />
              <input
                type="text"
                value={newImageAlt}
                onChange={(e) => setNewImageAlt(e.target.value)}
                placeholder="Alt description (e.g. Minimalist Chair)"
                className="w-full sm:w-64 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              />
              <button
                disabled={!newImageUrl}
                onClick={() => handleInsertImage(newImageUrl, newImageAlt || 'Hotlinked Image')}
                className="px-4 py-2 bg-white disabled:bg-zinc-800 text-zinc-950 disabled:text-zinc-500 font-semibold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Insert Tag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Code Editor (if split or code) */}
        {(activeTab === 'code' || activeTab === 'split') && (
          <div
            className={`flex flex-col border-r border-zinc-800 bg-zinc-950 ${
              activeTab === 'split' ? 'w-full md:w-5/12' : 'w-full'
            }`}
          >
            <div className="px-4 py-2 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-zinc-300" /> SCREEN_TEMPLATE.HTML
              </span>
              <span>{htmlCode.length} characters</span>
            </div>
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full p-4 bg-zinc-950 text-zinc-200 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-0 selection:bg-zinc-800"
            />
          </div>
        )}

        {/* Right: Live Interactive Canvas (if split or preview) */}
        {(activeTab === 'preview' || activeTab === 'split') && (
          <div
            className={`flex-1 flex flex-col bg-zinc-900/50 overflow-hidden ${
              activeTab === 'preview' ? 'w-full' : ''
            }`}
          >
            {/* Viewport Canvas Area */}
            <div className="flex-1 overflow-auto p-4 md:p-8 flex items-start justify-center">
              <div
                className={`w-full ${deviceWidthClasses[deviceMode]} transition-all duration-300 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden`}
              >
                {/* Device Title bar */}
                <div className="px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-mono select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
                  </div>
                  <span className="text-zinc-500 uppercase tracking-widest">
                    {deviceMode} VIEWPORT ({detectedImages.length} HOTLINKS)
                  </span>
                  <span className="text-zinc-600">LIVE RENDER</span>
                </div>

                {/* Rendered HTML Container */}
                <div
                  className="w-full min-h-[480px] bg-zinc-950"
                  dangerouslySetInnerHTML={{ __html: htmlCode }}
                />
              </div>
            </div>

            {/* Bottom Hotlink Inspector */}
            {inspectorOpen && (
              <div className="border-t border-zinc-800 bg-zinc-950/95 p-3 px-6 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                    <Link2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>HOTLINKED IMAGES DETECTED IN THIS SCREEN ({detectedImages.length})</span>
                  </div>
                  <button
                    onClick={() => setInspectorOpen(false)}
                    className="text-[11px] text-zinc-500 hover:text-white cursor-pointer"
                  >
                    Hide
                  </button>
                </div>

                {detectedImages.length === 0 ? (
                  <div className="text-zinc-600 text-xs italic py-1 font-mono">
                    No &lt;img&gt; tags found in current markup. Insert one with the button above!
                  </div>
                ) : (
                  <div className="flex items-center gap-3 overflow-x-auto pb-1">
                    {detectedImages.map((img, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-2 bg-zinc-900 border border-zinc-800 rounded-lg shrink-0 max-w-sm"
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded object-cover shrink-0 border border-zinc-700"
                        />
                        <div className="overflow-hidden text-[11px]">
                          <div className="text-zinc-300 font-medium truncate">{img.alt}</div>
                          <div className="text-zinc-500 font-mono truncate max-w-[200px]">
                            {img.src}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
