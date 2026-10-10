import { HtmlScreenPreset, HotlinkedAsset } from '../types';
import { localAssets } from '../assets/images';

export const INITIAL_HOTLINKED_ASSETS: HotlinkedAsset[] = [
  {
    id: 'local-arch',
    title: 'Architectural Atelier Sunlight Studio',
    url: localAssets.heroArchitectural,
    category: 'architecture',
    aspectRatio: '16:9',
    naturalWidth: 1792,
    naturalHeight: 1024,
    isLocal: true,
  },
  {
    id: 'local-chair',
    title: 'Scandinavian Walnut & Charcoal Lounge Chair',
    url: localAssets.productLoungeChair,
    category: 'product',
    aspectRatio: '4:3',
    naturalWidth: 1024,
    naturalHeight: 768,
    isLocal: true,
  },
  {
    id: 'local-headphones',
    title: 'Precision Matte Aluminum Wireless Headphones',
    url: localAssets.productHeadphones,
    category: 'product',
    aspectRatio: '4:3',
    naturalWidth: 1024,
    naturalHeight: 768,
    isLocal: true,
  },
  {
    id: 'local-avatar',
    title: 'Lead Architect & Design Director Helena Rost',
    url: localAssets.creativeDirectorAvatar,
    category: 'portrait',
    aspectRatio: '1:1',
    naturalWidth: 800,
    naturalHeight: 800,
    isLocal: true,
  },
  {
    id: 'ext-kyoto',
    title: 'Kyoto Minimalist Bamboo Pavilion',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    category: 'architecture',
    aspectRatio: '16:9',
    naturalWidth: 1200,
    naturalHeight: 675,
    isLocal: false,
  },
  {
    id: 'ext-ceramic',
    title: 'Hand-thrown Terracotta & Stoneware Vessel',
    url: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
    category: 'product',
    aspectRatio: '4:3',
    naturalWidth: 800,
    naturalHeight: 600,
    isLocal: false,
  },
  {
    id: 'ext-watch',
    title: 'Horological Chronometer Titanium Case',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    category: 'product',
    aspectRatio: '4:3',
    naturalWidth: 800,
    naturalHeight: 600,
    isLocal: false,
  },
];

