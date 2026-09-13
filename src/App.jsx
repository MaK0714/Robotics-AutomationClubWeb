import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MissionVisionValues from './components/MissionVisionValues';
import FeatureCards from './components/FeatureCards';
import TeamSection from './components/TeamSection';
import TeamMembers from './components/TeamMembers';
import ReviewSection from './components/ReviewSection';
import Footer from './components/Footer';

export default function App() {
  // Theme state: defaults strictly to 'dark' mode
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rac-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('rac-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    // Disable browser automatic scroll restoration to previous position/hash on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll directly to top (Home) on page load/refresh
    window.scrollTo(0, 0);

    // If a hash like #team exists in the URL, remove it so browser doesn't jump to it
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <div className={`min-h-screen bg-slate-100 dark:bg-black text-slate-900 dark:text-white font-sans selection:bg-cyan-500 selection:text-black transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Sticky floating Navbar with Light/Dark toggle */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* 1. Description & Video */}
        <HeroSection />
        
        {/* 2. Vision, Mission, Values */}
        <MissionVisionValues />

        {/* 3. Peer Learning, Digital Library, Reach Your Goals */}
        <FeatureCards />

        {/* 4. Large Team Photo Section */}
        <TeamSection />

        {/* 5. Individual Team Members — Orbital carousel */}
        <TeamMembers />

        {/* 6. User Reviews & Feedback */}
        <ReviewSection />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
