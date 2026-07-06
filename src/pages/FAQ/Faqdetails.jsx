import { useState, useMemo } from "react";
import { Headset, Check, ArrowRight, PhoneCall } from "lucide-react";

/**
 * VoIP / Telecom — FAQ Section (light theme, single-screen fit)
 * White page: base #f6f8fb, surface #ffffff, line #e6ebf2, text #0f1a2e / #64748b.
 * Brand accents: navy #101a30, cyan #22d3ee / #0891b2.
 * Space Grotesk (display), Inter (body), IBM Plex Mono (data/labels).
 *
 * Layout: plain search bar up top. Below, a two-column row filling the
 * remaining viewport height: left = individual question boxes (own scroll
 * if the list overflows), right = an advertisement panel stretched
 * to match the left column's full height. No navbar / footer.
 *
 * Background: a soft animated "network map" (nodes + signal-carrying
 * lines) sits behind everything, washed with a light frosted overlay so
 * it reads as atmosphere rather than a competing image — the FAQ cards
 * stay solid white on top and are never harder to read than before.
 */

const FAQS = [
  {
    q: "How long does it take to set up Nexline?",
    a: "Most teams are making calls within 10 minutes. Port your existing number or grab a new one, invite your team, and your softphone or desk phone is ready — no hardware shipping required for the cloud plan.",
  },
  {
    q: "Can I keep my existing business phone number?",
    a: "Yes. We handle number porting for local, toll-free, and international numbers. Porting typically completes in 3–10 business days and your old line stays active until the switch is final.",
  },
  {
    q: "Is there a contract or can I cancel anytime?",
    a: "Plans are month-to-month by default, and you can cancel anytime from your dashboard. Annual plans are available at a discount if you'd rather lock in a lower rate.",
  },
  {
    q: "Do you charge extra for international calls?",
    a: "International minutes are billed per destination at published rates shown in your dashboard before you dial. Calls between Nexline users on any plan are always free, regardless of country.",
  },
  {
    q: "What happens if my internet goes down?",
    a: "Calls automatically fail over to a backup route — forwarding to a mobile number or landline you set in advance — so you don't miss anything while your connection recovers.",
  },
  {
    q: "Is my call data encrypted?",
    a: "All calls and messages are encrypted in transit using SRTP and TLS. Call recordings at rest are encrypted with AES-256, and access is controlled by the permissions you set for your team.",
  },
  {
    q: "Do you offer volume discounts for larger teams?",
    a: "Yes. Plans scale with per-seat pricing that steps down automatically as your team grows, and enterprise accounts can request custom rates for high call volume.",
  },
];

// Nodes + connecting lines for the ambient "network map" background.
// Coordinates live in a 1600x900 viewBox so the pattern scales with the screen.
const NET_NODES = [
  { x: 120, y: 130 }, { x: 380, y: 80 }, { x: 640, y: 190 },
  { x: 260, y: 320 }, { x: 520, y: 400 }, { x: 860, y: 120 },
  { x: 980, y: 300 }, { x: 1180, y: 160 }, { x: 1360, y: 260 },
  { x: 1460, y: 60 }, { x: 760, y: 460 }, { x: 1100, y: 440 },
  { x: 200, y: 560 }, { x: 1300, y: 520 }, { x: 620, y: 620 },
];

const NET_LINES = [
  [0, 1], [1, 2], [2, 5], [3, 1], [3, 4], [4, 2], [5, 6], [5, 7],
  [6, 7], [7, 8], [8, 9], [6, 10], [10, 4], [10, 11], [11, 7],
  [11, 13], [12, 3], [12, 14], [14, 10], [13, 8],
];

