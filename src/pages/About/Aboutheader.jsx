import { useState, useEffect } from "react";

/**
 * VoIP / Telecom — About Us Hero
 * Same system as the Contact Us header: base #0b1220, surface #101a30,
 * line rgba(148,163,196,.14), signal teal #2dd4bf, live amber #fbbf24,
 * text #eef2f9 / #8ea0c4. Space Grotesk (display), Inter (body),
 * IBM Plex Mono (data/labels). No navbar / footer — header section only.
 *
 * Right side: a glass "pillar" infographic — transparent, icon-led tabs
 * orbiting a central hub, connected by thin lines (different composition
 * from the Contact page's solid metric-bar card).
 * Bottom: a feature strip (icon + title + subtitle, divided) — same
 * pattern as Contact Us, reworded for company facts.
 */

const PILLARS = [
  { icon: "compass", label: "Our Story", angle: -60 },
  { icon: "team", label: "Our Team", angle: 15 },
  { icon: "target", label: "Our Mission", angle: 100 },
  { icon: "heart", label: "Our Values", angle: 190 },
];

const FACTS = [
  {
    icon: "flag",
    title: "Founded in 2016",
    subtitle: "Started in San Francisco",
  },
  {
    icon: "team",
    title: "300+ Engineers",
    subtitle: "Across 12 global offices",
  },
  {
    icon: "globe",
    title: "50+ Countries",
    subtitle: "Real local phone numbers",
  },
  {
    icon: "signal",
    title: "1M+ Calls Daily",
    subtitle: "Carried on our own network",
  },
];

function Icon({ type, className }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "compass")
    return (
      <svg viewBox="0 0 24 24" className={className} {...c}>
        <circle cx="12" cy="12" r="9" />
        <path d="m15 9-2 6-6 2 2-6 6-2Z" />
      </svg>
    );
  if (type === "team")
    return (
      <svg viewBox="0 0 24 24" className={className} {...c}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19.5c.7-3 3-4.7 5.5-4.7s4.8 1.7 5.5 4.7" />
        <circle cx="17" cy="8.5" r="2.4" />
        <path d="M15.8 14.8c1.9.4 3.4 1.9 3.9 4.2" />
      </svg>
    );
  if (type === "target")
    return (
      <svg viewBox="0 0 24 24" className={className} {...c}>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="0.8" fill="currentColor" />
      </svg>
    );
  if (type === "heart")
    return (
      <svg viewBox="0 0 24 24" className={className} {...c}>
        <path d="M12 20s-7.2-4.6-9.6-9.1C.9 7.9 2.3 4.8 5.4 4.1c1.9-.4 3.8.4 5 1.9a1 1 0 0 0 1.2 0c1.2-1.5 3.1-2.3 5-1.9 3.1.7 4.5 3.8 3 6.8C19.2 15.4 12 20 12 20Z" />
      </svg>
    );
  if (type === "flag")
    return (
      <svg viewBox="0 0 24 24" className={className} {...c}>
        <path d="M5 21V4" />
        <path d="M5 4h13l-3 4.5L18 13H5" />
      </svg>
    );
  if (type === "globe")
    return (
      <svg viewBox="0 0 24 24" className={className} {...c}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.8 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.8-3.8-9S9.5 5.6 12 3Z" />
      </svg>
    );
  if (type === "signal")
    return (
      <svg viewBox="0 0 24 24" className={className} {...c}>
        <path d="M4 18v-3M9 18v-6M14 18V9M19 18V5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={className} {...c}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function PillarTab({ pillar, radius, delay }) {
  const rad = (pillar.angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  return (
    <div
      className="drift absolute flex items-center gap-2 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/[0.14] pl-2.5 pr-4 py-2 hover:bg-[#2dd4bf]/10 hover:border-[#2dd4bf]/40 transition-colors cursor-pointer"
      style={{
        top: `calc(50% + ${y}px)`,
        left: `calc(50% + ${x}px)`,
        transform: "translate(-50%, -50%)",
        animationDelay: `${delay}s`,
        boxShadow: "0 15px 30px -16px rgba(0,0,0,0.5)",
      }}
    >
      <span className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.14] flex items-center justify-center shrink-0">
        <Icon type={pillar.icon} className="w-4 h-4 text-[#2dd4bf]" />
      </span>
      <span className="f-body text-[12px] font-medium text-[#eef2f9] whitespace-nowrap">{pillar.label}</span>
    </div>
  );
}

