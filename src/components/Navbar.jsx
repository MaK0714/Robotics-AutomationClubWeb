import React, { useState } from 'react';
import { Menu, X, ChevronRight, Sun, Moon } from 'lucide-react';

export default function Navbar({ theme = 'dark', toggleTheme = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Wings', href: '#wings' },
    { name: 'Events', href: '#events' },
    { name: 'Team', href: '#team' },
    { name: 'Review', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === '#' || href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-3 sm:top-6 z-50 w-full px-3 sm:px-6 pointer-events-none">
      {/* Floating capsule: adapts to light/dark seamlessly */}
      <header className="max-w-[1500px] w-full mx-auto bg-white/95 dark:bg-[#1e1f24] text-slate-900 dark:text-white rounded-full px-3 sm:px-6 md:px-8 py-2 sm:py-2.5 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/80 border border-slate-200/80 dark:border-[#2e3038] pointer-events-auto flex items-center justify-between transition-colors duration-200">
        
        {/* Left Extreme: Brand Title & Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2 group"
        >
          <div className="p-0.5 rounded-full bg-slate-100 dark:bg-white flex items-center justify-center border border-slate-200 dark:border-transparent shrink-0">
            <img
              src="/logo.png"
              alt="Robotics & Automation Club Logo"
              className="w-7 h-7 sm:w-8 md:w-9 sm:h-8 md:h-9 object-contain rounded-full"
            />
          </div>
          <div className="min-w-0 flex flex-col sm:block">
            <span className="text-xs sm:text-base md:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white truncate block sm:inline sm:whitespace-nowrap leading-tight">
              Robotics & Automation
              <span className="hidden sm:inline"> Club</span>
            </span>
            <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider leading-none sm:hidden">
              Club
            </span>
          </div>
        </a>

        {/* Center/Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="inline-block text-sm sm:text-base font-bold text-slate-700 dark:text-neutral-200 cursor-pointer hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Extreme: Theme Toggle + Join Club Action Button */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Light / Dark Mode Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleTheme();
            }}
            className="p-2 rounded-full text-slate-700 dark:text-neutral-200 bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-neutral-700 hover:border-sky-400/60 transition-all cursor-pointer flex items-center justify-center active:scale-95"
            aria-label="Toggle Theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 hover:text-amber-300 transition-colors" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 hover:text-slate-900 transition-colors" />
            )}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm md:text-base font-bold text-white bg-slate-900 dark:bg-black border border-slate-700 dark:border-neutral-700 shadow-md cursor-pointer hover:border-sky-400/50 transition-colors"
          >
            Join Club
          </a>
        </div>

        {/* Mobile: Toggle + Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:hidden shrink-0">
          {/* Mobile Theme Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleTheme();
            }}
            className="w-8 h-8 rounded-full text-slate-700 dark:text-neutral-200 bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-neutral-700 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
            aria-label="Toggle Theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 rounded-full text-slate-700 dark:text-neutral-200 bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-neutral-700 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden mt-2.5 max-w-[1500px] w-full mx-auto rounded-3xl bg-white dark:bg-[#1e1f24] text-slate-900 dark:text-white border border-slate-200 dark:border-[#2e3038] shadow-2xl p-4 space-y-2 pointer-events-auto transition-colors duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm sm:text-base font-bold text-slate-800 dark:text-neutral-200 cursor-pointer hover:bg-slate-100 dark:hover:bg-neutral-800/60 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
            >
              {link.name}
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-neutral-400" />
            </a>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-neutral-800 space-y-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm sm:text-base font-bold text-slate-800 dark:text-neutral-200 bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-neutral-700 cursor-pointer"
            >
              <span>Appearance</span>
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400">
                {theme === 'dark' ? <><Sun className="w-3.5 h-3.5 text-amber-400" /> Dark Mode</> : <><Moon className="w-3.5 h-3.5 text-slate-700" /> Light Mode</>}
              </span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full flex items-center justify-center py-2.5 rounded-full text-sm sm:text-base font-bold text-white bg-slate-900 dark:bg-black border border-slate-700 dark:border-neutral-700 cursor-pointer hover:border-sky-400/50"
            >
              Join Club
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
