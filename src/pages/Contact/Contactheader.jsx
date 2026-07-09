import { useState, useEffect } from "react";
import HeroBg from "../../Assets/Images/photo-1521737604893-d14cc237f11d.avif";



const CHANNELS = [
  {
    icon: "phone",
    label: "Call us",
    value: "+91 9462719609",
    note: "Mon–Sat, 8am–10pm PST",
    title: "24/7 Phone Support",
    subtitle: "+919462719609",
  },
  {
    icon: "mail",
    label: "Email us",
    value: "support@nexline.com",
    note: "We reply within 24 hours",
    title: "Fast Email Replies",
    subtitle: "Reply within 24 hours",
  },
  {
    icon: "pin",
    label: "Visit office",
    value: " 71-75 Shelton Street, covent Garden, London, WC2H 9JQ united Kingdom",
    note: "Weekdays, by appointment",
    title: "Handpicked Offices",
    subtitle: " LONDON, UNITED KINGDOM HA4 7AE",
  },
  {
    icon: "chat",
    label: "Live chat",
    value: "128 agents online now",
    note: "Avg. reply in 45 seconds",
    title: "Live Chat Online",
    subtitle: "128 agents online now",
  },
];

// Live network/support metrics — each paired with an icon and a fill bar.
const STATS = [
  { icon: "signal", label: "Call clarity", value: 98, display: "98%" },
  { icon: "clock", label: "Network uptime", value: 99.9, display: "99.9%" },
  { icon: "chat", label: "Agents online now", value: 85, display: "128 / 150" },
  { icon: "mail", label: "Tickets resolved today", value: 92, display: "340 closed" },
];

// Decorative weekly call-volume bar chart (icons + bars, per the brief).
const CALL_VOLUME = [
  { day: "Mon", h: 45 },
  { day: "Tue", h: 62 },
  { day: "Wed", h: 40 },
  { day: "Thu", h: 78 },
  { day: "Fri", h: 96 },
  { day: "Sat", h: 58 },
  { day: "Sun", h: 34 },
];

function Icon({ type, className }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "phone")
    return (
      <svg viewBox="0 0 24 24" className={className} {...c}>
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.9 21 3 12.1 3 1c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .8-.2 1.1L6.6 10.8Z" />
      </svg>
    );
  if (type === "chat")
    return (
      <svg viewBox="0 0 24 24" className={className} {...c}>
        <path d="M4 5h16v10H8l-4 4V5Z" />
        <path d="M8 9h8M8 12h5" />
      </svg>
    );
  if (type === "mail")
    return (
      <svg viewBox="0 0 24 24" className={className} {...c}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 6.5 8 6 8-6" />
      </svg>
    );
  if (type === "clock")
    return (
      <svg viewBox="0 0 24 24" className={className} {...c}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    );
  if (type === "signal")
    return (
      <svg viewBox="0 0 24 24" className={className} {...c}>
        <path d="M4 18v-3M9 18v-6M14 18V9M19 18V5" />
      </svg>
    );
  if (type === "chart")
    return (
      <svg viewBox="0 0 24 24" className={className} {...c}>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </svg>
    );
  if (type === "trend")
    return (
      <svg viewBox="0 0 24 24" className={className} {...c}>
        <path d="M3 17 9 11l4 4 8-8" />
        <path d="M15 7h6v6" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={className} {...c}>
      <path d="M12 21s7-6.6 7-11.6A7 7 0 0 0 5 9.4C5 14.4 12 21 12 21Z" />
      <circle cx="12" cy="9.4" r="2.4" />
    </svg>
  );
}