export default function AboutUsHeader() {
  const radius = 148;

  return (
    <div className="relative w-full min-h-screen bg-[#0b1220] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .f-display { font-family: 'Space Grotesk', sans-serif; }
        .f-body { font-family: 'Inter', sans-serif; }
        .f-mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes drift { 0%, 100% { transform: translate(-50%, -50%) translateY(0); } 50% { transform: translate(-50%, -50%) translateY(-7px); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-ring { 0% { transform: scale(0.9); opacity: 0.6; } 100% { transform: scale(1.5); opacity: 0; } }
        .drift { animation: drift 5.5s ease-in-out infinite; }
        .spin-slow { animation: spin-slow 40s linear infinite; }
        .pulse-ring { animation: pulse-ring 2.6s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .drift, .spin-slow, .pulse-ring { animation: none; }
        }
      `}</style>

      {/* FULL-BLEED BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
       style={{
  backgroundImage:
    "url('https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2000&auto=format&fit=crop')",
}}   />
      <div className="absolute inset-0 bg-[#0b1220]/80" />

       <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220] via-[#0b1220]/75 to-[#0b1220]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-[#0b1220]/40" />

      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(45,212,191,0.18) 0%, rgba(45,212,191,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 w-[520px] h-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, rgba(251,191,36,0) 70%)" }}
      />

      <div className="relative z-10 flex flex-col min-h-screen mt-[50px]">
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
                  About Us · VoIP &amp; Telecom
                </span>
              </div>

              <h1 className="f-display text-4xl sm:text-4xl lg:text-[2.5rem] leading-[1.08] font-default text-[#eef2f9]">
                Built by engineers
                <br />
                <span className="text-[#2dd4bf]">who answer their own phones.</span>
              </h1>

              <p className="f-body mt-6 text-base sm:text-lg text-[#c3ceE2] leading-relaxed">
                Nexline started with a simple complaint: calling customer
                support shouldn't feel like a maze. A decade later, we run
                the network ourselves — so when something breaks, the
                people who built it are the ones who fix it.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button className="f-body rounded-lg bg-[#2dd4bf] text-[#062521] text-sm font-medium px-6 py-3 hover:bg-[#5ee4d4] transition-colors">
                  Meet the team
                </button>
                <button className="f-body rounded-lg bg-white/[0.04] border border-[rgba(148,163,196,0.25)] text-[#eef2f9] text-sm font-medium px-6 py-3 hover:border-[#2dd4bf]/50 transition-colors">
                  Our story
                </button>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-[#0b1220] bg-gradient-to-br from-[#2dd4bf]/40 to-[#101a30]"
                    />
                  ))}
                </div>
                <span className="f-body text-sm text-[#8ea0c4]">
                  <span className="text-[#eef2f9] font-medium">300+ people</span> keeping the lines open
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — glass pillar infographic: transparent icon tabs orbiting a hub */}
          <div className="relative flex items-center justify-center px-6 pt-8 pb-16 min-h-[460px]">
            <div className="relative w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[#2dd4bf]/10 blur-3xl" />

              {/* orbit rings, purely decorative */}
              <div className="spin-slow pointer-events-none absolute inset-6 rounded-full border border-dashed border-white/[0.12]" />
              <div className="pointer-events-none absolute inset-16 rounded-full border border-white/[0.08]" />

              {/* connecting spokes */}
              <svg viewBox="0 0 420 420" className="pointer-events-none absolute inset-0 w-full h-full">
                {PILLARS.map((p) => {
                  const rad = (p.angle * Math.PI) / 180;
                  const x = 210 + Math.cos(rad) * radius;
                  const y = 210 + Math.sin(rad) * radius;
                  return (
                    <line
                      key={p.label}
                      x1="210"
                      y1="210"
                      x2={x}
                      y2={y}
                      stroke="rgba(45,212,191,0.3)"
                      strokeWidth="1"
                      strokeDasharray="3 5"
                    />
                  );
                })}
              </svg>

              {/* central glass hub */}
              <div className="relative z-10 w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.16] flex flex-col items-center justify-center text-center px-4">
                <span className="pulse-ring absolute inset-0 rounded-full border border-[#2dd4bf]/40" />
                <div className="w-9 h-9 rounded-full bg-[#2dd4bf]/15 border border-[#2dd4bf]/40 flex items-center justify-center mb-1.5">
                  <Icon type="target" className="w-4 h-4 text-[#2dd4bf]" />
                </div>
                <div className="f-display text-sm font-semibold text-[#eef2f9] leading-tight">Nexline</div>
                <div className="f-mono text-[9px] uppercase tracking-wider text-[#8ea0c4] mt-0.5">Est. 2016</div>
              </div>

              {/* orbiting transparent icon tabs */}
              {PILLARS.map((p, i) => (
                <PillarTab key={p.label} pillar={p} radius={radius} delay={i * 0.4} />
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM — company-facts strip (icon + title + subtitle, divided) */}
        <div className="relative px-4 sm:px-6 pb-10 sm:pb-12 flex justify-center">
          <div
            className="w-full max-w-6xl rounded-2xl bg-[#101a30]/80 backdrop-blur-xl border border-[rgba(148,163,196,0.18)] flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[rgba(148,163,196,0.16)]"
            style={{ boxShadow: "0 20px 45px -18px rgba(0,0,0,0.6), 0 0 40px -14px rgba(45,212,191,0.12)" }}
          >
            {FACTS.map((f) => (
              <div key={f.title} className="flex-1 flex items-center gap-3.5 px-6 py-5">
                <span className="w-11 h-11 rounded-xl bg-[#2dd4bf]/10 border border-[#2dd4bf]/30 flex items-center justify-center shrink-0">
                  <Icon type={f.icon} className="w-5 h-5 text-[#2dd4bf]" />
                </span>
                <div className="min-w-0">
                  <div className="f-body text-[13px] font-semibold text-[#eef2f9] truncate">{f.title}</div>
                  <div className="f-body text-[12px] text-[#8ea0c4] truncate">{f.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}