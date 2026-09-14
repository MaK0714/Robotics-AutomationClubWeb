import React from 'react';

export default function WingsSection({ navigate = () => {} }) {
  return (
    <section id="wings" className="relative py-10 sm:py-14 lg:py-16 bg-slate-100 dark:bg-black transition-colors duration-200 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-[1540px] w-[96%] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: WINGS */}
        <div className="mb-6 sm:mb-8 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white transition-colors">
            WINGS
          </h2>
        </div>

        {/* 2-Column Split Card Container matching wireframe drawing */}
        <div className="w-full rounded-[24px] sm:rounded-[32px] border border-slate-300 dark:border-[#2a2d36] bg-white dark:bg-[#111216] shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/80 overflow-hidden transition-colors duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-300 dark:divide-[#2a2d36]">
            
            {/* ── Left Half: Software ── */}
            <div className="p-7 sm:p-10 lg:p-14 flex flex-col justify-between min-h-[300px] sm:min-h-[380px]">
              <div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 sm:mb-6 transition-colors">
                  Software
                </h3>
                <p className="text-slate-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed font-normal transition-colors max-w-xl">
                  Driving autonomous intelligence through robot operating systems (ROS 2), computer vision, kinematics, and embedded control algorithms tailored for real-time automation.
                </p>
              </div>
              <div className="pt-8 sm:pt-10">
                <button
                  type="button"
                  onClick={() => navigate('/wings/software')}
                  className="px-6 py-2 sm:py-2.5 rounded-xl border border-slate-800 dark:border-[#3b3e4a] hover:border-slate-600 dark:hover:border-neutral-200 bg-slate-900 hover:bg-slate-800 dark:bg-[#181920] dark:hover:bg-neutral-200 text-white dark:text-neutral-200 dark:hover:text-black text-sm sm:text-base font-medium tracking-wide transition-all duration-200 active:scale-95 cursor-pointer inline-flex items-center justify-center select-none"
                >
                  Know more
                </button>
              </div>
            </div>

            {/* ── Right Half: Hardware ── */}
            <div className="p-7 sm:p-10 lg:p-14 flex flex-col justify-between min-h-[300px] sm:min-h-[380px]">
              <div>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 sm:mb-6 transition-colors">
                  Hardware
                </h3>
                <p className="text-slate-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed font-normal transition-colors max-w-xl">
                  Designing robust mechanical chassis, precision sensor-actuator integration, custom PCB circuitry, and power distribution systems built for industrial robotics.
                </p>
              </div>
              <div className="pt-8 sm:pt-10">
                <button
                  type="button"
                  onClick={() => navigate('/wings/hardware')}
                  className="px-6 py-2 sm:py-2.5 rounded-xl border border-slate-800 dark:border-[#3b3e4a] hover:border-slate-600 dark:hover:border-neutral-200 bg-slate-900 hover:bg-slate-800 dark:bg-[#181920] dark:hover:bg-neutral-200 text-white dark:text-neutral-200 dark:hover:text-black text-sm sm:text-base font-medium tracking-wide transition-all duration-200 active:scale-95 cursor-pointer inline-flex items-center justify-center select-none"
                >
                  Know more
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

