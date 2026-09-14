import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, UserPlus, Sun, Moon, CheckCircle2 } from 'lucide-react';
import { getMembers } from '../utils/membersStorage';

export default function MembersPage({ theme = 'dark', toggleTheme = () => {}, navigate = () => {} }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [justAddedAlert, setJustAddedAlert] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getMembers();
      setMembers(data);
      setLoading(false);
    }
    load();

    // Check if user was just redirected from adding a member
    const lastAdded = sessionStorage.getItem('rac_just_added_member');
    if (lastAdded) {
      setJustAddedAlert(true);
      sessionStorage.removeItem('rac_just_added_member');
      setTimeout(() => setJustAddedAlert(false), 5000);
    }
  }, []);

  const filteredMembers = members.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      (m.name && m.name.toLowerCase().includes(q)) ||
      (m.branch && m.branch.toLowerCase().includes(q)) ||
      m.number.toString().includes(q)
    );
  });

  return (
    <div className={`min-h-screen bg-slate-100 dark:bg-[#07080a] text-slate-900 dark:text-white font-sans transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''}`}>
      
      {/* Top Floating Navbar Header */}
      <header className="sticky top-3 sm:top-6 z-40 w-full px-3 sm:px-6">
        <div className="max-w-[1500px] w-full mx-auto bg-white/95 dark:bg-[#121318] text-slate-900 dark:text-white rounded-full px-3 sm:px-6 md:px-7 py-2 sm:py-2.5 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/80 border border-slate-200 dark:border-[#22242c] flex items-center justify-between transition-colors duration-200">
          
          {/* Left: Brand Logo & Title */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer min-w-0 pr-2"
          >
            <div className="w-7 h-7 sm:w-8 md:w-9 sm:h-8 md:h-9 rounded-full bg-slate-100 dark:bg-white flex items-center justify-center p-0.5 border border-slate-200 dark:border-transparent shrink-0">
              <img
                src="/logo.png"
                alt="Robotics & Automation Club Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="min-w-0 flex flex-col sm:block">
              <span className="text-xs sm:text-base font-extrabold tracking-tight text-slate-900 dark:text-white truncate block sm:inline sm:whitespace-nowrap leading-tight">
                Robotics & Automation
                <span className="hidden sm:inline"> Club</span>
              </span>
              <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider leading-none sm:hidden">
                Club
              </span>
            </div>
          </button>

          {/* Right: Actions (Theme toggle + Register) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#1c1e26] dark:hover:bg-[#252833] text-slate-700 dark:text-yellow-400 border border-slate-200 dark:border-transparent transition-all flex items-center justify-center cursor-pointer active:scale-95"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Register Action Button */}
            <button
              type="button"
              onClick={() => {
                navigate('/#contact');
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Join<span className="hidden sm:inline"> as Member</span></span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1400px] w-[94%] mx-auto pt-10 sm:pt-14 pb-20 px-2 sm:px-4">
        
        {/* Success Alert if just added */}
        {justAddedAlert && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center gap-3 animate-fade-in shadow-lg">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">
              Congratulations! You have successfully been added to the club members list.
            </p>
          </div>
        )}

        {/* Page Hero Header */}
        <div className="mb-8 sm:mb-12 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Club <span className="text-sky-600 dark:text-sky-400">Members</span>
          </h1>
        </div>

        {/* Search Bar & Stats Bar */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or branch..."
              className="w-full h-11 sm:h-12 pl-11 pr-4 rounded-2xl bg-white dark:bg-[#111217] border border-slate-200 dark:border-[#262830] focus:border-sky-500 dark:focus:border-sky-400 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 text-sm outline-none transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Member Count badge */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-xs sm:text-sm font-mono font-semibold px-3 py-1.5 rounded-xl bg-slate-200/70 dark:bg-[#171920] text-slate-700 dark:text-neutral-300 border border-slate-300/60 dark:border-[#272935]">
              Total: {filteredMembers.length} {filteredMembers.length === 1 ? 'Member' : 'Members'}
            </span>
          </div>
        </div>

        {/* Member Table Container Card */}
        <div className="w-full rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-[#1f2128] bg-white dark:bg-[#0e0f13] shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/90 overflow-hidden transition-colors duration-200">
          
          {loading ? (
            <div className="p-16 text-center text-slate-500 dark:text-neutral-400 text-sm font-mono">
              Loading members directory...
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-slate-500 dark:text-neutral-400 text-base font-medium">
                No members found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs text-sky-600 dark:text-sky-400 underline cursor-pointer"
              >
                Clear search filter
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-[#1c1e26] bg-slate-50/80 dark:bg-[#13141a] text-slate-500 dark:text-neutral-400 text-xs sm:text-sm font-mono uppercase tracking-wider">
                    <th className="py-4 px-4 sm:px-6 w-16 sm:w-24 text-center">#</th>
                    <th className="py-4 px-4 sm:px-6">Name</th>
                    <th className="py-4 px-4 sm:px-6">Branch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#181920] text-sm sm:text-base">
                  {filteredMembers.map((member) => (
                    <tr
                      key={member.number}
                      className="hover:bg-slate-50 dark:hover:bg-[#14151b] transition-colors group"
                    >
                      {/* Number Column */}
                      <td className="py-4 px-4 sm:px-6 text-center">
                        <span className="inline-block font-mono text-xs sm:text-sm font-bold text-slate-500 dark:text-neutral-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {member.number.toString().padStart(2, '0')}
                        </span>
                      </td>

                      {/* Name Column */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 dark:bg-[#1c1e26] border border-slate-200 dark:border-[#2e313e] flex items-center justify-center font-bold text-xs sm:text-sm text-slate-800 dark:text-neutral-200 shrink-0 select-none">
                            {member.name
                              .split(' ')
                              .map((w) => w[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white tracking-tight">
                            {member.name}
                          </span>
                        </div>
                      </td>

                      {/* Branch Column */}
                      <td className="py-4 px-4 sm:px-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs sm:text-sm font-medium bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-200/70 dark:border-sky-500/20">
                          {member.branch}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </main>

    </div>
  );
}

