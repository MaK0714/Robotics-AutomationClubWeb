import React, { useRef } from 'react';

export default function HeroSection() {
  const videoRef = useRef(null);

  // Replay video after 7 seconds delay on each iteration
  const handleVideoEnded = () => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 7000);
  };

  return (
    <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 bg-slate-100 dark:bg-black transition-colors duration-200">
      <div className="max-w-[1540px] w-[96%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Single container div containing both Description and Video */}
        <div className="relative w-full rounded-[32px] sm:rounded-[42px] bg-[#dee4e5] overflow-hidden p-6 sm:p-8 lg:p-12 shadow-2xl shadow-neutral-900/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Description inside same div */}
            <div className="lg:col-span-5 xl:col-span-4 text-left z-10 flex flex-col justify-center space-y-4 sm:space-y-5 font-space">
              <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-slate-950 tracking-tight leading-[1.15]">
                Building the Future 
              </h2>

              <p className="text-base sm:text-lg text-slate-800 font-normal leading-relaxed">
                A student-driven community focused on exploring <span className="font-semibold text-slate-950">robotics</span>, <span className="font-semibold text-slate-950">automation</span>, and <span className="font-semibold text-slate-950">emerging technologies</span> through hands-on projects, innovation, and collaboration.
              </p>

              <div className="border-l-2 border-slate-400 pl-4 py-1">
                <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                  We aim to turn ideas into real-world solutions while building technical skills, creativity, and problem-solving capabilities.
                </p>
              </div>
            </div>

            {/* Video inside same div */}
            <div className="lg:col-span-7 xl:col-span-8 w-full flex items-center justify-center">
              <div className="relative w-full rounded-[24px] sm:rounded-[34px] overflow-hidden bg-[#dee4e5]">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnded}
                  className="w-full h-auto max-h-[640px] sm:max-h-[720px] lg:max-h-[760px] object-cover block"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 98%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 98%, transparent 100%)',
                  }}
                >
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

