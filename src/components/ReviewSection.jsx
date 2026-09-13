import React, { useState } from 'react';

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// Change this to your official club email address whenever needed:
const RECIPIENT_EMAIL = 'mayuresh20072024@gmail.com';

export default function ReviewSection() {
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

      // Directly mark as submitted in the UI and clear inputs without any redirection
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      // In case of network failure, show error state on button and reset without redirecting
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3500);
    }
  };

  return (
    <section id="contact" className="relative bg-slate-100 dark:bg-black py-12 sm:py-16 transition-colors duration-200">
      <div className="max-w-[1540px] w-[96%] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Aligned left-to-center */}
        <div className="w-full max-w-[720px]">
          
          {/* One Title Line */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5 sm:mb-6 transition-colors">
            Leave a <span className="text-sky-600 dark:text-sky-400">Review</span>
          </h2>

          {/* Outer container card matching the exact wireframe drawing */}
          <div className="w-full rounded-[24px] sm:rounded-[32px] border border-slate-200 dark:border-[#262830] bg-white dark:bg-[#111216] p-5 sm:p-7 lg:p-8 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/80 transition-colors duration-200">
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 sm:gap-5">
              
              {/* Row 1: your name (left-aligned placeholder) */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="your name"
                required
                className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#090a0d] border border-slate-200 dark:border-[#262830] hover:border-slate-300 dark:hover:border-[#3b3e4a] focus:border-slate-800 dark:focus:border-neutral-300 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 text-left px-5 outline-none transition-all duration-200"
              />

              {/* Row 2: your email (left-aligned placeholder) */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your email"
                required
                className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#090a0d] border border-slate-200 dark:border-[#262830] hover:border-slate-300 dark:hover:border-[#3b3e4a] focus:border-slate-800 dark:focus:border-neutral-300 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 text-left px-5 outline-none transition-all duration-200"
              />

              {/* Row 3: message (left-aligned placeholder) */}
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
                {/* submit button (~1/3 width) */}
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

                {/* review destination container (~2/3 width) */}
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

      </div>
    </section>
  );
}
