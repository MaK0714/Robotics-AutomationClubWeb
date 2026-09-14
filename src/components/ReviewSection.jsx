import React, { useState } from 'react';
import { addMember } from '../utils/membersStorage';

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// Change this to your official club email address whenever needed:
const RECIPIENT_EMAIL = 'mayuresh20072024@gmail.com';

export default function ReviewSection({ navigate = () => {} }) {
  // ── Review Form State ──
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setStatus('submitting');

    try {
      await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Review for RAC from ${formData.name}`,
          _captcha: 'false',
          _template: 'table',
          _replyto: formData.email,
        }),
      });

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3500);
    }
  };

  // ── "Be a member" Form State ──
  const [memberData, setMemberData] = useState({
    name: '',
    branch: '',
    reason: '',
  });
  const [memberStatus, setMemberStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const handleMemberChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    if (!memberData.name.trim() || !memberData.branch.trim()) return;

    setMemberStatus('submitting');
    try {
      // Add member to storage (only Name & Branch stored; reason is for user satisfaction)
      await addMember({
        name: memberData.name,
        branch: memberData.branch,
      });

      // Mark that user was just registered so /members shows a celebratory banner
      sessionStorage.setItem('rac_just_added_member', 'true');

      setMemberStatus('success');
      setMemberData({ name: '', branch: '', reason: '' });

      // Automatically navigate to /members route after 600ms so they see their name & branch in the list
      setTimeout(() => {
        setMemberStatus('idle');
        navigate('/members');
      }, 600);
    } catch (err) {
      setMemberStatus('idle');
    }
  };

  return (
    <section id="contact" className="relative bg-slate-100 dark:bg-black py-10 sm:py-14 lg:py-16 transition-colors duration-200 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-[1540px] w-[96%] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Responsive Layout: Review (Left) & Be a member (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          
          {/* ── Left Column: Leave a Review ── */}
          <div className="w-full">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5 sm:mb-6 transition-colors">
              Leave a <span className="text-sky-600 dark:text-sky-400">Review</span>
            </h2>

            <div className="w-full rounded-[24px] sm:rounded-[32px] border border-slate-200 dark:border-[#262830] bg-white dark:bg-[#111216] p-5 sm:p-7 lg:p-8 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/80 transition-colors duration-200">
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 sm:gap-5">
                
                {/* Row 1: your name */}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="your name"
                  required
                  className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#090a0d] border border-slate-200 dark:border-[#262830] hover:border-slate-300 dark:hover:border-[#3b3e4a] focus:border-slate-800 dark:focus:border-neutral-300 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 text-left px-5 outline-none transition-all duration-200"
                />

                {/* Row 2: your email */}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your email"
                  required
                  className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#090a0d] border border-slate-200 dark:border-[#262830] hover:border-slate-300 dark:hover:border-[#3b3e4a] focus:border-slate-800 dark:focus:border-neutral-300 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 text-left px-5 outline-none transition-all duration-200"
                />

                {/* Row 3: message */}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="message"
                  required
                  rows={5}
                  className="w-full min-h-[140px] sm:min-h-[160px] rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#090a0d] border border-slate-200 dark:border-[#262830] hover:border-slate-300 dark:hover:border-[#3b3e4a] focus:border-slate-800 dark:focus:border-neutral-300 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 text-left p-5 outline-none transition-all duration-200 resize-none"
                />

                {/* Row 4: submit button (left) + review destination box (right) */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
                  <div className="sm:col-span-4">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl border border-slate-900 dark:border-[#3b3e4a] hover:border-slate-700 dark:hover:border-neutral-200 bg-slate-900 hover:bg-slate-800 dark:bg-[#181920] dark:hover:bg-neutral-200 text-white dark:text-neutral-200 dark:hover:text-black text-sm font-medium tracking-wide transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center select-none"
                    >
                      {status === 'submitting' ? (
                        <span className="flex items-center gap-1.5 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                          sending...
                        </span>
                      ) : status === 'success' ? (
                        <span className="text-emerald-500 dark:text-emerald-400 text-xs font-semibold">submitted ✓</span>
                      ) : status === 'error' ? (
                        <span className="text-rose-500 dark:text-rose-400 text-xs font-semibold">try again</span>
                      ) : (
                        'submit'
                      )}
                    </button>
                  </div>

                  <div className="sm:col-span-8">
                    <div
                      title={`Recipient: ${RECIPIENT_EMAIL}`}
                      className="w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-[#262830] bg-slate-50 dark:bg-[#090a0d] text-slate-600 dark:text-neutral-400 text-xs sm:text-sm flex items-center justify-center px-4 tracking-normal select-none text-center transition-colors duration-200"
                    >
                      review will be directly sent to official email
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </div>

          {/* ── Right Column: Be a member (matching wireframe drawing) ── */}
          <div className="w-full">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5 sm:mb-6 transition-colors">
              Be a <span className="text-sky-600 dark:text-sky-400">Member</span>
            </h2>

            <div className="w-full rounded-[24px] sm:rounded-[32px] border border-slate-200 dark:border-[#262830] bg-white dark:bg-[#111216] p-5 sm:p-7 lg:p-8 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/80 transition-colors duration-200">
              <form onSubmit={handleMemberSubmit} className="w-full flex flex-col gap-4 sm:gap-5">
                
                {/* Input 1: Name */}
                <input
                  type="text"
                  name="name"
                  value={memberData.name}
                  onChange={handleMemberChange}
                  placeholder="Name"
                  required
                  className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#090a0d] border border-slate-200 dark:border-[#262830] hover:border-slate-300 dark:hover:border-[#3b3e4a] focus:border-slate-800 dark:focus:border-neutral-300 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 text-left px-5 outline-none transition-all duration-200"
                />

                {/* Input 2: Branch */}
                <input
                  type="text"
                  name="branch"
                  value={memberData.branch}
                  onChange={handleMemberChange}
                  placeholder="Branch"
                  required
                  className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#090a0d] border border-slate-200 dark:border-[#262830] hover:border-slate-300 dark:hover:border-[#3b3e4a] focus:border-slate-800 dark:focus:border-neutral-300 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 text-left px-5 outline-none transition-all duration-200"
                />

                {/* Input 3: Why you want to join */}
                <textarea
                  name="reason"
                  value={memberData.reason}
                  onChange={handleMemberChange}
                  placeholder="Why you want to join"
                  rows={5}
                  className="w-full min-h-[140px] sm:min-h-[160px] rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#090a0d] border border-slate-200 dark:border-[#262830] hover:border-slate-300 dark:hover:border-[#3b3e4a] focus:border-slate-800 dark:focus:border-neutral-300 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 text-left p-5 outline-none transition-all duration-200 resize-none"
                />

                {/* Row 4: Submit (left) + See other members (right) */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
                  {/* Submit Button */}
                  <div className="sm:col-span-5">
                    <button
                      type="submit"
                      disabled={memberStatus === 'submitting'}
                      className="w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl border border-slate-900 dark:border-[#3b3e4a] hover:border-slate-700 dark:hover:border-neutral-200 bg-slate-900 hover:bg-slate-800 dark:bg-[#181920] dark:hover:bg-neutral-200 text-white dark:text-neutral-200 dark:hover:text-black text-sm font-medium tracking-wide transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center select-none"
                    >
                      {memberStatus === 'submitting' ? (
                        <span className="flex items-center gap-1.5 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                          saving...
                        </span>
                      ) : memberStatus === 'success' ? (
                        <span className="text-emerald-500 dark:text-emerald-400 text-xs font-semibold">Registered ✓</span>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>

                  {/* See other members Button */}
                  <div className="sm:col-span-7">
                    <button
                      type="button"
                      onClick={() => navigate('/members')}
                      className="w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl border border-slate-900 dark:border-[#3b3e4a] hover:border-slate-700 dark:hover:border-neutral-200 bg-slate-900 hover:bg-slate-800 dark:bg-[#181920] dark:hover:bg-neutral-200 text-white dark:text-neutral-200 dark:hover:text-black text-sm font-medium tracking-wide transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center select-none"
                    >
                      See other members
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
