import { useState } from "react";

/**
 * VoIP / Telecom FAQ — full-bleed image hero + stats bar + category tabs
 * Palette: base #0b1220, surface #101a30, line rgba(148,163,196,.14),
 *          signal teal #2dd4bf, live amber #fbbf24, text #eef2f9 / #8ea0c4
 * Type: Space Grotesk (display), Inter (body), IBM Plex Mono (data/labels)
 */

const TABS = [
  { label: "General questions", icon: "question", desc: "Plans, features, and getting started basics." },
  { label: "Technical support", icon: "wrench", desc: "Call drops, setup issues, and troubleshooting." },
  { label: "Payment related", icon: "card", desc: "Billing cycles, invoices, and payment methods." },
  { label: "Account & security", icon: "shield", desc: "Login, 2FA, and protecting your account." },
  { label: "Numbers & porting", icon: "phone", desc: "Transfer, activate, or manage phone numbers." },
  { label: "Call quality & network", icon: "signal", desc: "Latency, coverage, and connection strength." },
];

const STATS = [
  { value: "99.99%", label: "Network uptime", icon: "signal" },
  { value: "150+", label: "Countries connected", icon: "globe" },
  { value: "2M+", label: "Calls handled daily", icon: "phone" },
  { value: "24/7", label: "Live support", icon: "headset" },
];

function StatIcon({ type, className }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "signal")
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M4 18v-3M9 18v-6M14 18V9M19 18V5" />
      </svg>
    );
  if (type === "globe")
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" />
      </svg>
    );
  if (type === "phone")
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.9 21 3 12.1 3 1c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .8-.2 1.1L6.6 10.8Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M4 13a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1v-6h3M4 13v6h1a2 2 0 0 0 2-2v-4H4Z" />
    </svg>
  );
}

function TabIcon({ type, className }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "question")
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1.3 1-1.3 1.9" />
        <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    );
  if (type === "wrench")
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 4.7L4 16.3V20h3.7l5.3-5.3a4 4 0 0 0 4.7-5.4l-2.6 2.6-2-2 2.6-2.6Z" />
      </svg>
    );
  if (type === "card")
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h4" />
      </svg>
    );
  if (type === "phone")
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.9 21 3 12.1 3 1c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .8-.2 1.1L6.6 10.8Z" />
      </svg>
    );
  if (type === "signal")
    return (
      <svg viewBox="0 0 24 24" className={className} {...common}>
        <path d="M4 18v-3M9 18v-6M14 18V9M19 18V5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={className} {...common}>
      <path d="M12 2 4 5.5V11c0 5 3.4 8.9 8 10 4.6-1.1 8-5 8-10V5.5L12 2Z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </svg>
  );
}

