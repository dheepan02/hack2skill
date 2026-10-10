import React, { useState } from 'react';
import { X, Code2, Link2, Sparkles } from 'lucide-react';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (title: string, htmlContent: string) => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [title, setTitle] = useState('');
  const [htmlContent, setHtmlContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!htmlContent.trim()) return;
    onImport(title || 'Custom Screen', htmlContent);
    onClose();
  };

  const sampleSnippet = `
<div class="bg-zinc-950 text-white min-h-screen p-8">
  <div class="max-w-4xl mx-auto space-y-6">
    <h1 class="text-3xl font-bold">My Custom Screen</h1>
    <p class="text-zinc-400">Rendered with hotlinked images directly from HTML.</p>
    <img 
      src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80" 
      alt="Bamboo Pavilion" 
      referrerpolicy="no-referrer"
      class="rounded-xl border border-zinc-800" 
    />
  </div>
</div>
  `.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-white" />
            <h2 className="text-base font-bold text-white">Import Custom HTML Screen</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Screen Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Minimalist Checkout Screen"
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-zinc-300">
                Paste HTML Markup (with hotlinked &lt;img&gt; tags)
              </label>
              <button
                type="button"
                onClick={() => setHtmlContent(sampleSnippet)}
                className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer font-mono"
              >
                <Sparkles className="w-3 h-3" /> Load Sample Snippet
              </button>
            </div>
            <textarea
              required
              rows={9}
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder="<div class='...'>\n  <img src='https://...' />\n</div>"
              className="w-full p-3.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
            <span className="text-[11px] text-zinc-500 font-mono">
              Hotlinks are loaded with referrerpolicy="no-referrer"
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Render in Canvas
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
