import React, { useState, useEffect, useRef } from 'react';

// ─── MEMBER DATA ────────────────────────────────────────────────────────────
// Add / remove members here. photo should be placed in public/members/
const members = [
  {
    id: 1,
    name: 'Mayuresh Kulkarni',
    role: 'AI/ML Head',
    description: 'Learning AI/ML.Utilizing AI/ML for Robotics & Automation',
    photo: '/members/alex.jpg',
  },
  {
    id: 2,
    name: 'Om Patil',
    role: 'Chairperson',
    description: "Computer vision enthusiast. Expert in Python, ROS and Hardware.",
    photo: '/members/priya.jpg',
  },
  {
    id: 3,
    name: 'Lipun',
    role: 'Vice Chairperson',
    description: 'Hardware maestro responsible for, motor control and all things mechanical.',
    photo: '/members/jake.jpg',
  },
  {
    id: 4,
    name: 'Ananya',
    role: 'Documentation',
    description: 'Responsible for all docuumentations.',
    photo: '/members/sara.jpg',
  },
  {
    id: 5,
    name: 'Keya',
    role: 'Treasurer',
    description: 'Responsible for all money and finance related things.',
    photo: '/members/rahul.jpg',
  },
  {
    id: 6,
    name: 'Prachiti solkar',
    role: 'Design head',
    description: 'great in designing.Extremely talented and responsible for all design related things.',
    photo: '/members/emily.jpg',
  },
  {
    id: 7,
    name: 'Harsh Dhamane',
    role: 'Technical head',
    description: 'Responsible for all tech related decisions.',
    photo: '/members/omar.jpg',
  },
  {
    id: 8,
    name: 'Meet Shinde',
    role: 'Joint Technical head',
    description: "Helping Technical head and Responsible for all tech related decisions.",
    photo: '/members/nina.jpg',
  },
    {
    id: 9,
    name: 'Anshika Verma',
    role: 'Joint AI/ML head',
    description: "Helping AI/ML head and responsible for all AI/ML related decisions.",
    photo: '/members/nina.jpg',
  },
    {
    id: 10,
    name: 'Sahithi',
    role: 'Mechanical head',
    description: "Enthusiast in mechanical field .",
    photo: '/members/nina.jpg',
  },
    {
    id: 11,
    name: 'Rohan Jagdale',
    role: 'Website maintainer',
    description: "Maintains website.",
    photo: '/members/nina.jpg',
  },
    {
    id: 12,
    name: 'Suraj',
    role: 'Electronics head',
    description: " Responsible for all Electronics related decisions.",
    photo: '/members/nina.jpg',
  },
    {
    id: 13,
    name: 'Dhruvesh',
    role: 'Secretary ',
    description: "Manages day to day operations and communications.",
    photo: '/members/nina.jpg',
  },
    {
    id: 14,
    name: 'Arisuthan',
    role: 'Joint Secretary',
    description: "Helping secretary and helps in Managing day to day operations and communications.",
    photo: '/members/nina.jpg',
  },
    {
    id: 15,
    name: 'Siddhi',
    role: 'Pr head',
    description: "Responsible for all pr related decisions.",
    photo: '/members/nina.jpg',
  },

  
];

