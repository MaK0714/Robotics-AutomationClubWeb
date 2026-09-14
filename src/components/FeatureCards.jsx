import React from 'react';
import { Landmark, BookOpen } from 'lucide-react';

export default function FeatureCards({ navigate = () => {} }) {
  const cards = [
    {
      title: 'Peer Learning',
      subtitle: 'Events & Workshops Resources',
      icon: Landmark,
      id: 'peer-learning',
      href: '/peer-learning',
    },
    {
      title: 'Digital Library',
      subtitle: 'Documentation & Knowledge Vault',
      icon: BookOpen,
      id: 'digital-library',
      href: '/digital-library',
    },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    if (typeof navigate === 'function') {
      navigate(href);
    } else if (typeof window !== 'undefined') {
      window.history.pushState(null, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section className="relative py-10 sm:py-14 lg:py-16 bg-slate-100 dark:bg-black transition-colors duration-200">
      <div className="max-w-[1200px] w-[96%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 pt-7">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.id}
                href={card.href}
                onClick={(e) => handleClick(e, card.href)}
                className="relative block bg-white dark:bg-[#1e1f24] text-slate-900 dark:text-white rounded-3xl p-8 pt-12 sm:pt-14 text-center shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/80 border border-slate-200 dark:border-[#2e3038] hover:border-sky-500/50 dark:hover:border-sky-500/40 cursor-pointer transition-all duration-200 hover:-translate-y-1.5 group select-none outline-none focus:ring-2 focus:ring-sky-500/50"
              >
                {/* Floating circular icon badge at top center */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white dark:bg-[#1e1f24] shadow-xl border border-slate-200 dark:border-[#2e3038] flex items-center justify-center text-sky-600 dark:text-white transition-transform duration-200 group-hover:scale-105 group-hover:border-sky-500/50 pointer-events-none">
                  <Icon className="w-6 h-6 text-sky-600 dark:text-white" />
                </div>

                {/* Card Title */}
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {card.title}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
