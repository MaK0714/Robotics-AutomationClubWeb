import React from 'react';

export default function MissionVisionValues() {
  const cards = [
    {
      title: 'VISION',
      description:
        'To pioneer an open, multidisciplinary ecosystem building advanced autonomous machines that solve real-world challenges.',
    },
    {
      title: 'MISSION',
      description:
        'To empower student engineers with practical robotics research, hands-on fabrication, and cutting-edge automation innovation.',
    },
    {
      title: 'VALUES',
      description:
        'Fostering curiosity, technical integrity, relentless experimentation, and collaborative peer mentorship.',
    },
  ];

  return (
    <section id="about" className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 bg-slate-100 dark:bg-black transition-colors duration-200 scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-[1580px] w-[97%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-stretch">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1e1f24] border border-slate-200 dark:border-[#2e3038] rounded-3xl p-10 sm:p-12 lg:p-14 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/80 text-center flex flex-col justify-center min-h-[220px] sm:min-h-[250px] cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 z-10 hover:z-20"
            >
              {/* Card Title */}
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-sky-600 dark:text-sky-400 mb-4 transition-colors">
                {card.title}
              </h3>

              {/* Card Description */}
              <p className="text-slate-600 dark:text-sky-100/80 text-base sm:text-lg leading-relaxed font-normal transition-colors">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