// 14-tooth robotic mechanical gear SVG path (normalized in 200x200 viewBox centered at 0,0)
const GEAR_PATH =
  "M 77.85 4.90 L 93.76 15.28 L 91.11 26.91 L 72.26 29.36 L 68.01 38.19 L 77.85 54.45 L 70.41 63.78 L 52.37 57.81 L 44.71 63.92 L 46.51 82.83 L 35.76 88.01 L 22.10 74.80 L 12.55 76.98 L 5.97 94.81 L -5.97 94.81 L -12.55 76.98 L -22.10 74.80 L -35.76 88.01 L -46.51 82.83 L -44.71 63.92 L -52.37 57.81 L -70.41 63.78 L -77.85 54.45 L -68.01 38.19 L -72.26 29.36 L -91.11 26.91 L -93.76 15.28 L -77.85 4.90 L -77.85 -4.90 L -93.76 -15.28 L -91.11 -26.91 L -72.26 -29.36 L -68.01 -38.19 L -77.85 -54.45 L -70.41 -63.78 L -52.37 -57.81 L -44.71 -63.92 L -46.51 -82.83 L -35.76 -88.01 L -22.10 -74.80 L -12.55 -76.98 L -5.97 -94.81 L 5.97 -94.81 L 12.55 -76.98 L 22.10 -74.80 L 35.76 -88.01 L 46.51 -82.83 L 44.71 -63.92 L 52.37 -57.81 L 70.41 -63.78 L 77.85 -54.45 L 68.01 -38.19 L 72.26 -29.36 L 91.11 -26.91 L 93.76 -15.28 L 77.85 -4.90 Z";

// ─── AVATAR FALLBACK ─────────────────────────────────────────────────────────
function Avatar({ src, name, size = 96 }) {
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [src]);

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (!errored) {
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="w-full h-full object-cover"
        onError={() => setErrored(true)}
      />
    );
  }

  return (
    <span
      className="w-full h-full flex items-center justify-center font-extrabold tracking-wider text-slate-800 dark:text-white select-none transition-colors"
      style={{ fontSize: size * 0.34, background: 'transparent' }}
    >
      {initials}
    </span>
  );
}

