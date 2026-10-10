import React from 'react';
import { X, Calendar, MapPin, Layers, ArrowRight, Share2, Download } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export interface ProjectDetail {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  image: string;
  description: string;
  client?: string;
  leadArchitect?: string;
  materials?: string[];
}

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
  onBookConsultation: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onBookConsultation,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
      <div className="w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="uppercase">{project.category}</span>
            <span>·</span>
            <span>MONOGRAPH CASE STUDY</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="relative rounded-xl overflow-hidden border border-zinc-800 aspect-[16/9] bg-zinc-900">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              fallbackTitle={project.title}
              aspectRatioClass="aspect-[16/9]"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" /> {project.location}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" /> Completed {project.year}
              </span>
              <span>·</span>
              <span className="font-mono text-zinc-300">{project.area}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {project.title}
            </h2>

            <p className="text-zinc-300 text-sm leading-relaxed">
              {project.description} Engineered to capture the dramatic shifting angles of seasonal sunlight while providing acoustically calibrated study zones. Every structural join was fabricated offsite and assembled within four weeks to preserve natural wetland vegetation.
            </p>
          </div>

          {/* Specifications Matrix */}
          <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-zinc-500 block mb-1">Commission Type</span>
              <span className="text-white capitalize font-medium">{project.category}</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1">Gross Internal Area</span>
              <span className="text-white font-mono">{project.area}</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1">Structural Frame</span>
              <span className="text-white">Glulam &amp; Precast Concrete</span>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1">Environmental Standard</span>
              <span className="text-emerald-400 font-mono">Minergie-P-Eco</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/40 flex items-center justify-between">
          <button
            onClick={() => {
              alert('Monograph architectural PDF generated.');
            }}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer font-mono"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Architectural Drawing Sheet</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookConsultation(project.title);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              <span>Commission Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
