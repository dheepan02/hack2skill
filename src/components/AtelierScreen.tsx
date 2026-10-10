import React, { useState } from 'react';
import { localAssets } from '../assets/images';
import { ImageWithFallback } from './ImageWithFallback';
import { InteractiveCarousel, CarouselSlide } from './InteractiveCarousel';
import { ProjectDetailModal, ProjectDetail } from './ProjectDetailModal';
import { ArrowRight, CheckCircle2, MessageSquare, Layers } from 'lucide-react';

interface AtelierScreenProps {
  onOpenContactModal?: () => void;
}

export const AtelierScreen: React.FC<AtelierScreenProps> = ({ onOpenContactModal }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'cultural' | 'residential' | 'laboratories'>('all');
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySite, setInquirySite] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const projects: ProjectDetail[] = [
    {
      id: 1,
      title: 'Limmat Light Laboratory',
      category: 'laboratories',
      location: 'Zurich, Switzerland',
      year: '2025',
      area: '4,800 m²',
      image: localAssets.heroArchitectural,
      description: 'Daylight refraction study center with micro-perforated concrete facades and internal light courtyards.',
    },
    {
      id: 2,
      title: 'Fjord Timber Pavilion',
      category: 'cultural',
      location: 'Aarhus, Denmark',
      year: '2024',
      area: '2,400 m²',
      image: localAssets.productLoungeChair,
      description: 'Laminated oak arch structure hovering over salt marshes with passive thermal insulation.',
    },
    {
      id: 3,
      title: 'Kattenberg Baseline Residence',
      category: 'residential',
      location: 'Rotterdam, Netherlands',
      year: '2026',
      area: '920 m²',
      image: localAssets.productHeadphones,
      description: 'Acoustic sanctuary balancing basalt stone, floor-to-ceiling thermal triple-glazing, and hidden gardens.',
    },
  ];

  const carouselSlides: CarouselSlide[] = [
    {
      id: 'slide-1',
      image: localAssets.heroArchitectural,
      title: 'The Limmat Daylight Atelier',
      subtitle: 'Exploration of natural light angles and structural mass in contemporary civic spaces.',
      category: 'Zurich Atelier',
    },
    {
      id: 'slide-2',
      image: localAssets.productLoungeChair,
      title: 'Nordic Material Research Lab',
      subtitle: 'Sustainable forestry, laminated timber geometries, and tactile organic surfaces.',
      category: 'Aarhus Co-op',
    },
    {
      id: 'slide-3',
      image: localAssets.productHeadphones,
      title: 'Acoustic Attenuation Pavilion',
      subtitle: 'Industrial precision and noise cancellation engineering applied to spatial envelopes.',
      category: 'Rotterdam Institute',
    },
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter((p) => p.category === activeTab);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquirySite('');
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
      {/* Editorial Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span>Studio Rost &amp; Partners</span>
              <span aria-hidden="true">·</span>
              <span>Architecture &amp; Spatial Research</span>
              <span aria-hidden="true">·</span>
              <span>Monograph 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance">
              Calibrating stillness through daylight and raw mass.
            </h1>

            <p className="text-zinc-400 text-base leading-relaxed max-w-xl">
              We engineer contemporary civic institutions, acoustic pavilions, and private residences that anchor themselves deeply to topographical memory.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => onOpenContactModal && onOpenContactModal()}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-950 font-semibold text-xs rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Initiate Project Consultation</span>
            </button>
            <button
              onClick={() => setSelectedProject(projects[0])}
              className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
            >
              View Featured Case Study
            </button>
          </div>

          <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
            <div>
              <span className="text-zinc-500 block">Total Built Portfolio</span>
              <span className="font-mono text-zinc-100 text-sm">48,200 m²</span>
            </div>
            <div className="h-6 w-px bg-zinc-800" />
            <div>
              <span className="text-zinc-500 block">Ongoing Commissions</span>
              <span className="font-mono text-zinc-100 text-sm">14 International Sites</span>
            </div>
            <div className="h-6 w-px bg-zinc-800" />
            <div>
              <span className="text-zinc-500 block">Studio Locations</span>
              <span className="text-zinc-100 text-sm">Zurich · Copenhagen · Tokyo</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 group">
          <ImageWithFallback
            src={localAssets.heroArchitectural}
            alt="Studio Rost Atelier in Zurich with natural sunlight and drafting table"
            fallbackTitle="Atelier Interior"
            aspectRatioClass="aspect-[4/3] lg:aspect-auto lg:h-full"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute bottom-4 left-4 right-4 p-3 bg-zinc-950/85 backdrop-blur-md rounded-xl border border-zinc-800/80 text-xs">
            <span className="text-zinc-400 block font-mono">PRIMARY FACILITY</span>
            <span className="text-white font-medium">Limmat Daylight Atelier &amp; Modeling Studio</span>
          </div>
        </div>
      </section>

      {/* Interactive Image Carousel Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <Layers className="w-3.5 h-3.5 text-zinc-400" />
              <span>INTERACTIVE VISUAL CAROUSEL</span>
              <span>·</span>
              <span>STUDIO ARCHIVES</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
              Monograph Photographic Showcase
            </h2>
          </div>
          <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
            Slide to inspect spatial details
          </span>
        </div>

        <InteractiveCarousel slides={carouselSlides} autoPlayInterval={6000} />
      </section>

      {/* Director Profile & Philosophy */}
      <section className="p-8 bg-zinc-900/60 rounded-2xl border border-zinc-800/80 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-3 flex justify-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-zinc-700">
            <ImageWithFallback
              src={localAssets.creativeDirectorAvatar}
              alt="Helena Rost"
              fallbackTitle="Helena Rost"
              aspectRatioClass="aspect-square"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-9 space-y-4">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="text-white font-semibold text-sm">Helena Rost, SIA</span>
            <span aria-hidden="true">·</span>
            <span>Principal &amp; Spatial Director</span>
            <span aria-hidden="true">·</span>
            <span>ETH Zurich Alumna</span>
          </div>

          <blockquote className="text-zinc-300 text-base md:text-lg italic leading-relaxed">
            "A room is never empty. It is always filled with the volume of natural light, the texture of its walls, and the ambient rhythm of human contemplation."
          </blockquote>

          <div className="flex items-center gap-6 text-xs text-zinc-500 pt-2 font-mono">
            <span>CH-8005 ZURICH</span>
            <span>LICENSED CH &amp; EU</span>
            <span>LEED PLATINUM ACCREDITED</span>
          </div>
        </div>
      </section>

      {/* Filterable Commissions Gallery with Interactive Modal Triggers */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Curated Commissions</h2>
            <p className="text-xs text-zinc-400 mt-1">Click any project to trigger full case study inspection</p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900 rounded-lg border border-zinc-800 text-xs">
            {(['all', 'cultural', 'residential', 'laboratories'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-md capitalize transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-zinc-800 text-white font-medium shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden hover:border-zinc-700 transition-all p-4 space-y-4"
            >
              <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[16/10]">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  fallbackTitle={project.title}
                  aspectRatioClass="aspect-[16/10]"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>{project.location}</span>
                  <span className="font-mono">{project.year}</span>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-zinc-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-800/50 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>{project.area}</span>
                <span className="flex items-center gap-1 text-zinc-400 group-hover:text-white transition-colors">
                  Inspect Modal <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="p-8 bg-zinc-900/40 rounded-2xl border border-zinc-800/80">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-white">Initiate a Spatial Commission</h3>
            <p className="text-xs text-zinc-400">
              Our studio takes on 6 commissions annually to preserve design focus and tectonic precision.
            </p>
          </div>

          {inquirySent ? (
            <div className="p-6 bg-zinc-950 border border-emerald-900/50 rounded-xl flex items-center gap-3 text-emerald-400 text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-medium">Inquiry registered successfully.</p>
                <p className="text-xs text-zinc-400 mt-0.5">Helena Rost will review the topographical scope and respond within 48 hours.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleInquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="Marcus Lindqvist"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="m.lindqvist@domain.ch"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Proposed Site &amp; Typology</label>
                <input
                  type="text"
                  value={inquirySite}
                  onChange={(e) => setInquirySite(e.target.value)}
                  placeholder="e.g. Coastal Residence, Gotland / 350 m²"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-white text-zinc-950 hover:bg-zinc-200 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Submit Project Inquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBookConsultation={(title) => {
          if (onOpenContactModal) onOpenContactModal();
        }}
      />
    </div>
  );
};
