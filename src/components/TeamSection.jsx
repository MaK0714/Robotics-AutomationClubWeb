import React from 'react';

export default function TeamSection() {
  return (
    <section className="relative py-10 sm:py-14 lg:py-16 bg-slate-100 dark:bg-black transition-colors duration-200">
      <div className="max-w-[1580px] w-[97%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full-width Team Photo Container */}
        <div className="relative w-full rounded-3xl sm:rounded-[36px] overflow-hidden border border-slate-200 dark:border-[#2e3038] bg-white dark:bg-[#1e1f24] shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/90 group">
          {/* Subtle tech ambient glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-blue-500/10 blur-2xl -z-10" />

          {/* Top-Left # team pic badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 px-4 py-2 rounded-full sm:rounded-2xl bg-black/80 backdrop-blur-md border border-neutral-700/80 shadow-xl">
            <span className="text-white font-mono font-bold text-sm sm:text-base md:text-lg tracking-wider">
              # team pic
            </span>
          </div>

          <img
            src="/TeamPhoto.png"
            alt="Robotics & Automation Club Team"
            className="w-full h-full object-cover block rounded-3xl sm:rounded-[36px]"
          />
        </div>
      </div>
    </section>
  );
}
