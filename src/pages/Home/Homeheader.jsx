import { useState, useEffect } from "react";
import Homeheader from "../../Assets/Images/photo-1451187580459-43490279c0fa.avif";

/**
 * VoIP / Telecom — Home Hero
 * Same design system as the Contact Us / About Us headers: base #0b1220,
 * surface #101a30, line rgba(148,163,196,.14), signal teal #2dd4bf,
 * live amber #fbbf24, text #eef2f9 / #8ea0c4. Space Grotesk (display),
 * Inter (body), IBM Plex Mono (data/labels). No navbar / footer.
 *
 * Right side: an animated global call-network (arcing flight-path lines
 * between city nodes) with a floating "live call" glass UI mockup on top
 * — a different composition from the orbit-tabs and stat-bar cards used
 * on the other two pages.
 * Bottom: a big-number stat bar (no icons) — visually distinct from the
 * icon+title+subtitle strips used elsewhere.
 */

const CITIES = [
  { name: "San Francisco", x: 16, y: 46 },
  { name: "London", x: 47, y: 30 },
  { name: "Dubai", x: 60, y: 46 },
  { name: "Singapore", x: 76, y: 58 },
  { name: "Sydney", x: 88, y: 82 },
];

const ARCS = [
  { from: 0, to: 1, dur: "3.4s", delay: "0s" },
  { from: 1, to: 2, dur: "2.8s", delay: "0.6s" },
  { from: 2, to: 3, dur: "3.1s", delay: "1.1s" },
  { from: 3, to: 4, dur: "2.6s", delay: "0.3s" },
  { from: 0, to: 3, dur: "4.2s", delay: "1.6s" },
];

const STATS = [
  { value: "50+", label: "Countries with local numbers" },
  { value: "1M+", label: "Calls carried every day" },
  { value: "99.99%", label: "Network uptime, guaranteed" },
  { value: "4.9/5", label: "Rated by 2,300+ teams" },
];

function arcPath(a, b) {
  const midX = (a.x + b.x) / 2;
  const midY = Math.min(a.y, b.y) - 14;
  return `M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`;
}

function EqBar({ i }) {
  return (
    <span
      className="eq-bar inline-block w-[3px] rounded-full bg-[#2dd4bf]"
      style={{ height: "4px", animationDelay: `${i * 0.12}s` }}
    />
  );
}

export default function HomeHeader() {
  const [seconds, setSeconds] = useState(47);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="relative w-full min-h-screen bg-[#0b1220] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .f-display { font-family: 'Space Grotesk', sans-serif; }
        .f-body { font-family: 'Inter', sans-serif; }
        .f-mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes drift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes drift-sm { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes pulse-dot { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.6); opacity: 0.4; } }
        @keyframes travel { 0% { offset-distance: 0%; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
        @keyframes eq { 0%, 100% { height: 4px; } 50% { height: 18px; } }
        @keyframes ring-out { 0% { transform: scale(0.85); opacity: 0.7; } 100% { transform: scale(1.7); opacity: 0; } }
        .drift { animation: drift 6s ease-in-out infinite; }
        .drift-sm { animation: drift-sm 4.5s ease-in-out infinite; }
        .pulse-dot { animation: pulse-dot 2.2s ease-in-out infinite; }
        .traveler { offset-rotate: 0deg; animation-name: travel; animation-timing-function: linear; animation-iteration-count: infinite; }
        .eq-bar { animation: eq 0.9s ease-in-out infinite; }
        .ring-out { animation: ring-out 2.4s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .drift, .drift-sm, .pulse-dot, .traveler, .eq-bar, .ring-out { animation: none; }
        }
      `}</style>

      {/* FULL-BLEED BACKGROUND IMAGE */}
      <div
         className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${Homeheader})`,
        }}
      />
      <div className="absolute inset-0 bg-[#0b1220]/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220] via-[#0b1220]/75 to-[#0b1220]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-[#0b1220]/40" />

      <div
        className="pointer-events-none absolute -top-40 -right-32 w-[700px] h-[700px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(45,212,191,0.2) 0%, rgba(45,212,191,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 w-[520px] h-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.09) 0%, rgba(251,191,36,0) 70%)" }}
      />

      <div className="relative z-10 flex flex-col min-h-screen mt-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 flex-1">
          {/* LEFT — content */}
          <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 pt-24 pb-16">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2dd4bf]" />
                </span>
                <span className="f-mono text-[11px] tracking-[0.25em] uppercase text-[#8ea0c4]">
                  Linxtel· VoIP & Call Center Solutions
                </span>
              </div>

              <h1 className="f-display text-4xl sm:text-4xl lg:text-[2.5rem] leading-[1.06] font-default text-[#eef2f9]">
               Reliable VoIP & 
                <br />
                Call Center Solutions
                <br />
                <span className="text-[#2dd4bf]"> for Modern Businesses</span>
              </h1>

          <p className="f-body mt-6 text-base sm:text-lg text-[#c3ceE2] leading-relaxed">
  Empower your business with secure, scalable VoIP solutions. We provide Wholesale VoIP, DID Services, Cloud Infrastructure, Dialer Deployment, CRM Integration, and Call Center Solutions to keep your business connected and growing.