export const HTML_SCREEN_PRESETS: HtmlScreenPreset[] = [
  {
    id: 'preset-nordic-catalog',
    title: 'Nordic Object Studio — Spring Collection',
    category: 'E-Commerce / Objects',
    description: 'Clean Scandinavian editorial storefront with hotlinked imagery, product details, and specs.',
    thumbnailUrl: localAssets.productLoungeChair,
    htmlContent: `
<div class="bg-zinc-950 text-zinc-100 min-h-full font-sans antialiased p-8 md:p-12">
  <!-- Header -->
  <header class="flex items-center justify-between pb-8 border-b border-zinc-800">
    <div class="text-xl font-bold tracking-tight">KONTUR ATELIER</div>
    <nav class="flex items-center gap-6 text-sm text-zinc-400">
      <a href="#" class="hover:text-white transition-colors">Objects</a>
      <a href="#" class="hover:text-white transition-colors">Materials</a>
      <a href="#" class="hover:text-white transition-colors">Philosophy</a>
      <a href="#" class="hover:text-white transition-colors">Stockists</a>
    </nav>
    <div class="text-xs font-mono text-zinc-400">CART (0)</div>
  </header>

  <!-- Hero Split -->
  <main class="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-center">
    <div class="space-y-6">
      <div class="text-xs font-mono uppercase tracking-widest text-zinc-400">Spring 2026 Edition · Series No. 04</div>
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
        The K-01 Walnut Lounge Chair
      </h1>
      <p class="text-zinc-400 leading-relaxed text-base max-w-lg">
        Carved from sustainably harvested European walnut with high-density charcoal wool upholstery. Engineered for ergonomic tranquility and generational longevity.
      </p>

      <div class="pt-4 flex items-baseline gap-6">
        <span class="text-3xl font-mono text-white">$1,850</span>
        <span class="text-xs text-zinc-400">Complimentary White-Glove Delivery</span>
      </div>

      <div class="pt-4 flex gap-4">
        <button class="bg-white text-zinc-950 hover:bg-zinc-200 font-medium px-6 py-3 rounded-lg text-sm transition-colors">
          Acquire Object
        </button>
        <button class="border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-medium px-6 py-3 rounded-lg text-sm transition-colors">
          Download Spec Sheet
        </button>
      </div>

      <!-- Specs list -->
      <div class="grid grid-cols-2 gap-4 pt-8 border-t border-zinc-900 text-xs">
        <div>
          <span class="text-zinc-500 block mb-1">Dimensions</span>
          <span class="font-mono text-zinc-300">82cm × 78cm × 74cm</span>
        </div>
        <div>
          <span class="text-zinc-500 block mb-1">Craftsmanship</span>
          <span class="text-zinc-300">Copenhagen, Denmark</span>
        </div>
      </div>
    </div>

    <!-- Hotlinked Image Slot -->
    <div class="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 group">
      <img
        src="${localAssets.productLoungeChair}"
        alt="Scandinavian Walnut Lounge Chair"
        referrerpolicy="no-referrer"
        class="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div class="absolute bottom-4 left-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-zinc-800 text-xs text-zinc-300 font-mono">
        Hotlink: Local Studio Asset (Series K-01)
      </div>
    </div>
  </main>
</div>
    `.trim(),
  },
  {
    id: 'preset-spatial-atelier',
    title: 'Spatial Atelier — Architecture Portfolio',
    category: 'Architecture / Agency',
    description: 'Minimalist studio presentation showcasing completed works, team leadership, and spatial commissions.',
    thumbnailUrl: localAssets.heroArchitectural,
    htmlContent: `
<div class="bg-zinc-900 text-zinc-100 min-h-full font-sans antialiased p-8 md:p-14">
  <div class="flex justify-between items-baseline border-b border-zinc-800 pb-6 mb-10">
    <div class="text-2xl font-bold tracking-tight">STUDIO ROST & ASSOCIATES</div>
    <div class="text-xs text-zinc-400 font-mono">ZURICH · COPENHAGEN · TOKYO</div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
    <div class="lg:col-span-2 relative rounded-xl overflow-hidden border border-zinc-800 h-[420px]">
      <img
        src="${localAssets.heroArchitectural}"
        alt="Studio Rost Atelier in Zurich"
        referrerpolicy="no-referrer"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent flex flex-col justify-end p-8">
        <span class="text-xs font-mono text-zinc-400">FEATURED FACILITY</span>
        <h2 class="text-2xl font-semibold text-white">The Limmat Daylight Laboratory</h2>
        <p class="text-xs text-zinc-400 mt-1">Experimental acoustic and lighting modeling pavilion, Completed 2025</p>
      </div>
    </div>

    <div class="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-4 mb-4">
          <img
            src="${localAssets.creativeDirectorAvatar}"
            alt="Helena Rost"
            referrerpolicy="no-referrer"
            class="w-14 h-14 rounded-full object-cover border border-zinc-700"
          />
          <div>
            <div class="font-semibold text-sm text-white">Helena Rost, SIA</div>
            <div class="text-xs text-zinc-400">Principal Architect & Founder</div>
          </div>
        </div>
        <p class="text-xs leading-relaxed text-zinc-400">
          "Architecture is the calibration of stillness against sunlight. We construct shelters that listen to their topographical context rather than overpowering it."
        </p>
      </div>

      <div class="pt-6 border-t border-zinc-900">
        <div class="flex justify-between text-xs text-zinc-400 py-1">
          <span>Active Commissions</span>
          <span class="font-mono text-white">14</span>
        </div>
        <div class="flex justify-between text-xs text-zinc-400 py-1">
          <span>Square Metres Built</span>
          <span class="font-mono text-white">48,200 m²</span>
        </div>
        <button class="w-full mt-4 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white py-2.5 rounded-lg transition-colors">
          Inquire for 2027 Commission
        </button>
      </div>
    </div>
  </div>
</div>
    `.trim(),
  },
  {
    id: 'preset-audio-hardware',
    title: 'Acoustic Precision — Hardware Showcase',
    category: 'Hardware / Product',
    description: 'High-contrast studio launch screen for audiophile sound hardware with technical audio curves.',
    thumbnailUrl: localAssets.productHeadphones,
    htmlContent: `
<div class="bg-black text-white min-h-full font-sans antialiased p-8 md:p-12">
  <div class="max-w-5xl mx-auto">
    <div class="flex justify-between items-center pb-8 border-b border-zinc-900">
      <div class="font-bold tracking-widest text-sm uppercase">AETHER SOUND LABS</div>
      <div class="text-xs font-mono text-emerald-400">FREQUENCY: 5Hz – 48kHz · THD &lt; 0.02%</div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-center">
      <div class="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
        <img
          src="${localAssets.productHeadphones}"
          alt="Studio Monitor Headphones"
          referrerpolicy="no-referrer"
          class="w-full h-[460px] object-cover"
        />
      </div>

      <div class="space-y-6">
        <div class="inline-block px-2.5 py-1 bg-zinc-900 rounded text-xs font-mono text-zinc-400 border border-zinc-800">
          BERYLLIUM TRANSDUCERS
        </div>
        <h1 class="text-4xl font-bold tracking-tight text-white">
          A-90 Reference Wireless Monitor
        </h1>
        <p class="text-zinc-400 text-sm leading-relaxed">
          Engineered alongside mastering engineers in Berlin. Features 50mm diamond-vaporized beryllium diaphragms, lossless aptX Lossless transmission, and aerospace aluminum acoustic baffles.
        </p>

        <div class="p-4 bg-zinc-950 rounded-xl border border-zinc-800 grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <div class="text-zinc-500 mb-1">Battery</div>
            <div class="font-mono text-white text-sm">62 Hours</div>
          </div>
          <div>
            <div class="text-zinc-500 mb-1">Weight</div>
            <div class="font-mono text-white text-sm">285g</div>
          </div>
          <div>
            <div class="text-zinc-500 mb-1">Impedance</div>
            <div class="font-mono text-white text-sm">32 Ω</div>
          </div>
        </div>

        <div class="flex items-center gap-4 pt-4">
          <button class="bg-white text-black px-6 py-3 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors">
            Order Edition ($640)
          </button>
          <span class="text-xs text-zinc-500">In Stock · Dispatches in 24h</span>
        </div>
      </div>
    </div>
  </div>
</div>
    `.trim(),
  },
];