const BATCH_SIZE = 8;

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function TeamMembers() {
  const totalBatches = Math.ceil(members.length / BATCH_SIZE);
  const [batchIndex, setBatchIndex] = useState(0);
  const [batchFade, setBatchFade] = useState(true);
  const [angleOffset, setAngleOffset] = useState(0);
  const [focusedSlot, setFocusedSlot] = useState(null);
  const [paused, setPaused] = useState(false);

  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const accumulatedAngleRef = useRef(0);
  const batchIndexRef = useRef(batchIndex);
  batchIndexRef.current = batchIndex;
  const focusedSlotRef = useRef(focusedSlot);
  focusedSlotRef.current = focusedSlot;
  const isTransitioningRef = useRef(false);

  const SPEED = 0.018; // degrees per ms (smooth ~20s per 360-deg rotation)

  // Slice members for the active batch
  const activeMembers = members.slice(
    batchIndex * BATCH_SIZE,
    (batchIndex + 1) * BATCH_SIZE
  );

  // Responsive layout state dynamically calculated for any screen & member count
  const [layout, setLayout] = useState({
    orbitR: 190,
    avSize: 88,
    hubSize: 121,
    isMobile: false,
    winWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
  });

  useEffect(() => {
    const updateLayout = () => {
      const w = window.innerWidth;
      const isMobile = w < 768;

      // Desired base avatar sizes
      const baseAv = w < 480 ? 46 : w < 768 ? 58 : 88;
      const minGap = isMobile ? 8 : 16;

      // Available half-width on screen (keeping 16px margin on each side)
      const maxStageR = Math.max(100, Math.floor((w - 32) / 2));

      // Viewport-based target radius
      let targetOrbitR;
      if (w < 400) targetOrbitR = Math.min(105, maxStageR - 35);
      else if (w < 480) targetOrbitR = Math.min(120, maxStageR - 40);
      else if (w < 640) targetOrbitR = Math.min(135, maxStageR - 44);
      else if (w < 768) targetOrbitR = Math.min(155, maxStageR - 48);
      else targetOrbitR = Math.min(Math.round(w * 0.176), 235);

      // Max members on orbit simultaneously (capped at BATCH_SIZE = 8)
      const n = Math.max(1, Math.min(members.length, BATCH_SIZE));
      const circ = 2 * Math.PI * targetOrbitR;
      const arcPerMember = circ / n;
      const maxAvForCount = Math.floor(arcPerMember - minGap);
      const avSize = Math.max(isMobile ? 36 : 48, Math.min(baseAv, maxAvForCount));

      // Ensure outer nodes stay strictly inside screen on mobile
      const overhang = Math.round(avSize / 2 + (isMobile ? 16 : 22));
      const safeOrbitR = Math.min(targetOrbitR, maxStageR - overhang);
      const finalOrbitR = Math.max(isMobile ? 88 : 150, safeOrbitR);

      // Responsive hub diameter (increased by 25% of original)
      const hubSize = isMobile
        ? Math.max(92, Math.min(118, Math.round(finalOrbitR * 0.82)))
        : 152;

      setLayout({
        orbitR: finalOrbitR,
        avSize,
        hubSize,
        isMobile,
        winWidth: w,
      });
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const closeFocus = () => {
    setFocusedSlot(null);
    setPaused(false);
  };

  const switchBatch = (newIdx) => {
    if (newIdx === batchIndexRef.current || isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    closeFocus();
    accumulatedAngleRef.current = 0;
    setBatchFade(false);

    setTimeout(() => {
      setBatchIndex(newIdx);
      setBatchFade(true);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 350);
    }, 350);
  };

  // Auto-rotate and batch switch after 360 degrees
  useEffect(() => {
    if (paused) return;
    const tick = (ts) => {
      if (lastTimeRef.current !== null) {
        const delta = ts - lastTimeRef.current;
        const angleDelta = SPEED * delta;
        setAngleOffset((prev) => (prev + angleDelta) % 360);

        // Every full 360 degree rotation, transition to the next batch smoothly
        if (totalBatches > 1 && focusedSlotRef.current === null && !isTransitioningRef.current) {
          accumulatedAngleRef.current += angleDelta;
          if (accumulatedAngleRef.current >= 360) {
            accumulatedAngleRef.current = 0;
            const nextBatch = (batchIndexRef.current + 1) % totalBatches;
            switchBatch(nextBatch);
          }
        }
      }
      lastTimeRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [paused, totalBatches]);

  const handleCardClick = (slotIdx) => {
    const opening = slotIdx !== focusedSlot;
    setFocusedSlot(opening ? slotIdx : null);
    setPaused(opening);
  };

  const cardRef = useRef(null);

  // Close card when clicking/tapping anywhere outside or pressing Escape
  useEffect(() => {
    if (focusedSlot === null) return;

    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        // If clicking/tapping a member avatar button, let its own handler execute
        if (e.target.closest('[data-member-btn]')) {
          return;
        }
        closeFocus();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeFocus();
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedSlot]);

  const { orbitR, avSize, hubSize, isMobile, winWidth } = layout;
  const overhang = Math.round(avSize / 2 + (isMobile ? 16 : 22));
  const stageSize = (orbitR + overhang) * 2;

  // Current angle (rad) of the focused member
  const getFocusedAngle = (slotIdx) => {
    const angleDeg = (360 / activeMembers.length) * slotIdx + angleOffset;
    return (angleDeg * Math.PI) / 180;
  };

  const focusedMember = focusedSlot !== null ? activeMembers[focusedSlot] : null;

  return (
    <section id="team" className="relative bg-slate-100 dark:bg-black py-10 sm:py-14 lg:py-16 overflow-x-clip transition-colors duration-200 scroll-mt-20 sm:scroll-mt-24">
      {/* ── Section heading ── */}
      <div className="text-center mb-6 sm:mb-8 px-4">
        <p className="text-sky-600 dark:text-sky-400 font-mono font-semibold uppercase tracking-[0.25em] sm:tracking-[0.35em] mb-3 sm:mb-5 transition-colors"
           style={{ fontSize: 'clamp(1.15rem, 3vw, 2.5rem)' }}>
          The People Behind RAC
        </p>
        <h2 className="font-bold text-slate-900 dark:text-white leading-tight sm:leading-none tracking-tight break-words transition-colors"
            style={{ fontSize: 'clamp(2.75rem, 11vw, 11rem)' }}>
          Meet the <span className="text-sky-600 dark:text-sky-400">Team</span>
        </h2>
        <p className="mt-3 sm:mt-5 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg transition-colors">
          Click any member to learn more about them.
        </p>
      </div>

      {/* ── Orbit stage ── */}
      <div
        className="relative mx-auto select-none"
        style={{ width: stageSize, height: stageSize, maxWidth: '100%' }}
      >
        {/* Central Mechanical Gear Hub */}
        <div
          className="absolute z-10 flex flex-col items-center justify-center select-none"
          style={{
            width: Math.round(hubSize * 1.18),
            height: Math.round(hubSize * 1.18),
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          {/* Rotating SVG Mechanical Gear Teeth & Chassis */}
          <svg
            viewBox="-100 -100 200 200"
            className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_40px_rgba(14,165,233,0.3)]"
            style={{
              transform: `rotate(${angleOffset}deg)`,
              willChange: 'transform',
            }}
          >
            {/* Outer gear cogs */}
            <path
              d={GEAR_PATH}
              className="fill-white dark:fill-[#0f1117] stroke-sky-600 dark:stroke-[#38bdf8] transition-colors duration-200"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Technical dashed measurement track */}
            <circle
              cx="0"
              cy="0"
              r="68"
              fill="none"
              className="stroke-sky-500/40 dark:stroke-[#0ea5e9]/50"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            {/* Recessed hub core */}
            <circle
              cx="0"
              cy="0"
              r="58"
              className="fill-slate-50 dark:fill-[#0a0c12] stroke-sky-600/60 dark:stroke-[#0284c7] transition-colors duration-200"
              strokeWidth="1.5"
            />
          </svg>

          {/* Upright Center Text (RAC TEAM) */}
          <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
            <span
              className="text-sky-600 dark:text-sky-400 font-black font-mono uppercase leading-none text-center transition-colors"
              style={{
                fontSize: Math.round(hubSize * 0.28),
                letterSpacing: '0.04em',
              }}
            >
              RAC
            </span>
            <span
              className="text-sky-600/80 dark:text-sky-400/80 font-bold font-mono uppercase leading-none text-center mt-1 transition-colors"
              style={{
                fontSize: Math.round(hubSize * 0.12),
                letterSpacing: '0.32em',
              }}
            >
              TEAM
            </span>
          </div>
        </div>

        {/* Orbit ring */}
        <div
          className="absolute rounded-full border border-sky-500/25 dark:border-sky-500/15 pointer-events-none"
          style={{
            width: orbitR * 2,
            height: orbitR * 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />

        {/* Active Batch Member nodes with smooth fade transition */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-300 ease-in-out ${
            batchFade ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {activeMembers.map((member, idx) => {
            const angleDeg = (360 / activeMembers.length) * idx + angleOffset;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = Math.cos(angleRad) * orbitR;
            const y = Math.sin(angleRad) * orbitR;
            const isFocused = focusedSlot === idx;

            return (
              <button
                key={member.id}
                data-member-btn="true"
                onClick={() => handleCardClick(idx)}
                className={`
                  ${batchFade ? 'pointer-events-auto' : 'pointer-events-none'}
                  absolute flex flex-col items-center gap-[2px] sm:gap-[3px]
                  transition-transform duration-300 ease-out
                  ${isFocused ? 'z-20 scale-110' : 'z-10 scale-100 hover:scale-110'}
                `}
                style={{
                  width: avSize + (isMobile ? 12 : 20),
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                <div
                  className={`
                    rounded-full overflow-hidden border-2 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#22242c] dark:to-[#17181f]
                    transition-all duration-300 shadow-md shadow-slate-300/50 dark:shadow-none
                    ${isFocused
                      ? 'border-sky-500 dark:border-sky-400 ring-2 ring-sky-400/40 dark:ring-sky-500/30'
                      : 'border-slate-300 dark:border-[#2e3038] hover:border-sky-500/70'}
                  `}
                  style={{ width: avSize, height: avSize }}
                >
                  <Avatar src={member.photo} name={member.name} size={avSize} />
                </div>
                <span
                  className={`font-bold leading-tight text-center truncate max-w-full transition-colors
                    ${isFocused ? 'text-sky-600 dark:text-sky-300' : 'text-slate-800 dark:text-gray-300'}`}
                  style={{ fontSize: isMobile ? '10px' : '12px' }}
                >
                  {member.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Detail popup card ── */}
        {focusedMember && (() => {
          const aRad = getFocusedAngle(focusedSlot);
          const cardWidth = isMobile ? Math.min(320, winWidth - 32) : 320;

          // On desktop: opens radially in member's direction, clamped within screen
          const dist = orbitR + 135;
          let cx = 0;
          let cy = 0;

          if (!isMobile) {
            const rawCx = Math.cos(aRad) * dist;
            const rawCy = Math.sin(aRad) * dist;
            const maxCx = Math.max(0, (winWidth - cardWidth - 48) / 2);
            cx = Math.max(-maxCx, Math.min(maxCx, rawCx));
            cy = rawCy;
          }

          return (
            <>
              {/* Dim backdrop on mobile */}
              {isMobile && (
                <div
                  className="fixed inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm z-30 transition-opacity"
                  onClick={closeFocus}
                />
              )}

              <div
                ref={cardRef}
                key={focusedMember.id}
                className={`
                  z-40 bg-white dark:bg-[#1e1f24] border border-slate-200 dark:border-[#2e3038] rounded-2xl
                  flex flex-col items-center text-center gap-3 sm:gap-4
                  shadow-2xl shadow-slate-300/60 dark:shadow-[0_0_50px_rgba(14,165,233,0.25)]
                  ${isMobile
                    ? 'fixed p-5 max-h-[85vh] overflow-y-auto'
                    : 'absolute p-6'
                  }
                `}
                style={{
                  width: cardWidth,
                  top: '50%',
                  left: '50%',
                  transform: isMobile
                    ? 'translate(-50%, -50%)'
                    : `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px))`,
                  '--cx': `${cx}px`,
                  '--cy': `${cy}px`,
                  animation: isMobile
                    ? 'mobileModalPop 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    : 'desktopCardPop 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
              >
                {/* Close button */}
                <button
                  onClick={(e) => { e.stopPropagation(); closeFocus(); }}
                  className="absolute top-3 right-3 sm:-top-2.5 sm:-right-2.5 w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-slate-100 dark:bg-[#2e3038] border border-slate-200 dark:border-transparent
                             flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white
                             text-sm leading-none transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>

                {/* Avatar inside card (clean outline, no glow) */}
                <div
                  className="rounded-full overflow-hidden border-2 border-sky-500 dark:border-sky-400 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#22242c] dark:to-[#17181f] flex-shrink-0 shadow-md shadow-slate-200/50 dark:shadow-none"
                  style={{ width: isMobile ? 74 : 90, height: isMobile ? 74 : 90 }}
                >
                  <Avatar
                    src={focusedMember.photo}
                    name={focusedMember.name}
                    size={isMobile ? 74 : 90}
                  />
                </div>

                <div className="leading-snug">
                  <p className="text-slate-900 dark:text-white text-base sm:text-lg font-bold">{focusedMember.name}</p>
                  <p className="text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-mono mt-0.5">{focusedMember.role}</p>
                </div>

                <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {focusedMember.description}
                </p>
              </div>
            </>
          );
        })()}
      </div>

      <style>{`
        @keyframes mobileModalPop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @keyframes desktopCardPop {
          0% {
            opacity: 0;
            transform: translate(calc(-50% + var(--cx, 0px)), calc(-50% + var(--cy, 0px))) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translate(calc(-50% + var(--cx, 0px)), calc(-50% + var(--cy, 0px))) scale(1);
          }
        }
      `}</style>
    </section>
  );
}

