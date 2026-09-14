import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MissionVisionValues from './components/MissionVisionValues';
import FeatureCards from './components/FeatureCards';
import TeamSection from './components/TeamSection';
import TeamMembers from './components/TeamMembers';
import ReviewSection from './components/ReviewSection';
import Footer from './components/Footer';
import MembersPage from './components/MembersPage';
import WingsSection from './components/WingsSection';
import EventsSection from './components/EventsSection';
import UpcomingPage from './components/UpcomingPage';
import EventsPage from './components/EventsPage';
import PeerLearningPage from './components/PeerLearningPage';
import DigitalLibraryPage from './components/DigitalLibraryPage';

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

  // Pure frontend routing based on window.location.pathname & history API
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (path.startsWith('/#')) {
      const hash = path.replace('/', '');
      if (currentRoute !== '/') {
        window.history.pushState(null, '', '/');
        setCurrentRoute('/');
      }
      setTimeout(() => {
        const id = hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    window.history.pushState(null, '', path);
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentRoute === '/') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }, [currentRoute]);

  // If route is /members (or direct link access), render the dedicated Members Page
  if (currentRoute === '/members') {
    return (
      <MembersPage
        theme={theme}
        toggleTheme={toggleTheme}
        navigate={navigate}
      />
    );
  }

  // If route is /wings/software (or /software), render Software Upcoming Page
  if (currentRoute === '/wings/software' || currentRoute === '/software' || currentRoute === '/wings-software') {
    return (
      <UpcomingPage
        wing="Software"
        theme={theme}
        toggleTheme={toggleTheme}
        navigate={navigate}
      />
    );
  }

  // If route is /wings/hardware (or /hardware), render Hardware Upcoming Page
  if (currentRoute === '/wings/hardware' || currentRoute === '/hardware' || currentRoute === '/wings-hardware') {
    return (
      <UpcomingPage
        wing="Hardware"
        theme={theme}
        toggleTheme={toggleTheme}
        navigate={navigate}
      />
    );
  }

  // If route is /peer-learning (or /peerlearning), render Peer Learning Resources Page
  if (currentRoute === '/peer-learning' || currentRoute === '/peerlearning') {
    return (
      <PeerLearningPage
        theme={theme}
        toggleTheme={toggleTheme}
        navigate={navigate}
      />
    );
  }

  // If route is /digital-library (or /library), render Digital Library Page
  if (currentRoute === '/digital-library' || currentRoute === '/library' || currentRoute === '/digitallibrary') {
    return (
      <DigitalLibraryPage
        theme={theme}
        toggleTheme={toggleTheme}
        navigate={navigate}
      />
    );
  }

  // If route is /events, render Events Page
  if (currentRoute === '/events') {
    return (
      <EventsPage
        theme={theme}
        toggleTheme={toggleTheme}
        navigate={navigate}
      />
    );
  }

  // Otherwise render main landing page
  return (
    <div className={`min-h-screen bg-slate-100 dark:bg-black text-slate-900 dark:text-white font-sans selection:bg-cyan-500 selection:text-black transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Sticky floating Navbar with Light/Dark toggle */}
      <Navbar theme={theme} toggleTheme={toggleTheme} navigate={navigate} />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* 1. Description & Video */}
        <HeroSection />
        
        {/* 2. Vision, Mission, Values (About) */}
        <MissionVisionValues />

        {/* 3. WINGS Section */}
        <WingsSection navigate={navigate} />

        {/* 4. Peer Learning & Digital Library (Directly below Wings) */}
        <FeatureCards navigate={navigate} />

        {/* 5. Events Section */}
        <EventsSection navigate={navigate} />

        {/* 6. Large Team Photo Section */}
        <TeamSection />

        {/* 5. Individual Team Members — Orbital carousel */}
        <TeamMembers />

        {/* 6. User Reviews & Feedback + Be a member */}
        <ReviewSection navigate={navigate} />
      </main>

      {/* 7. Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}
