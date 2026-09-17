import React, { useState, useRef, useEffect } from 'react';
import { Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';

export default function Footer({ navigate = () => {} }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contactRef.current && !contactRef.current.contains(e.target)) {
        setIsContactOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsContactOpen(false);
      }
    };
    if (isContactOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isContactOpen]);

  const contactList = [
    {
      name: 'Mayuresh Kulkarni',
      email: '325mayuresh0012@dbit.in',
    },
    {
      name: 'Rohan Jagdale',
      email: 'rohanjagdale0905@gmail.com',
    },
    {
      name: 'Om Patil',
      email: '225om139@gmail.com',
    },
  ];

  const handleScroll = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white dark:bg-[#08080a] border-t border-slate-200 dark:border-[#18181c] transition-colors duration-200 pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-12 text-slate-800 dark:text-neutral-200">
      <div className="max-w-[1540px] w-[94%] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Well balanced across full width */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 sm:pb-16 border-b border-slate-200/80 dark:border-[#18181c]">
          
          {/* Column 1: Brand (3-Line Stacked Bold Filled Layout) */}
          <div className="md:col-span-5 flex flex-col justify-start">
            {/* 3-Line Stacked Bold Title with & aligned directly above N (+25% scaled) */}
            <h3 className="inline-flex flex-col w-fit font-black uppercase tracking-tight leading-[1.03] text-slate-900 dark:text-white select-none text-[2.35rem] sm:text-[2.85rem] lg:text-[3.3rem]">
              <div className="w-full flex items-baseline justify-between">
                <span>ROBOTICS</span>
                <span className="text-sky-600 dark:text-sky-400 font-extrabold">&</span>
              </div>
              <div>AUTOMATION</div>
              <div className="text-sky-600 dark:text-sky-400">CLUB</div>
            </h3>
          </div>

          {/* Column 2: Important Links in a 2-Column Subgrid (takes 4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-start">
            <h4 className="text-lg sm:text-[1.3rem] font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-4 bg-sky-500 rounded-full" />
              Important Links
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-base sm:text-[1.1rem]">
              <a
                href="#about"
                onClick={(e) => handleScroll(e, '#about')}
                className="text-slate-600 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                About Us
              </a>
              <a
                href="#team"
                onClick={(e) => handleScroll(e, '#team')}
                className="text-slate-600 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                Team
              </a>
              <a
                href="#wings"
                onClick={(e) => handleScroll(e, '#wings')}
                className="text-slate-600 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                Wings
              </a>
              <a
                href="#events"
                onClick={(e) => handleScroll(e, '#events')}
                className="text-slate-600 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                Events
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, '#contact')}
                className="text-slate-600 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                Leave Review
              </a>

              <div className="relative inline-block" ref={contactRef}>
                <button
                  type="button"
                  onClick={() => setIsContactOpen((prev) => !prev)}
                  className={`text-slate-600 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer text-left ${
                    isContactOpen ? 'text-sky-600 dark:text-sky-400 font-semibold' : ''
                  }`}
                >
                  Contact
                </button>

                {/* Pop-up Card showing written info only (scaled up +25%) */}
                {isContactOpen && (
                  <div className="absolute bottom-full mb-3 left-0 sm:-left-4 z-50 w-[310px] sm:w-[350px] rounded-2xl bg-white dark:bg-[#121318] border border-slate-200 dark:border-[#282a36] p-5 shadow-2xl shadow-slate-300/60 dark:shadow-black/90 animate-fade-in text-left">
                    <div className="space-y-4">
                      {contactList.map((contact, idx) => (
                        <div key={idx}>
                          <p className="text-[17px] sm:text-[1.1rem] font-bold text-slate-900 dark:text-white leading-tight">
                            {contact.name}
                          </p>
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-[14px] sm:text-[15px] font-mono text-slate-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors break-all block mt-1"
                          >
                            {contact.email}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Column 3: Socials & Back to Top (takes 3 cols) */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-lg sm:text-[1.3rem] font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-4 bg-sky-500 rounded-full" />
                Socials
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/robotics-and-automation-club-dbit-924ba1436?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-[#111217] border border-slate-200 dark:border-[#1f2129] flex items-center justify-center text-slate-600 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-500/50 hover:scale-105 active:scale-95 transition-all shadow-sm"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/roboticsclub.dbit?stkn=Zzk0bTNrcjVveGFu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-[#111217] border border-slate-200 dark:border-[#1f2129] flex items-center justify-center text-slate-600 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-500/50 hover:scale-105 active:scale-95 transition-all shadow-sm"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="mailto:dbit.robovation@gmail.com"
                  aria-label="Email"
                  className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-[#111217] border border-slate-200 dark:border-[#1f2129] flex items-center justify-center text-slate-600 dark:text-neutral-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-500/50 hover:scale-105 active:scale-95 transition-all shadow-sm"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors w-fit group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#14151b] border border-slate-200 dark:border-[#22242c] flex items-center justify-center group-hover:border-sky-500/50 group-hover:-translate-y-0.5 transition-all">
                <ArrowUp className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>
              <span>Back to top</span>
            </button>
          </div>

        </div>

        {/* Bottom Full-Width Bar: Balanced Attribution & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-sm sm:text-[1.05rem] text-slate-600 dark:text-neutral-400">
              Faculty coordinator:{' '}
              <span className="text-sky-600 dark:text-sky-400 font-semibold">
                Prof. Madhavi Pednekar
              </span>
            </p>
            <p className="text-xs sm:text-[0.95rem] text-slate-500 dark:text-neutral-500 font-medium">
              (HOD ELECTRONICS AND TELECOMMUNICATION)
            </p>
          </div>
          <p className="text-xs sm:text-[0.95rem] text-slate-500 dark:text-neutral-500 font-mono">
            © 2026 Robotics & Automation Club. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
