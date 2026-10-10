import React, { useState } from 'react';
import { INITIAL_HOTLINKED_ASSETS } from '../data/mockScreens';
import { HotlinkedAsset } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { Copy, Check, Plus, ExternalLink, ShieldCheck, Image as ImageIcon } from 'lucide-react';

export const AssetLibraryScreen: React.FC = () => {
  const [assets, setAssets] = useState<HotlinkedAsset[]>(INITIAL_HOTLINKED_ASSETS);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState<HotlinkedAsset['category']>('product');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleCopyTag = (asset: HotlinkedAsset) => {
    const tag = `<img src="${asset.url}" alt="${asset.title}" referrerpolicy="no-referrer" class="w-full h-auto object-cover rounded-xl" />`;
    navigator.clipboard.writeText(tag);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl || !newTitle) return;

    const newAsset: HotlinkedAsset = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      url: newUrl,
      category: newCategory,
      aspectRatio: '16:9',
      isLocal: false,
    };

    setAssets([newAsset, ...assets]);
    setNewTitle('');
    setNewUrl('');
  };

  const filteredAssets =
    activeFilter === 'all' ? assets : assets.filter((a) => a.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <span>ASSET CATALOG</span>
            <span>·</span>
            <span>HOTLINK CDN &amp; GENERATED VISUALS</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
            Hotlink Asset Library
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Copy resilient &lt;img&gt; markup with automatic referrer policy and zero-broken-image fallback protection.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900 rounded-lg border border-zinc-800 text-xs">
          {(['all', 'architecture', 'product', 'portrait'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-md capitalize transition-colors cursor-pointer ${
                activeFilter === cat
                  ? 'bg-zinc-800 text-white font-medium shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Hotlink Bar */}
      <form
        onSubmit={handleAddAsset}
        className="p-5 bg-zinc-900/60 rounded-2xl border border-zinc-800 space-y-4"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-white">
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Register New Hotlink Target</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <input
            type="text"
            required
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Asset title (e.g. Modernist Concrete Gallery)"
            className="md:col-span-4 px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
          />
          <input
            type="url"
            required
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Direct Image URL (e.g. https://...)"
            className="md:col-span-5 px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as any)}
            className="md:col-span-2 px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-zinc-500 cursor-pointer"
          >
            <option value="product">Product</option>
            <option value="architecture">Architecture</option>
            <option value="portrait">Portrait</option>
            <option value="editorial">Editorial</option>
          </select>
          <button
            type="submit"
            className="md:col-span-1 px-4 py-2.5 bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs rounded-lg transition-colors cursor-pointer text-center"
          >
            Add
          </button>
        </div>
      </form>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-4 hover:border-zinc-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[16/10]">
                <ImageWithFallback
                  src={asset.url}
                  alt={asset.title}
                  fallbackTitle={asset.title}
                  aspectRatioClass="aspect-[16/10]"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-zinc-800 text-[10px] font-mono text-zinc-300">
                  {asset.isLocal ? 'LOCAL ASSET' : 'HOTLINK CDN'}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-zinc-500 font-mono mb-1">
                  <span className="capitalize">{asset.category}</span>
                  <span>{asset.aspectRatio}</span>
                </div>
                <h3 className="text-sm font-semibold text-white truncate">{asset.title}</h3>
                <div className="text-[11px] text-zinc-500 font-mono truncate mt-0.5 max-w-[280px]">
                  {asset.url}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3">
              <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Referrer Safe
              </span>

              <button
                onClick={() => handleCopyTag(asset)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                {copiedId === asset.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied &lt;img&gt;</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copy &lt;img&gt; Tag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
