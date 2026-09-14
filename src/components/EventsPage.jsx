import React from 'react';
import { ArrowLeft, Sun, Moon } from 'lucide-react';

export default function EventsPage({
  theme = 'dark',
  toggleTheme = () => {},
  navigate = () => {},
}) {
  return (
    <div className={`min-h-screen bg-slate-100 dark:bg-[#07080a] text-slate-900 dark:text-white font-sans transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''} flex flex-col justify-between`}>
      
      {/* Top Floating Navbar Header */}
      <header className="sticky top-3 sm:top-6 z-40 w-full px-3 sm:px-6">
        <div className="max-w-[1500px] w-full mx-auto bg-white/95 dark:bg-[#121318] text-slate-900 dark:text-white rounded-full px-3 sm:px-6 md:px-7 py-2 sm:py-2.5 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/80 border border-slate-200 dark:border-[#22242c] flex items-center justify-between transition-colors duration-200">
          
          {/* Left: Brand Logo & Title */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer min-w-0 pr-2"
          >
            <div className="w-7 h-7 sm:w-8 md:w-9 sm:h-8 md:h-9 rounded-full bg-slate-100 dark:bg-white flex items-center justify-center p-0.5 border border-slate-200 dark:border-transparent shrink-0">
              <img
                src="/logo.png"
                alt="Robotics & Automation Club Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="min-w-0 flex flex-col sm:block">
              <span className="text-xs sm:text-base font-extrabold tracking-tight text-slate-900 dark:text-white truncate block sm:inline sm:whitespace-nowrap leading-tight">
                Robotics & Automation
                <span className="hidden sm:inline"> Club</span>
              </span>
              <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider leading-none sm:hidden">
                Club
              </span>
            </div>
          </button>

          {/* Right: Actions (Theme toggle + Back to Events button) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#1c1e26] dark:hover:bg-[#252833] text-slate-700 dark:text-yellow-400 border border-slate-200 dark:border-transparent transition-all flex items-center justify-center cursor-pointer active:scale-95"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              type="button"
              onClick={() => navigate('/#events')}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 dark:bg-[#1f2129] dark:hover:bg-[#282b35] border border-slate-700 dark:border-[#353844] shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Center Content: simply upcoming aligned from left to center */}
      <main className="max-w-[1200px] w-[92%] mx-auto py-16 sm:py-24 text-center flex flex-col items-center justify-center flex-grow">
        <h1 className="text-[10vw] sm:text-7xl lg:text-9xl font-black tracking-widest text-slate-900 dark:text-white uppercase leading-none select-none animate-pulse max-w-full overflow-hidden text-ellipsis px-2">
          Upcoming<span className="text-sky-600 dark:text-sky-400">...</span>
        </h1>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs font-mono text-slate-500 dark:text-neutral-500 border-t border-slate-200 dark:border-[#14151a]">
        Robotics & Automation Club &bull; Events Portal
      </footer>

    </div>
  );
}

