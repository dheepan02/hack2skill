import React, { useState } from 'react';
import { localAssets } from '../assets/images';
import { ImageWithFallback } from './ImageWithFallback';
import {
  Check,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RefreshCw,
  Sliders,
  FileText,
  X,
  Compass,
  Star,
} from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  finish: string;
  upholstery: string;
  price: number;
  quantity: number;
}

interface NordicObjectScreenProps {
  onOpenContactModal?: () => void;
}

export const NordicObjectScreen: React.FC<NordicObjectScreenProps> = ({ onOpenContactModal }) => {
  const [selectedWood, setSelectedWood] = useState<'walnut' | 'ash' | 'oak'>('walnut');
  const [selectedFabric, setSelectedFabric] = useState<'charcoal' | 'sand' | 'forest'>('charcoal');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState(false);

  const images = [
    { src: localAssets.productLoungeChair, title: 'K-01 Nordic Lounge Chair Frontal Studio' },
    { src: localAssets.heroArchitectural, title: 'K-01 In Architectural Studio Context' },
    { src: localAssets.productHeadphones, title: 'Companion Object: A-90 Wireless Monitor' },
  ];

  const woodFinishes = [
    { id: 'walnut', label: 'Solid Walnut', color: '#4a3728' },
    { id: 'ash', label: 'Natural Ash', color: '#d8c7a5' },
    { id: 'oak', label: 'Ebonized Oak', color: '#1c1c1c' },
  ] as const;

  const fabrics = [
    { id: 'charcoal', label: 'Charcoal Kvadrat Wool', hex: '#2b2c2e' },
    { id: 'sand', label: 'Sand Bouclé', hex: '#cfc6b8' },
    { id: 'forest', label: 'Forest Felt', hex: '#28362b' },
  ] as const;

  const basePrice = 1850;
  const currentPrice = selectedWood === 'walnut' ? basePrice : basePrice - 120;

  const handleAddToCart = () => {
    const item: CartItem = {
      id: `${selectedWood}-${selectedFabric}-${Date.now()}`,
      name: 'K-01 Nordic Lounge Chair',
      finish: woodFinishes.find((w) => w.id === selectedWood)?.label || 'Walnut',
      upholstery: fabrics.find((f) => f.id === selectedFabric)?.label || 'Wool',
      price: currentPrice,
      quantity,
    };
    setCart((prev) => [...prev, item]);
    setShowCartDrawer(true);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
      {/* Product Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Gallery & Viewport */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-[4/3] group">
            <ImageWithFallback
              src={images[activeImageIndex].src}
              alt={images[activeImageIndex].title}
              fallbackTitle="Nordic Lounge Chair"
              aspectRatioClass="aspect-[4/3]"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />
            <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-zinc-800 text-[11px] font-mono text-zinc-300">
              FRAME VIEW {activeImageIndex + 1} / {images.length}
            </div>

            {/* Quick Blueprint Trigger */}
            <button
              onClick={() => setIsBlueprintModalOpen(true)}
              className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950/85 hover:bg-zinc-950 backdrop-blur-md border border-zinc-800 rounded-lg text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Inspect Blueprint Modal</span>
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-3 gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative rounded-xl overflow-hidden border cursor-pointer aspect-[4/3] bg-zinc-900 transition-all ${
                  activeImageIndex === idx
                    ? 'border-white ring-1 ring-white'
                    : 'border-zinc-800 hover:border-zinc-700 opacity-70 hover:opacity-100'
                }`}
              >
                <ImageWithFallback
                  src={img.src}
                  alt={img.title}
                  aspectRatioClass="aspect-[4/3]"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="p-4 bg-zinc-900/40 rounded-xl border border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-zinc-300" /> Insured global crating &amp; delivery
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-zinc-300" /> 10-Year structural guarantee
            </span>
            <span className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-zinc-300" /> 30-Day home trial
            </span>
          </div>
        </div>

        {/* Right: Customization & Purchase */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2 font-mono">
              <span>SERIES K-01</span>
              <span>·</span>
              <span>BATCH NO. 04</span>
              <span>·</span>
              <span>IN STOCK (8 REMAINING)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The K-01 Nordic Lounge Chair
            </h1>
            <div className="mt-3 flex items-baseline gap-4">
              <span className="text-3xl font-mono text-white tabular-nums">${currentPrice}</span>
              <span className="text-xs text-zinc-500 line-through tabular-nums">$2,100</span>
              <span className="text-xs text-emerald-400 font-mono">Direct Atelier Pricing</span>
            </div>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Milled from sustainably sourced European timber with sculpted mortise-and-tenon joints. Designed to yield natural lumbar relaxation without visual bulk.
          </p>

          {/* Timber Selection */}
          <div className="space-y-3">
            <label className="flex items-center justify-between text-xs font-medium text-zinc-300">
              <span>Select Timber Finish</span>
              <span className="font-mono text-zinc-400">
                {woodFinishes.find((w) => w.id === selectedWood)?.label}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {woodFinishes.map((wood) => (
                <button
                  key={wood.id}
                  onClick={() => setSelectedWood(wood.id)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedWood === wood.id
                      ? 'border-white bg-zinc-900 text-white'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-zinc-700 inline-block"
                      style={{ backgroundColor: wood.color }}
                    />
                    <span className="text-xs font-medium">{wood.label}</span>
                  </div>
                  {selectedWood === wood.id && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Selection */}
          <div className="space-y-3">
            <label className="flex items-center justify-between text-xs font-medium text-zinc-300">
              <span>Select Textile Upholstery</span>
              <span className="font-mono text-zinc-400">
                {fabrics.find((f) => f.id === selectedFabric)?.label}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {fabrics.map((fabric) => (
                <button
                  key={fabric.id}
                  onClick={() => setSelectedFabric(fabric.id)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                    selectedFabric === fabric.id
                      ? 'border-white bg-zinc-900 text-white'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-zinc-700 inline-block"
                      style={{ backgroundColor: fabric.hex }}
                    />
                    <span className="text-xs font-medium">{fabric.label}</span>
                  </div>
                  {selectedFabric === fabric.id && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-zinc-800 rounded-lg bg-zinc-950">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-zinc-400 hover:text-white transition-colors cursor-pointer text-sm"
                >
                  -
                </button>
                <span className="px-3 text-sm font-mono text-white tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 text-zinc-400 hover:text-white transition-colors cursor-pointer text-sm"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 bg-white hover:bg-zinc-200 text-zinc-950 rounded-lg font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                <span>Add to Atelier Bag · ${(currentPrice * quantity).toLocaleString()}</span>
              </button>
            </div>

            <button
              onClick={() => onOpenContactModal && onOpenContactModal()}
              className="w-full py-2.5 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Custom Fabric or Hospitality Inquiries</span>
            </button>
          </div>

          {/* Technical Specs Accordion/Table */}
          <div className="border-t border-zinc-800 pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
                Technical Specifications
              </h4>
              <button
                onClick={() => setIsBlueprintModalOpen(true)}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer font-mono"
              >
                <FileText className="w-3.5 h-3.5" /> Full Blueprint
              </button>
            </div>
            <div className="divide-y divide-zinc-900 text-xs">
              <div className="py-2 flex justify-between">
                <span className="text-zinc-500">Dimensions</span>
                <span className="font-mono text-zinc-300">820mm (W) × 780mm (D) × 740mm (H)</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-zinc-500">Seat Height</span>
                <span className="font-mono text-zinc-300">410mm incline</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-zinc-500">Weight</span>
                <span className="font-mono text-zinc-300">14.6 kg net</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-zinc-500">Provenance</span>
                <span className="text-zinc-300">Aarhus Woodcrafting Cooperative, Denmark</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Blueprint Modal */}
      {isBlueprintModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white text-base">K-01 Architectural Schematic Blueprint</h3>
              </div>
              <button
                onClick={() => setIsBlueprintModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
                <span className="text-xs font-mono text-zinc-400">ISOMETRIC ERGONOMICS</span>
                <div className="text-sm font-semibold text-white">Mortise &amp; Tenon Joinery</div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Sculpted armrests carved from single-block walnut blanks without metal bracket fasteners. Resilient 12° recline calculated for natural spinal decompaction.
                </p>
              </div>

              <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
                <span className="text-xs font-mono text-zinc-400">MATERIAL REVERSIBILITY</span>
                <div className="text-sm font-semibold text-white">Modular Wool Upholstery</div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Removable cushion covers equipped with concealed Swiss RiRi zips, allowing upholstery refurbishment across decades of ownership.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
              <button
                onClick={() => setIsBlueprintModalOpen(false)}
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs rounded-lg cursor-pointer"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  alert('CAD drawings package (.DWG/.STEP) queued for download.');
                  setIsBlueprintModalOpen(false);
                }}
                className="px-4 py-2 bg-white text-zinc-950 font-semibold text-xs rounded-lg hover:bg-zinc-200 cursor-pointer"
              >
                Download CAD Spec Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {showCartDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span className="font-bold text-white text-base">Atelier Bag ({cart.length})</span>
                </div>
                <button
                  onClick={() => setShowCartDrawer(false)}
                  className="text-xs text-zinc-400 hover:text-white cursor-pointer"
                >
                  Close
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-12 text-center text-xs text-zinc-500">
                  Your bag is currently empty.
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-zinc-900/60 rounded-xl border border-zinc-800 flex justify-between items-start"
                    >
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-white">{item.name}</div>
                        <div className="text-xs text-zinc-400">
                          {item.finish} · {item.upholstery}
                        </div>
                        <div className="text-xs font-mono text-zinc-500">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-sm font-mono text-white tabular-nums">
                        ${(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-zinc-800 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Subtotal</span>
                <span className="text-xl font-mono text-white tabular-nums">${cartTotal.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-zinc-500">
                Custom handcrafted pieces dispatch within 3–4 weeks. Fully insured.
              </p>
              <button
                onClick={() => {
                  alert('Thank you! Simulation checkout initialized.');
                  setShowCartDrawer(false);
                }}
                className="w-full py-3 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-sm rounded-lg transition-colors cursor-pointer"
              >
                Proceed to Secure Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
