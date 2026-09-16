import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Sun,
  Moon,
  LibraryBig,
  BookOpen,
  PlayCircle,
  FileText,
  MonitorPlay,
  Lightbulb,
} from 'lucide-react';
import { getLibraryItems } from '../utils/libraryStorage';

export default function DigitalLibraryPage({
  theme = 'dark',
  toggleTheme = () => {},
  navigate = () => {},
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getLibraryItems();
      setItems(data || []);
    } catch (err) {
      console.error('Failed to fetch library items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'YouTube Playlist':
      case 'YouTube Video':
        return <PlayCircle className="w-5 h-5 text-red-500" />;
      case 'Book':
        return <BookOpen className="w-5 h-5 text-amber-500" />;
      case 'Documentation / Guide':
        return <FileText className="w-5 h-5 text-sky-500" />;
      case 'Course / Tutorial':
        return <MonitorPlay className="w-5 h-5 text-emerald-500" />;
      default:
        return <Lightbulb className="w-5 h-5 text-purple-500" />;
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
                  Digital Library
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold">
                  RAC
                </span>
              </div>
            </div>
          </button>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-[#191a21] text-slate-700 dark:text-neutral-300 hover:text-sky-500 border border-slate-200 dark:border-[#2b2d38] transition-all cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Body ── */}
      <main className="flex-grow max-w-[1540px] w-[94%] mx-auto py-10 sm:py-14 lg:py-16">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-mono font-semibold mb-4 tracking-wider uppercase shadow-sm">
            <LibraryBig className="w-4 h-4" />
            <span>Open Source Learning</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-4">
            Digital <span className="text-emerald-600 dark:text-emerald-400">Library</span>
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm text-slate-500 dark:text-neutral-400">Loading library items...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-slate-300 dark:border-[#262832] bg-white/50 dark:bg-[#111216]/50">
            <LibraryBig className="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-neutral-600" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No resources found</h3>
            <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-md mx-auto mb-6">
              Books, playlists, and tutorials will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200 dark:border-[#262832] bg-white dark:bg-[#111216] p-6 sm:p-7 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/70 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-[#383b48] group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                      {getTypeIcon(item.type)}
                      <span>{item.type}</span>
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  {item.author && (
                    <p className="text-sm font-semibold text-slate-500 dark:text-neutral-400 mb-3">
                      By {item.author}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-slate-600 dark:text-neutral-300 text-sm leading-relaxed mb-6 font-normal">
                      {item.description}
                    </p>
                  )}
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
                <div className="pt-5 border-t border-slate-100 dark:border-[#22242c] flex items-center justify-between gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 transition-colors"
                  >
                    <span>Access Resource</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="w-full py-8 border-t border-slate-200 dark:border-[#18181c] bg-white dark:bg-[#08080a] text-center text-xs text-slate-500 dark:text-neutral-400">
        <p>© {new Date().getFullYear()} Robotics & Automation Club. Digital Library.</p>
      </footer>
    </div>
  );
}
