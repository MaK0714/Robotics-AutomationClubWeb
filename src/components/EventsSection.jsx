import React from 'react';

export default function EventsSection({ navigate = () => {} }) {
  return (
    <section id="events" className="relative py-10 sm:py-14 lg:py-16 bg-slate-100 dark:bg-black transition-colors duration-200 scroll-mt-20 sm:scroll-mt-24">
      {/* Container width decreased by 20% of original (1232px / 78% width instead of 1540px / 96%) */}
      <div className="max-w-[1232px] w-[92%] md:w-[78%] mx-auto px-4 sm:px-6">
        
        {/* Section Header: Events aligned directly with the card */}
        <div className="mb-4 sm:mb-6 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors">
            Events
          </h2>
        </div>

        {/* Events Card matching user sketch */}
        <div className="w-full rounded-[24px] sm:rounded-[32px] border border-slate-300 dark:border-[#2a2d36] bg-white dark:bg-[#111216] shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/80 p-7 sm:p-10 lg:p-12 transition-colors duration-200">
          <div className="flex flex-col items-start text-left">
            <p className="text-slate-800 dark:text-neutral-200 text-lg sm:text-2xl font-medium leading-relaxed transition-colors mb-6 sm:mb-8">
              We conduct different types of events and workshops for betterment of peer
            </p>
            <button
              type="button"
              onClick={() => navigate('/events')}
              className="px-6 py-2.5 sm:py-3 rounded-xl border border-slate-800 dark:border-[#3b3e4a] hover:border-slate-600 dark:hover:border-neutral-200 bg-slate-900 hover:bg-slate-800 dark:bg-[#181920] dark:hover:bg-neutral-200 text-white dark:text-neutral-200 dark:hover:text-black text-sm sm:text-base font-medium tracking-wide transition-all duration-200 active:scale-95 cursor-pointer inline-flex items-center justify-center select-none shadow-sm"
            >
              Know more
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