export default function VoipFaqHeader() {
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full min-h-screen bg-[#0b1220] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .f-display { font-family: 'Space Grotesk', sans-serif; }
        .f-body { font-family: 'Inter', sans-serif; }
        .f-mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes sonar {
          0%   { transform: scale(0.55); opacity: 0.55; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes drift {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .sonar-ring { animation: sonar 3.6s cubic-bezier(0.2,0.6,0.4,1) infinite; }
        .drift { animation: drift 5s ease-in-out infinite; }
        .spin-slow { animation: spin-slow 22s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sonar-ring, .drift, .spin-slow { animation: none; }
        }
      `}</style>

      {/* FULL-BLEED BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
style={{
  backgroundImage:
    "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop')",
}}
      />
      {/* dark navy wash + shadow so text/cards read on top of the photo */}
      <div className="absolute inset-0 bg-[#0b1220]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220] via-[#0b1220]/70 to-[#0b1220]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-[#0b1220]/40" />

      {/* ambient teal bloom, same family as accent */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(45,212,191,0.18) 0%, rgba(45,212,191,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 w-[520px] h-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(45,212,191,0.08) 0%, rgba(45,212,191,0) 70%)" }}
      />

      <div className="relative z-10 flex flex-col min-h-screen mt-[50px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 flex-1">
          {/* LEFT — content, sits directly on the photo */}
          <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 pt-24 pb-16">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2dd4bf]" />
                </span>
                <span className="f-mono text-[11px] tracking-[0.25em] uppercase text-[#8ea0c4]">
                  Support · VoIP &amp; Telecom
                </span>
              </div>

              <h1 className="f-default text-4xl sm:text-4xl lg:text-[2.4rem] leading-[1.08] font-default text-[#eef2f9]">
                Clear lines,
                <br />
                <span className="text-[#2dd4bf]">straight answers.</span>
              </h1>

              <p className="f-body mt-6 text-default sm:text-lg text-[#c3ceE2] leading-relaxed">
                Everything about setting up numbers, routing calls, and keeping
                your lines crystal clear — answered by the people who built the
                network, not a script.
              </p>

              {/* search */}
              <div className="mt-9 flex items-center gap-2 rounded-xl bg-[#101a30]/80 backdrop-blur border border-[rgba(148,163,196,0.2)] p-1.5 focus-within:border-[#2dd4bf]/50 transition-colors">
                <svg className="ml-3 w-4 h-4 text-[#8ea0c4] shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search “porting a number”, “call drops”…"
                  className="f-body flex-1 bg-transparent outline-none text-sm text-[#eef2f9] placeholder:text-[#8ea0c4]/70 py-2"
                />
                <button className="f-body shrink-0 rounded-lg bg-[#2dd4bf] text-[#062521] text-sm font-medium px-4 py-2.5 hover:bg-[#5ee4d4] transition-colors">
                  Search
                </button>
              </div>

              {/* CTAs, echoing the reference layout */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button className="f-body rounded-lg bg-[#5ee4d4] text-black text-sm font-semibold px-5 py-3 hover:bg-[#2dd4bf] transition-colors">
                  Browse all FAQs →
                </button>
                <button className="f-body flex items-center gap-2 rounded-lg border border-[rgba(148,163,196,0.3)] text-[#eef2f9] text-sm font-medium px-5 py-3 hover:border-[#2dd4bf]/50 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7L8 5Z" />
                  </svg>
                  Contact support
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — transparent glass tab floating over the same background image */}
          <div className="relative flex items-center justify-center px-6 pt-8 pb-16 min-h-[420px]">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              {/* sonar rings */}
              <span className="sonar-ring absolute w-56 h-56 rounded-full border border-[#2dd4bf]/40" style={{ animationDelay: "0s" }} />
              <span className="sonar-ring absolute w-56 h-56 rounded-full border border-[#2dd4bf]/40" style={{ animationDelay: "1.2s" }} />
              <span className="sonar-ring absolute w-56 h-56 rounded-full border border-[#2dd4bf]/40" style={{ animationDelay: "2.4s" }} />

              {/* dashed orbit with route nodes */}
              <svg className="spin-slow absolute w-[340px] h-[340px]" viewBox="0 0 340 340" fill="none">
                <circle cx="170" cy="170" r="150" stroke="rgba(148,163,196,0.3)" strokeWidth="1" strokeDasharray="3 7" />
                <circle cx="170" cy="20" r="5" fill="#2dd4bf" />
                <circle cx="300" cy="235" r="4" fill="#fbbf24" />
                <circle cx="55" cy="255" r="4" fill="#eef2f9" fillOpacity="0.6" />
              </svg>

              {/* transparent tab — same base color as the page bg, glassed over the photo */}
              <div
                className="drift relative z-10 w-64 rounded-2xl bg-[#0b1220]/55 backdrop-blur-xl border border-[rgba(148,163,196,0.25)] p-5"
                style={{ boxShadow: "0 30px 60px -20px rgba(45,212,191,0.35), 0 0 0 1px rgba(45,212,191,0.06)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="f-mono text-[10px] tracking-widest uppercase text-[#2dd4bf]">Connected</span>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2dd4bf]" />
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#0b1220]/70 border border-[rgba(148,163,196,0.2)] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#2dd4bf]" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.9 21 3 12.1 3 1c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .8-.2 1.1L6.6 10.8Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="f-body text-sm text-[#eef2f9] font-medium">+1 (415) 555 0142</div>
                    <div className="f-mono text-[11px] text-[#8ea0c4]">04:12 · HD voice</div>
                  </div>
                </div>

                {/* waveform */}
                <div className="mt-4 flex items-end gap-[3px] h-8">
                  {[6, 14, 22, 10, 26, 16, 8, 20, 12, 24, 9, 18, 7, 15].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-sm bg-[#2dd4bf]/70"
                      style={{ height: `${h}px`, opacity: i % 3 === 0 ? 1 : 0.55 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS BAR — full-width, sitting on the image like the reference layout */}
        <div className="relative border-t border-b border-[rgba(148,163,196,0.16)] bg-[#0b1220]/85 backdrop-blur ">
          <div className="max-w-6xl mx-auto px-6 sm:px-12 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 mr-[120px]">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#101a30] border border-[rgba(148,163,196,0.16)] flex items-center justify-center">
                  <StatIcon type={s.icon} className="w-4.5 h-4.5 text-[#2dd4bf]" />
                </div>
                <div>
                  <div className="f-mono text-lg sm:text-xl text-[#eef2f9] leading-none">{s.value}</div>
                  <div className="f-body text-xs text-[#8ea0c4] mt-1">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY TABS — 6 straight, transparent boxes: centered yellow icon, title, description */}
        <div className="relative bg-[#0b1220] px-6 sm:px-12 py-12">
          <div className="max-w-8xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TABS.map((tab, i) => {
              const active = i === activeTab;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`f-body flex flex-col items-center text-center gap-3 border bg-transparent px-4 py-7 transition-colors ${
                    active
                      ? "border-[#2dd4bf]/60"
                      : "border-[rgba(148,163,196,0.16)] hover:border-[rgba(148,163,196,0.32)]"
                  }`}
                >
                  <TabIcon type={tab.icon} className="w-9 h-9 text-[#2dd4bf]" />
                  <div>
                    <div className={`text-sm font-semibold ${active ? "text-[#eef2f9]" : "text-[#dbe3f2]"}`}>
                      {tab.label}
                    </div>
                    <div className="text-xs text-[#8ea0c4] mt-1.5 leading-relaxed">
                      {tab.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}