</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button className="f-body rounded-lg bg-[#2dd4bf] text-[#062521] text-sm font-medium px-6 py-3.5 hover:bg-[#5ee4d4] transition-colors shadow-[0_10px_30px_-10px_rgba(45,212,191,0.6)]">
                  Start free trial
                </button>
                <button className="f-body flex items-center gap-2 rounded-lg bg-white/[0.04] border border-[rgba(148,163,196,0.25)] text-[#eef2f9] text-sm font-medium px-6 py-3.5 hover:border-[#2dd4bf]/50 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch 90-sec demo
                </button>
              </div>

              <div className="mt-10 flex items-center gap-5">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-[#0b1220] bg-gradient-to-br from-[#2dd4bf]/40 to-[#101a30]"
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-[#fbbf24]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.1 6.6 7.2.9-5.3 5 1.4 7.2L12 18.3 5.6 21.7 7 14.5l-5.3-5 7.2-.9L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="f-body text-[13px] text-[#8ea0c4] mt-0.5">
                    4.9/5 from 2,300+ teams worldwide
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — animated global call network + floating live-call card */}
          <div className="relative flex items-center justify-center px-4 sm:px-8 pt-8 pb-14 min-h-[480px]">
            <div className="relative w-full max-w-[560px] aspect-[10/9]">
              {/* network map */}
              <svg viewBox="0 0 100 90" className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0" />
                    <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {ARCS.map((arc, i) => {
                  const d = arcPath(CITIES[arc.from], CITIES[arc.to]);
                  return (
                    <path
                      key={i}
                      d={d}
                      fill="none"
                      stroke="rgba(148,163,196,0.25)"
                      strokeWidth="0.35"
                    />
                  );
                })}
              </svg>

              {/* traveling pulses along arcs (HTML dots on CSS offset-path for broad support) */}
              {ARCS.map((arc, i) => (
                <span
                  key={i}
                  className="traveler absolute w-1.5 h-1.5 rounded-full bg-[#2dd4bf]"
                  style={{
                    offsetPath: `path('${arcPath(CITIES[arc.from], CITIES[arc.to])
                      .replace(/(\d+(\.\d+)?)/g, (n) => (parseFloat(n) * 5.6).toString())}')`,
                    animationDuration: arc.dur,
                    animationDelay: arc.delay,
                    boxShadow: "0 0 8px 2px rgba(45,212,191,0.8)",
                  }}
                />
              ))}

              {/* city nodes */}
              {CITIES.map((c) => (
                <div
                  key={c.name}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${c.x}%`, top: `${c.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf]" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2dd4bf]" />
                  </span>
                  <span className="f-mono text-[8px] uppercase tracking-wide text-[#8ea0c4] mt-1.5 whitespace-nowrap">
                    {c.name}
                  </span>
                </div>
              ))}

              {/* floating badge — encryption */}
              <div
                className="drift-sm absolute top-2 left-0 sm:left-2 z-20 flex items-center gap-2 rounded-full bg-[#101a30]/90 backdrop-blur border border-[rgba(148,163,196,0.25)] pl-2 pr-3.5 py-1.5"
                style={{ boxShadow: "0 15px 30px -16px rgba(0,0,0,0.6)" }}
              >
                <span className="w-6 h-6 rounded-full bg-[#2dd4bf]/15 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2">
                    <rect x="5" y="11" width="14" height="9" rx="1.5" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                </span>
                <span className="f-mono text-[9px] uppercase tracking-wider text-[#eef2f9]">
                  End-to-end encrypted
                </span>
              </div>

              {/* floating live-call glass card */}
              <div
                className="drift absolute z-20 left-1/2 sm:left-auto sm:right-2 bottom-2 -translate-x-1/2 sm:translate-x-0 w-[240px] rounded-2xl bg-[#101a30]/90 backdrop-blur-xl border border-[rgba(148,163,196,0.2)] p-4"
                style={{ boxShadow: "0 30px 60px -20px rgba(0,0,0,0.65), 0 0 40px -10px rgba(45,212,191,0.25)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#2dd4bf]/50 to-[#0d1830] flex items-center justify-center shrink-0">
                    <span className="ring-out absolute inset-0 rounded-full border border-[#2dd4bf]/60" />
                    <span className="f-display text-sm font-semibold text-[#eef2f9]">SC</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="f-body text-[13px] font-semibold text-[#eef2f9] truncate">Sarah Chen</div>
                    <div className="f-mono text-[10px] text-[#2dd4bf]">Live · HD Audio</div>
                  </div>
                  <span className="f-mono text-[11px] text-[#8ea0c4]">{mm}:{ss}</span>
                </div>

                <div className="mt-3.5 flex items-end justify-center gap-[3px] h-6">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <EqBar key={i} i={i} />
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-white/[0.06] border border-[rgba(148,163,196,0.25)] flex items-center justify-center text-[#8ea0c4] hover:text-[#eef2f9] transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                      <path d="M16 9l5 5M21 9l-5 5" />
                    </svg>
                  </button>
                  <button className="w-11 h-11 rounded-full bg-[#f04b4b] flex items-center justify-center text-white hover:bg-[#ff6161] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ transform: "rotate(135deg)" }}>
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.9 21 3 12.1 3 1c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .8-.2 1.1L6.6 10.8Z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/[0.06] border border-[rgba(148,163,196,0.25)] flex items-center justify-center text-[#8ea0c4] hover:text-[#eef2f9] transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                      <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* floating badge — uptime */}
              <div
                className="drift-sm absolute right-0 sm:-right-2 top-1/3 z-20 flex items-center gap-2 rounded-full bg-[#101a30]/90 backdrop-blur border border-[rgba(148,163,196,0.25)] pl-2 pr-3.5 py-1.5"
                style={{ boxShadow: "0 15px 30px -16px rgba(0,0,0,0.6)", animationDelay: "1.4s" }}
              >
                <span className="w-6 h-6 rounded-full bg-[#fbbf24]/15 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                    <path d="M4 18v-3M9 18v-6M14 18V9M19 18V5" />
                  </svg>
                </span>
                <span className="f-mono text-[9px] uppercase tracking-wider text-[#eef2f9]">
                  99.99% uptime
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM — big-number stat bar (icon-free, different rhythm from other pages) */}
        <div className="relative px-4 sm:px-6 pb-10 sm:pb-12 flex justify-center">
          <div
            className="w-full max-w-6xl rounded-2xl bg-[#101a30]/80 backdrop-blur-xl border border-[rgba(148,163,196,0.18)] flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[rgba(148,163,196,0.16)]"
            style={{ boxShadow: "0 20px 45px -18px rgba(0,0,0,0.6), 0 0 40px -14px rgba(45,212,191,0.12)" }}
          >
            {STATS.map((s) => (
              <div key={s.label} className="flex-1 flex flex-col items-center text-center px-6 py-6">
                <div className="f-display text-2xl sm:text-3xl font-semibold text-[#2dd4bf]">{s.value}</div>
                <div className="f-body text-[12px] text-[#8ea0c4] mt-1.5 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}