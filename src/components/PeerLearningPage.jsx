import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  FileText,
  Code2,
  ExternalLink,
  Calendar,
  Sun,
  Moon,
  Landmark,
  BookOpen,
} from 'lucide-react';
import { getResources } from '../utils/resourcesStorage';

export default function PeerLearningPage({
  theme = 'dark',
  toggleTheme = () => {},
  navigate = () => {},
}) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load resources from static json via API
  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await getResources();
      setResources(data || []);
    } catch (err) {
      console.error('Failed to fetch resources:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const getCategoryBadgeClass = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'workshop':
        return 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400';
      case 'bootcamp':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400';
      case 'hackathon':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400';
      case 'tech session':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400';
      default:
        return 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400';
    }
  };

  return (
    <div
      className={`min-h-screen bg-slate-100 dark:bg-[#07080a] text-slate-900 dark:text-white font-sans transition-colors duration-200 ${
        theme === 'dark' ? 'dark' : ''
      } flex flex-col justify-between`}
    >
      {/* ── Top Floating Header ── */}
      <header className="sticky top-3 sm:top-6 z-40 w-full px-3 sm:px-6 pointer-events-none">
        <div className="max-w-[1500px] w-full mx-auto bg-white/95 dark:bg-[#121318] text-slate-900 dark:text-white rounded-full px-3 sm:px-6 md:px-7 py-2 sm:py-2.5 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/80 border border-slate-200 dark:border-[#22242c] pointer-events-auto flex items-center justify-between transition-colors duration-200">
          {/* Brand Logo & Back to Home */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer min-w-0 pr-2"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center text-slate-700 dark:text-neutral-300 group-hover:border-sky-500 group-hover:text-sky-500 transition-all shrink-0">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-mono font-bold text-xs sm:text-sm tracking-wider uppercase text-slate-900 dark:text-white truncate">
                  Peer Learning
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 font-semibold">
                  RAC
                </span>
              </div>
            </div>
          </button>

          {/* Right Action Controls: Theme */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-[#191a21] text-slate-700 dark:text-neutral-300 hover:text-sky-500 border border-slate-200 dark:border-[#2b2d38] transition-all cursor-pointer"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Body ── */}
      <main className="flex-grow max-w-[1540px] w-[94%] mx-auto py-10 sm:py-14 lg:py-16">
        
        {/* ── Hero Heading Section ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-mono font-semibold mb-4 tracking-wider uppercase shadow-sm">
            <Landmark className="w-4 h-4" />
            <span>Peer Learning Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-4">
            Events & Workshops{' '}
            <span className="text-sky-600 dark:text-sky-400">Resources</span>
          </h1>
        </div>

        {/* ── Resources Grid or Empty State ── */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-slate-500 dark:text-neutral-400">Loading resources...</p>
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-slate-300 dark:border-[#262832] bg-white/50 dark:bg-[#111216]/50">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-neutral-600" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No resources found
            </h3>
            <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-md mx-auto mb-6">
              Workshop presentations, slides, starter code, and documentation will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {resources.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200 dark:border-[#262832] bg-white dark:bg-[#111216] p-6 sm:p-7 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/70 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-[#383b48] group"
              >
                <div>
                  {/* Top Row: Category Pill + Date */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${getCategoryBadgeClass(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-neutral-400 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Resource Title */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-neutral-300 text-sm leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-slate-100 dark:bg-[#191a21] text-slate-600 dark:text-neutral-400 border border-slate-200 dark:border-[#2a2d38]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Resource Links / Action Buttons */}
                <div className="pt-5 border-t border-slate-100 dark:border-[#22242c] flex flex-wrap items-center gap-2">
                  {item.slidesUrl && (
                    <a
                      href={item.slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-[#1a1c24] dark:hover:bg-[#252834] text-slate-800 dark:text-neutral-200 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-sky-500" />
                      <span>Slides</span>
                    </a>
                  )}

                  {item.codeUrl && (
                    <a
                      href={item.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-[#1a1c24] dark:hover:bg-[#252834] text-slate-800 dark:text-neutral-200 transition-colors"
                    >
                      <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Code Repo</span>
                    </a>
                  )}

                  {item.docsUrl && (
                    <a
                      href={item.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-[#1a1c24] dark:hover:bg-[#252834] text-slate-800 dark:text-neutral-200 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
                      <span>Guide & Notes</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* ── Footer ── */}
      <footer className="w-full py-8 border-t border-slate-200 dark:border-[#18181c] bg-white dark:bg-[#08080a] text-center text-xs text-slate-500 dark:text-neutral-400">
        <p>© {new Date().getFullYear()} Robotics & Automation Club. Peer Learning & Workshop Resources.</p>
      </footer>
    </div>
  );
}
