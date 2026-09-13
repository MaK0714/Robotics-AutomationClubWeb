import React, { useState } from 'react';
import { Menu, X, ChevronRight, Sun, Moon } from 'lucide-react';

export default function Navbar({ theme = 'dark', toggleTheme = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Wings', href: '#domains' },
    { name: 'Projects', href: '#projects' },
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
    <div className="sticky top-6 sm:top-8 z-50 w-full px-2 sm:px-4 pointer-events-none">
      {/* Floating capsule: adapts to light/dark seamlessly */}
      <header className="max-w-[1500px] w-[96%] mx-auto bg-white/95 dark:bg-[#1e1f24] text-slate-900 dark:text-white rounded-full px-5 sm:px-8 py-2 sm:py-2.5 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/80 border border-slate-200/80 dark:border-[#2e3038] pointer-events-auto flex items-center justify-between transition-colors duration-200">
        
        {/* Left Extreme: Brand Title & Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="flex items-center gap-3"
        >
          <div className="p-0.5 rounded-full bg-slate-100 dark:bg-white flex items-center justify-center border border-slate-200 dark:border-transparent">
            <img
              src="/logo.png"
              alt="Robotics & Automation Club Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-full"
            />
          </div>
          <span className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            Robotics & Automation Club
          </span>
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
        <div className="hidden md:flex items-center gap-3">
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
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Theme Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleTheme();
            }}
            className="p-1.5 rounded-full text-slate-700 dark:text-neutral-200 bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-neutral-700 focus:outline-none"
            aria-label="Toggle Theme"
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
            className="p-1.5 rounded-full text-slate-700 dark:text-neutral-200 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 max-w-[1500px] w-[96%] mx-auto rounded-3xl bg-white dark:bg-[#1e1f24] text-slate-900 dark:text-white border border-slate-200 dark:border-[#2e3038] shadow-2xl p-4 space-y-2.5 pointer-events-auto transition-colors duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="flex items-center justify-between px-4 py-2.5 rounded-2xl text-base font-bold text-slate-800 dark:text-neutral-200 cursor-pointer hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
            >
              {link.name}
              <ChevronRight className="w-5 h-5 text-slate-400 dark:text-neutral-400" />
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
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-base font-bold text-slate-800 dark:text-neutral-200 bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-neutral-700 cursor-pointer"
            >
              <span>Appearance</span>
              <span className="flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400">
                {theme === 'dark' ? <><Sun className="w-4 h-4 text-amber-400" /> Dark Mode</> : <><Moon className="w-4 h-4 text-slate-700" /> Light Mode</>}
              </span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full flex items-center justify-center py-2.5 rounded-full text-base font-bold text-white bg-slate-900 dark:bg-black border border-slate-700 dark:border-neutral-700 cursor-pointer"
            >
              Join Club
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