function StatBar({ stat, delay = 0 }) {
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 200 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-6 h-6 rounded-md bg-white/[0.05] border border-[rgba(148,163,196,0.2)] flex items-center justify-center shrink-0">
          <Icon type={stat.icon} className="w-3.5 h-3.5 text-[#2dd4bf]" />
        </span>
        <span className="f-body text-[12px] text-[#c3ceE2] flex-1">{stat.label}</span>
        <span className="f-mono text-[11px] text-[#eef2f9]">{stat.display}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#2dd4bf] to-[#5ee4d4] transition-all duration-1000 ease-out"
          style={{ width: filled ? `${Math.min(stat.value, 100)}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function VolumeBar({ data, delay = 0 }) {
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGrown(true), 250 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      <div className="relative w-full h-full flex items-end justify-center">
        <div
          className="w-full max-w-[18px] rounded-t-md bg-gradient-to-t from-[#2dd4bf]/40 to-[#2dd4bf] transition-all duration-700 ease-out"
          style={{ height: grown ? `${data.h}%` : "0%" }}
        />
      </div>
      <span className="f-mono text-[8px] uppercase tracking-wide text-[#8ea0c4]">{data.day}</span>
    </div>
  );
}

export default function ContactUsHeader() {
  const [msgSent, setMsgSent] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-[#0b1220] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .f-display { font-family: 'Space Grotesk', sans-serif; }
        .f-body { font-family: 'Inter', sans-serif; }
        .f-mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes drift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes blink { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
        @keyframes dash { to { stroke-dashoffset: -24; } }
        .drift { animation: drift 5.5s ease-in-out infinite; }
        .dot-1 { animation: blink 1.4s ease-in-out infinite; }
        .dot-2 { animation: blink 1.4s ease-in-out 0.2s infinite; }
        .dot-3 { animation: blink 1.4s ease-in-out 0.4s infinite; }
        .spine-dash { stroke-dasharray: 4 6; animation: dash 1.6s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .drift, .dot-1, .dot-2, .dot-3, .spine-dash { animation: none; }
        }
      `}</style>

      {/* FULL-BLEED BACKGROUND IMAGE — same treatment as the FAQ header */}
     <div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url(${HeroBg})`,
  }}
/>
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
          {/* LEFT — content (unchanged) */}
          <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 pt-24 pb-16">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2dd4bf]" />
                </span>
                <span className="f-mono text-[11px] tracking-[0.25em] uppercase text-[#8ea0c4]">
                  Contact · VoIP &amp; Telecom
                </span>
              </div>

              <h1 className="f-default text-4xl sm:text-4xl lg:text-[2.5rem] leading-[1.08] font-default text-[#eef2f9]">
                Talk to a person,
                <br />
                <span className="text-[#2dd4bf]">not a phone tree.</span>
              </h1>

              <p className="f-body mt-6 text-base sm:text-lg text-[#c3ceE2] leading-relaxed">
                Whether it's a dropped call, a billing question, or setting up
                a new line our network engineers and support team pick up
                fast, on whichever channel works for you.
              </p>

              {/* quick message form */}
              <div className="mt-9 rounded-xl bg-[#101a30]/70 backdrop-blur border border-[rgba(148,163,196,0.2)] p-4 focus-within:border-[#2dd4bf]/50 transition-colors">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="f-body bg-transparent outline-none text-sm text-[#eef2f9] placeholder:text-[#8ea0c4]/70 border-b border-[rgba(148,163,196,0.16)] py-2"
                  />
                  <input
                    type="text"
                    placeholder="Phone or email"
                    className="f-body bg-transparent outline-none text-sm text-[#eef2f9] placeholder:text-[#8ea0c4]/70 border-b border-[rgba(148,163,196,0.16)] py-2"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="What can we help with?"
                  className="f-body w-full mt-3 bg-transparent outline-none text-sm text-[#eef2f9] placeholder:text-[#8ea0c4]/70 resize-none"
                />
                <div className="mt-3 flex items-center justify-between">
                  <span className="f-mono text-[11px] text-[#8ea0c4]">We reply within 2 hours</span>
                  <button
                    onClick={() => setMsgSent(true)}
                    className="f-body rounded-lg bg-[#2dd4bf] text-[#062521] text-sm font-medium px-5 py-2.5 hover:bg-[#5ee4d4] transition-colors"
                  >
                    {msgSent ? "Sent ✓" : "Send message"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — live network infographic: icon metric bars + weekly call-volume chart */}
          <div className="relative flex items-center justify-center px-6 sm:px-10 pt-10 pb-12 min-h-[460px]">
            <div className="relative w-full max-w-[440px]">
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[#2dd4bf]/10 blur-3xl" />

              {/* floating corner chip */}
              <div
                className="drift absolute -top-6 -right-4 sm:-right-8 z-10 flex items-center gap-2 rounded-full bg-[#101a30]/90 backdrop-blur border border-[#2dd4bf]/40 pl-2 pr-4 py-2"
                style={{ boxShadow: "0 15px 30px -14px rgba(45,212,191,0.4)" }}
              >
                <span className="w-7 h-7 rounded-full bg-[#2dd4bf]/15 flex items-center justify-center">
                  <Icon type="trend" className="w-3.5 h-3.5 text-[#2dd4bf]" />
                </span>
                <div className="leading-tight">
                  <div className="f-display text-xs font-semibold text-[#eef2f9]">+18%</div>
                  <div className="f-mono text-[8px] uppercase tracking-wider text-[#8ea0c4]">vs last month</div>
                </div>
              </div>

              {/* main stats card */}
              <div
                className="relative rounded-2xl bg-[#101a30]/85 backdrop-blur border border-[rgba(148,163,196,0.18)] p-5 sm:p-6"
                style={{ boxShadow: "0 25px 55px -20px rgba(0,0,0,0.6)" }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="f-mono text-[11px] tracking-[0.2em] uppercase text-[#8ea0c4]">
                    Live network status
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#2dd4bf] opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2dd4bf]" />
                    </span>
                    <span className="f-mono text-[10px] text-[#2dd4bf]">Normal</span>
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {STATS.map((s, i) => (
                    <StatBar key={s.label} stat={s} delay={i * 120} />
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-[rgba(148,163,196,0.14)]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="f-mono text-[10px] tracking-[0.2em] uppercase text-[#8ea0c4]">
                      Weekly call volume
                    </span>
                    <Icon type="phone" className="w-3.5 h-3.5 text-[#8ea0c4]" />
                  </div>
                  <div className="flex items-end justify-between gap-2 h-24">
                    {CALL_VOLUME.map((d, i) => (
                      <VolumeBar key={d.day} data={d} delay={i * 80} />
                    ))}
                  </div>
                </div>
              </div>

              {/* floating corner chip */}
              <div
                className="drift absolute -bottom-5 -left-3 sm:-left-6 z-10 flex items-center gap-2 rounded-full bg-[#101a30]/90 backdrop-blur border border-[rgba(148,163,196,0.25)] pl-2 pr-4 py-2"
                style={{ boxShadow: "0 15px 30px -14px rgba(0,0,0,0.55)", animationDelay: "1.2s" }}
              >
                <span className="w-7 h-7 rounded-full bg-[#fbbf24]/15 flex items-center justify-center">
                  <Icon type="pin" className="w-3.5 h-3.5 text-[#fbbf24]" />
                </span>
                <div className="leading-tight">
                  <div className="f-display text-xs font-semibold text-[#eef2f9]">50+ countries</div>
                  <div className="f-mono text-[8px] uppercase tracking-wider text-[#8ea0c4]">lines supported</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM — contact feature strip (icon + title + subtitle, divider layout) */}
        <div className="relative px-4 sm:px-6 pb-10 sm:pb-12 flex justify-center">
          <div
            className="w-full max-w-6xl rounded-2xl bg-[#101a30]/80 backdrop-blur-xl border border-[rgba(148,163,196,0.18)] flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[rgba(148,163,196,0.16)]"
            style={{ boxShadow: "0 20px 45px -18px rgba(0,0,0,0.6), 0 0 40px -14px rgba(45,212,191,0.12)" }}
          >
            {CHANNELS.map((ch) => (
              <div key={ch.label} className="flex-1 flex items-center gap-3.5 px-6 py-5">
                <span className="w-11 h-11 rounded-xl bg-[#2dd4bf]/10 border border-[#2dd4bf]/30 flex items-center justify-center shrink-0">
                  <Icon type={ch.icon} className="w-5 h-5 text-[#2dd4bf]" />
                </span>
                <div className="min-w-0">
                  <div className="f-body text-[13px] font-semibold text-[#eef2f9] truncate">{ch.title}</div>
                  <div className="f-body text-[12px] text-[#8ea0c4] truncate">{ch.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}