import React from 'react';

export default function MissionVisionValues() {
  const cards = [
    {
      title: 'VISION',
      description:
        'Our vision is to inspire and empower students to explore emerging technologies and develop intelligent solutions that shape the future. We aim to foster a culture where creativity, innovation, and technical excellence come together to transform ideas into meaningful real-world impact.',
    },
    {
      title: 'MISSION',
      description:
        'Our mission is to create a collaborative and hands-on learning environment where students can experiment, build, and apply their knowledge through practical projects. We strive to develop technical expertise, problem-solving abilities, and teamwork while encouraging students to continuously learn, innovate, and take on real-world challenges.',
    },
    {
      title: 'VALUES',
      description:
        'We believe in innovation, curiosity, collaboration, excellence, and impact. We encourage members to think creatively, question existing approaches, learn through experimentation, support one another, maintain high standards, and use technology to create solutions that make a meaningful difference.',
    },
  ];

  return (
    <section id="about" className="relative py-10 sm:py-14 lg:py-16 bg-slate-100 dark:bg-black transition-colors duration-200 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-[1580px] w-[97%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1e1f24] border border-slate-200 dark:border-[#2e3038] rounded-3xl p-7 sm:p-9 lg:p-11 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/80 text-center flex flex-col justify-center min-h-[260px] sm:min-h-[300px] cursor-pointer transform transition-all duration-300 ease-out hover:scale-105 z-10 hover:z-20"
            >
              {/* Card Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-sky-600 dark:text-sky-400 mb-4 transition-colors">
                {card.title}
              </h3>

              {/* Card Description */}
              <p className="text-slate-600 dark:text-sky-100/80 text-sm sm:text-base lg:text-[1.02rem] leading-relaxed font-normal transition-colors">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
