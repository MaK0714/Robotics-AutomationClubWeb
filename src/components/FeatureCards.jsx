import React from 'react';
import { Landmark, BookOpen, Trophy } from 'lucide-react';

export default function FeatureCards() {
  const cards = [
    {
      title: 'Peer Learning',
      icon: Landmark,
      id: 'peer-learning',
    },
    {
      title: 'Digital Library',
      icon: BookOpen,
      id: 'digital-library',
    },
    {
      title: 'Reach Your Goals',
      icon: Trophy,
      id: 'reach-goals',
    },
  ];

  return (
    <section className="relative pt-6 pb-20 sm:pt-10 sm:pb-28 bg-slate-100 dark:bg-black transition-colors duration-200">
      <div className="max-w-[1580px] w-[97%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-8 lg:gap-12 pt-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => {}}
                className="relative bg-white dark:bg-[#1e1f24] text-slate-900 dark:text-white rounded-3xl p-8 pt-12 sm:pt-14 text-center shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/80 border border-slate-200 dark:border-[#2e3038] cursor-pointer transition-all duration-200 hover:-translate-y-1.5 group"
              >
                {/* Floating circular icon badge at top center */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white dark:bg-[#1e1f24] shadow-xl border border-slate-200 dark:border-[#2e3038] flex items-center justify-center text-sky-600 dark:text-white transition-transform duration-200 group-hover:scale-105">
                  <Icon className="w-6 h-6 text-sky-600 dark:text-white" />
                </div>

                {/* Card Title */}
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {card.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