function FaqBox({ item, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-xl bg-white border px-5 sm:px-6 transition-colors ${
        isOpen ? "border-[#22d3ee]/50" : "border-[#e6ebf2]"
      }`}
      style={{ boxShadow: "0 12px 28px -22px rgba(15,26,46,0.3)" }}
    >
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 py-4 text-left group">
        <span
          className={`f-body text-[14px] sm:text-[15px] font-medium transition-colors ${
            isOpen ? "text-[#0891b2]" : "text-[#0f1a2e] group-hover:text-[#0891b2]"
          }`}
        >
          {item.q}
        </span>
        <span
          className={`f-display shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center text-base leading-none transition-colors ${
            isOpen
              ? "border-[#22d3ee]/50 bg-[#101a30] text-[#22d3ee]"
              : "border-[#e6ebf2] bg-[#f6f8fb] text-[#64748b] group-hover:border-[#22d3ee]/40"
          }`}
        >
          {isOpen ? "–" : "+"}
        </span>
      </button>
      <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className="f-body text-[13px] text-[#64748b] leading-relaxed pb-4 pr-8">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="w-full h-screen relative flex flex-col overflow-hidden" style={{ backgroundColor: "#f6f8fb" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .f-display { font-family: 'Space Grotesk', sans-serif; }
        .f-body { font-family: 'Inter', sans-serif; }
        .f-mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes drift { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .drift { animation: drift 6s ease-in-out infinite; }
        .drift-slow { animation: drift 9s ease-in-out infinite; animation-delay: 1.5s; }
        @keyframes netFlow { to { stroke-dashoffset: -240; } }
        .net-line { animation: netFlow 7s linear infinite; }
        @keyframes netPulse { 0%, 100% { opacity: 0.35; r: 3.5; } 50% { opacity: 0.9; r: 6; } }
        .net-node { animation: netPulse 3.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .drift, .drift-slow, .net-line, .net-node { animation: none; }
        }
      `}</style>

      {/* ambient telecom network map — light cyan on the page base, never dark */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.35 }}
      >
        {NET_LINES.map(([a, b], i) => {
          const from = NET_NODES[a];
          const to = NET_NODES[b];
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#22d3ee"
              strokeWidth="1.2"
              strokeDasharray="5 9"
              className="net-line"
              style={{ animationDelay: `${(i % 6) * 0.4}s` }}
            />
          );
        })}
        {NET_NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="4"
            fill="#0891b2"
            className="net-node"
            style={{ animationDelay: `${(i % 5) * 0.5}s` }}
          />
        ))}
      </svg>

      {/* soft drifting glows for extra depth, still on-palette and light */}
      <div className="drift pointer-events-none absolute -top-16 right-[8%] w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: "rgba(34,211,238,0.14)" }} />
      <div className="drift-slow pointer-events-none absolute bottom-[-4rem] left-[6%] w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: "rgba(8,145,178,0.10)" }} />

      {/* light frosted wash above the pattern so every FAQ box stays fully readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(246,248,251,0.94) 0%, rgba(246,248,251,0.90) 35%, rgba(246,248,251,0.96) 100%)",
        }}
      />

      {/* foreground content, above the background layers */}
      <div className="relative z-10 flex flex-col h-full">
        {/* plain search bar, no icon */}
        <div className="shrink-0 px-6 sm:px-10 pt-8 pb-5 flex justify-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search your question — e.g. call quality, billing, setup"
            className="f-body w-full max-w-xl rounded-xl bg-white border border-[#2dd4bf] px-5 py-3.5 text-sm text-[#0f1a2e] placeholder:text-[#94a3b8] outline-none focus:border-[#22d3ee]/60 transition-colors"
            style={{ boxShadow: "0 12px 28px -22px rgba(15,26,46,0.25)" }}
          />
        </div>

        {/* fills remaining viewport height */}
        <div className="flex-1 min-h-0 px-6 sm:px-10 pb-8">
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-stretch">
            {/* left — question boxes, own scroll if needed */}
            <div className="h-full overflow-y-auto pr-1 flex flex-col gap-3">
              {filtered.length > 0 ? (
                filtered.map((item, i) => (
                  <FaqBox key={item.q} item={item} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
                ))
              ) : (
                <div className="rounded-xl bg-white border border-[#e6ebf2] py-14 text-center">
                  <span className="f-body text-sm text-[#64748b]">
                    No questions match "<span className="text-[#0f1a2e]">{query}</span>".
                  </span>
                </div>
              )}
            </div>

            {/* right — advertisement panel, matches left column height */}
            <div
              className="h-full flex flex-col rounded-2xl relative overflow-hidden p-6 sm:p-7 text-white"
              style={{
                background: "linear-gradient(155deg, #101a30 0%, #0b3a4a 55%, #0891b2 140%)",
                boxShadow: "0 30px 60px -25px rgba(16,26,48,0.55)",
              }}
            >
              {/* decorative glows */}
              <div className="drift pointer-events-none absolute -top-14 -right-14 w-52 h-52 rounded-full blur-3xl" style={{ backgroundColor: "rgba(34,211,238,0.22)" }} />
              <div className="drift-slow pointer-events-none absolute -bottom-16 -left-10 w-56 h-56 rounded-full blur-3xl" style={{ backgroundColor: "rgba(34,211,238,0.12)" }} />
              <PhoneCall size={150} className="pointer-events-none absolute -bottom-6 -right-6 opacity-[0.06]" color="#ffffff" />

              <div className="relative flex flex-col h-full">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 border"
                  style={{ backgroundColor: "rgba(34,211,238,0.15)", borderColor: "rgba(34,211,238,0.3)" }}
                >
                  <Headset size={20} style={{ color: "#22d3ee" }} />
                </div>

                <span className="f-mono text-[10px] tracking-[0.25em] uppercase text-white/70 mb-2">
                  Need a hand?
                </span>

                <h3 className="f-display text-xl font-semibold leading-snug">Still can't find your answer?</h3>
                <p className="f-body text-[13px] text-white/75 mt-2.5 leading-relaxed">
                  Our team replies fast and actually knows the product. No ticket queues, no bots reading a script.
                </p>

                <div className="mt-7 flex flex-col gap-3.5">
                  {[
                    "Live chat — reply in 45 sec",
                    "Talk to a real engineer",
                    "Book a 15-min demo",
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "rgba(34,211,238,0.18)" }}
                      >
                        <Check size={11} style={{ color: "#22d3ee" }} />
                      </span>
                      <span className="f-body text-[13px] text-white/90">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex-1" />

                <button className="f-body group w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white text-[#101a30] text-sm font-semibold px-5 py-3.5 hover:bg-slate-50 transition-all hover:scale-[1.02]">
                  Get Started
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <p className="f-mono text-[10px] uppercase tracking-wider text-white/60 text-center mt-3">
                  Setup takes less than 10 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}