import React, { useState } from "react";
import {
  Target,
  Heart,
  Zap,
  Users,
  ShieldCheck,
  PhoneCall,
  Check,
  ArrowRight,
  Star,
  Globe2,
} from "lucide-react";

// Animated telecom "network map" background — shared across the site for
// a consistent look. Pulsing nodes connected by flowing dashed lines,
// plus two soft drifting glow blobs.
const NODES = [
  { x: "8%", y: "20%" },
  { x: "22%", y: "58%" },
  { x: "34%", y: "14%" },
  { x: "47%", y: "70%" },
  { x: "58%", y: "30%" },
  { x: "72%", y: "60%" },
  { x: "84%", y: "20%" },
  { x: "93%", y: "74%" },
  { x: "16%", y: "88%" },
  { x: "55%", y: "8%" },
];

const LINKS = [
  [0, 1], [1, 2], [1, 3], [3, 4], [4, 5],
  [5, 6], [6, 7], [3, 8], [2, 9], [4, 9],
];

function NetworkBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-gray-300">
      <style>{`
        @keyframes dashFlow { to { stroke-dashoffset: -24; } }
        @keyframes nodePulse { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
        @keyframes driftA { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -24px); } }
        @keyframes driftB { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-26px, 22px); } }
        .drift-a { animation: driftA 13s ease-in-out infinite; }
        .drift-b { animation: driftB 16s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .drift-a, .drift-b, .net-line, .net-node { animation: none !important; }
        }
      `}</style>

      <svg className="w-full h-full" preserveAspectRatio="none">
        {LINKS.map(([a, b], i) => (
          <line
            key={i}
            className="net-line"
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="#22d3ee"
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity="0.4"
            style={{ animation: "dashFlow 3s linear infinite" }}
          />
        ))}
        {NODES.map((n, i) => (
          <circle
            key={i}
            className="net-node"
            cx={n.x}
            cy={n.y}
            r="3.5"
            fill="#0891b2"
            style={{
              animation: `nodePulse ${3 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </svg>

      <div
        className="drift-a absolute w-80 h-80 rounded-full blur-3xl"
        style={{ top: "8%", left: "4%", backgroundColor: "rgba(34,211,238,0.15)" }}
      />
      <div
        className="drift-b absolute w-96 h-96 rounded-full blur-3xl"
        style={{ bottom: "4%", right: "6%", backgroundColor: "rgba(8,145,178,0.12)" }}
      />
    </div>
  );
}

const STATS = [
  { value: "10M+", label: "Calls Connected Monthly" },
  { value: "200+", label: "Support Specialists" },
  { value: "18", label: "Industry Awards" },
  { value: "120+", label: "Countries Served" },
];

const HERO_HIGHLIGHTS = [
  { icon: ShieldCheck, text: "99.99% uptime SLA" },
  { icon: Globe2, text: "Local numbers in 120+ countries" },
  { icon: PhoneCall, text: "24/7 human support, no bots" },
];

// 4-tab feature grid shown on the left side of the hero, in place of a photo.
const ABOUT_TABS = [
  {
    icon: Target,
    heading: "Our Mission",
    description:
      "Keeping every business reachable and effortlessly connected, no matter how far the team spreads.",
  },
  {
    icon: Heart,
    heading: "Our Vision",
    description:
      "A world without dropped calls — every conversation clear and instant, wherever it happens.",
  },
  {
    icon: Zap,
    heading: "Our Approach",
    description:
      "Carrier-grade infrastructure paired with AI automation, shipped without ever compromising uptime.",
  },
  {
    icon: Users,
    heading: "Our People",
    description:
      "Engineers who answer their own support line, so nothing gets lost between building and helping.",
  },
];

const VALUE_TABS = [
  {
    icon: Target,
    label: "Our Mission",
    heading: "Keeping Every Business Connected",
    description:
      "We build voice and messaging infrastructure that keeps businesses reachable, reliable, and effortlessly connected — no matter how big the team gets or how far it spreads. Every product decision we make starts with the same question: does this make a conversation easier to have, or harder?",
    features: [
      "Carrier-grade reliability by default",
      "Infrastructure that scales with you",
      "No conversation left unanswered",
    ],
    image: "https://i.pinimg.com/1200x/cb/ef/f9/cbeff9d518a4c9e6f5c2334f08bf1898.jpg",
  },
  {
    icon: Heart,
    label: "Our Vision",
    heading: "A World Without Dropped Calls",
    description:
      "We imagine a future where distance and infrastructure never stand between a business and its customers — where every conversation feels local, instant, and clear, whether it crosses one office or twelve time zones.",
    features: [
      "Borderless, carrier-grade voice",
      "One platform for every market",
      "Consistent quality, everywhere",
    ],
    image: "https://i.pinimg.com/736x/2a/82/ae/2a82ae33e876a2c5ec34171f05296f8c.jpg",
  },
  {
    icon: Zap,
    label: "Our Approach",
    heading: "Technology That Just Works",
    description:
      "We pair carrier-grade voice infrastructure with AI-driven automation, shipping new capabilities constantly without ever compromising the uptime our customers depend on. Simplicity is a feature we design for, not an afterthought.",
    features: [
      "AI automation without the complexity",
      "Continuous delivery, zero downtime",
      "Built with real support teams",
    ],
    image: "https://i.pinimg.com/736x/4e/1f/eb/4e1feb9123d1322fe7b8585d26f4a737.jpg",
  },
  {
    icon: Users,
    label: "Our People",
    heading: "Engineers Who Answer Their Own Support Line",
    description:
      "Every engineer on our team spends time on live support calls. It keeps us honest about what's actually broken, and it means the person who built a feature is often the same person who helps you use it.",
    features: [
      "Support led by real engineers",
      "Direct feedback loop to product",
      "No outsourced first-line support",
    ],
    image: "https://i.pinimg.com/1200x/7e/22/30/7e22307b7f225a5338f594f78b5b9049.jpg",
  },
];

const JOURNEY = [
  {
    year: "2018",
    heading: "Founded In A Small Office",
    description: [
      "Two engineers started routing calls for local businesses out of a single rented room, one client at a time. The first version of our platform ran on a single server, a secondhand router, and a lot of patience.",
      "There was no roadmap beyond the next client call. Every feature we built that first year existed because a real customer asked for it — a habit that shaped how we still build today.",
    ],
    image: "https://i.pinimg.com/736x/84/17/68/8417680f5866342d5a194b9c6eb38d12.jpg",
  },
  {
    year: "2019",
    heading: "Signed Our First Enterprise Client",
    description: [
      "A 200-seat logistics company took a chance on us over an established provider, betting that a smaller team would move faster on their edge cases. That bet forced us to rebuild our call-routing engine to handle real concurrency for the first time.",
      "It was also the year we hired outside the founding team — three engineers and our first dedicated account manager — and started treating uptime as a promise rather than a hope.",
    ],
    image: "https://i.pinimg.com/1200x/70/a6/86/70a686f3e0a1490c6d7fa642eb96460e.jpg",
  },
  {
    year: "2020",
    heading: "Went Remote-First, Overnight",
    description: [
      "When offices emptied out worldwide, call volume through our platform tripled in six weeks as businesses scrambled to keep answering their phones from kitchen tables and spare bedrooms. We shipped a browser-based softphone in seventeen days to keep up.",
      "That sprint taught us more about resilience under real load than the previous two years combined, and it's the reason failover routing became a default, not an add-on.",
    ],
    image: "https://i.pinimg.com/1200x/f6/29/36/f62936f782f33ef46ed232acb9d54197.jpg",
  },
  {
    year: "2021",
    heading: "Crossed One Million Calls",
    description: [
      "Word of mouth carried us into new cities as our platform handled its first million connected calls in a single month. That milestone arrived quietly, buried in a dashboard, but it's the one the founding team still talks about most.",
      "It was also the year we hired our first dedicated support team, freeing engineers from the phone queue for the first time — though most of them stayed on it anyway, out of habit.",
    ],
    image: "https://i.pinimg.com/1200x/5a/bf/0d/5abf0daa68f43152dcfd10c48ebc48f5.jpg",
  },
  {
    year: "2022",
    heading: "Expanded To 50 Countries",
    description: [
      "We launched carrier partnerships across five continents in the same year, bringing local numbers and carrier-grade call quality to businesses everywhere, not just our home market.",
      "Getting there meant navigating fifty different sets of telecom regulations, a process slower and messier than any of our engineers expected — but it meant a customer in Lagos and a customer in Lisbon now got the exact same call quality.",
    ],
    image: "https://i.pinimg.com/1200x/9f/5a/c4/9f5ac48ebb287bbb7aca03841d78b8ae.jpg",
  },
  {
    year: "2023",
    heading: "Shipped Real-Time Call Analytics",
    description: [
      "Customers had been asking for visibility into their own call data for years, so we built dashboards that surface talk time, sentiment, and drop-off rates as calls happen, not the next morning in a CSV export.",
      "Within months, teams were using the data to retrain agents and rewrite scripts mid-week instead of mid-quarter — analytics stopped being a report and became part of the daily workflow.",
    ],
    image: "https://i.pinimg.com/1200x/47/bf/13/47bf13e16e47f35d2718653991830f37.jpg",
  },
  {
    year: "2024",
    heading: "Launched AI Call Automation",
    description: [
      "Our first AI-driven routing and IVR suite shipped after two years of development, cutting average wait times for our customers' callers by more than half in the first quarter alone.",
      "We were careful about where automation stopped — every flow we shipped had an obvious, one-tap way to reach a human, because the goal was shorter queues, not fewer people answering the phone.",
    ],
    image: "https://i.pinimg.com/1200x/05/86/9e/05869ea753f92ee8c68308dbc0d68448.jpg",
  },
  {
    year: "2026",
    heading: "Powering 10,000+ Businesses",
    description: [
      "Today our network carries millions of conversations a month for businesses of every size, from single-agent startups to enterprise contact centers running thousands of seats.",
      "The office is a lot bigger than that first rented room, but the question we started with hasn't changed: does this make a conversation easier to have, or harder? Everything we ship still has to answer that first.",
    ],
    image: "https://i.pinimg.com/1200x/7d/06/d3/7d06d38efaaa3c9c78a815d39adf71e9.jpg",
  },
];

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const active = VALUE_TABS[activeTab];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Animated telecom network-map background */}
      <NetworkBackground />
      {/* Light frosted wash so content reads clearly over the pattern */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(246,248,251,0.90) 0%, rgba(246,248,251,0.96) 100%)",
        }}
      />

      <div className="relative z-10">
        {/* ---------- Hero ---------- */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div className="max-w-md mx-auto md:mx-0 grid grid-cols-2 gap-4">
              {ABOUT_TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <div
                    key={tab.heading}
                    className="rounded-2xl p-5 flex flex-col gap-3 border transition-transform hover:-translate-y-0.5"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.7)",
                      borderColor: "rgba(16,26,48,0.08)",
                    }}
                  >
                    <span
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#101a30" }}
                    >
                      <Icon size={20} style={{ color: "#22d3ee" }} />
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {tab.heading}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {tab.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div>
              <p
                className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
                style={{ color: "#0891b2" }}
              >
                About Us
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                We're Building The Voice Behind Every Business
              </h1>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-4 max-w-lg">
                We're a telecommunications company built for businesses that
                can't afford a dropped connection. From the first dial tone
                to the millionth call, we've stayed focused on making every
                conversation feel effortless, wherever it happens.
              </p>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                Today that means carrier-grade voice infrastructure, AI-driven
                automation, and a support team that actually picks up —
                serving businesses from five-person startups to enterprise
                contact centers running thousands of agents.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button
                  className="px-7 py-3 rounded-full text-white text-sm font-semibold transition-transform hover:scale-[1.03]"
                  style={{ backgroundColor: "#101a30" }}
                >
                  Our Story
                </button>
                <button
                  className="px-7 py-3 rounded-full text-sm font-semibold border transition-colors hover:bg-slate-50"
                  style={{ borderColor: "#101a30", color: "#101a30" }}
                >
                  Meet The Team
                </button>
              </div>

              <div className="flex flex-col gap-2.5">
                {HERO_HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-2.5">
                      <Icon size={15} style={{ color: "#0891b2" }} />
                      <span className="text-slate-600 text-sm">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Stats band ---------- */}
        <div className="relative w-full overflow-hidden" style={{ backgroundColor: "#101a30" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
            <p className="text-slate-400 text-xs uppercase tracking-[0.25em] font-semibold mb-6">
              The Numbers So Far
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`${i !== 0 ? "md:pl-8 md:border-l md:border-white/10" : ""}`}
                >
                  <div className="text-white text-2xl md:text-3xl font-bold leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-xs md:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Values tabs ---------- */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
              style={{ color: "#0891b2" }}
            >
              What Drives Us
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Mission, Vision, Approach & People
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Four things shape every decision we make — what we're trying to
              build, the world we're building it for, how we ship it, and who
              actually stands behind it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10">
            {/* Tab list */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
              {VALUE_TABS.map((tab, i) => {
                const Icon = tab.icon;
                const isActive = i === activeTab;
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-3 text-left px-5 py-4 rounded-xl border transition-all duration-200 flex-shrink-0 ${
                      isActive
                        ? "border-transparent"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    style={{ backgroundColor: isActive ? "#101a30" : "rgba(255,255,255,0.7)" }}
                  >
                    <Icon
                      size={18}
                      style={{ color: isActive ? "#22d3ee" : "#94a3b8" }}
                    />
                    <span
                      className="text-sm font-medium whitespace-nowrap"
                      style={{ color: isActive ? "#ffffff" : "#475569" }}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-100">
              <div className="rounded-2xl overflow-hidden order-2 sm:order-1">
                <img
                  src={active.image}
                  alt={active.heading}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="order-1 sm:order-2">
                <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug">
                  {active.heading}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {active.description}
                </p>
                <div className="flex flex-col gap-2.5">
                  {active.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5">
                      <Check size={14} style={{ color: "#0891b2" }} className="mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Alternating journey timeline ---------- */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
              style={{ color: "#0891b2" }}
            >
              Our Journey
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              From One Office To A Global Network
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Eight years, eight milestones, and a lot of calls in between —
              here's how we got from a single rented room to a platform
              carrying millions of conversations a month.
            </p>
          </div>

          <div className="flex flex-col gap-20">
            {JOURNEY.map((step, i) => {
              const reversed = i % 2 === 1;
              return (
                <div
                  key={step.heading}
                  className={`flex flex-col ${
                    reversed ? "md:flex-row-reverse" : "md:flex-row"
                  } items-center gap-10 md:gap-14`}
                >
                  <div className="w-full md:w-1/2">
                    <div className=" overflow-hidden ">
                      <img
                        src={step.image}
                        alt={step.heading}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <span
                      className="text-4xl font-bold block mb-3"
                      style={{ color: "#0891b2" }}
                    >
                      {step.year}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                      {step.heading}
                    </h3>
                    {step.description.map((para, pi) => (
                      <p
                        key={pi}
                        className="text-slate-500 text-sm leading-relaxed max-w-md mb-3 last:mb-0"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------- Advertisement panel ---------- */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            {/* Left: supporting content */}
            <div className="flex flex-col justify-center">
              <p
                className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
                style={{ color: "#0891b2" }}
              >
                Join Us
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug mb-4">
                We're Just Getting Started
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-4 max-w-md">
                We're always looking for people and businesses who believe
                great communication should be effortless. Whether you're
                hiring your first support agent or scaling to a thousand,
                we'd love to be part of that call.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-md">
                No sales scripts, no seat minimums to get started — just a
                platform that's ready when your team is, and a support line
                with a real person on the other end.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                    >
                      <img
                        src={`https://picsum.photos/seed/voip-team-avatar-${i}/64/64`}
                        alt="Team member"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />
                  ))}
                  <span className="text-xs text-slate-500 ml-1">
                    Loved by 10,000+ businesses
                  </span>
                </div>
              </div>
            </div>

            {/* Right: advertisement panel */}
            <div
              className="relative overflow-hidden rounded-3xl p-9 md:p-10 flex flex-col justify-between"
              style={{ background: "linear-gradient(160deg, #101a30 0%, #0b3a4a 100%)" }}
            >
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                style={{ backgroundColor: "rgba(34,211,238,0.15)", filter: "blur(40px)" }}
              />
              <PhoneCall
                size={140}
                className="absolute -bottom-8 -right-8 opacity-[0.06] pointer-events-none"
                color="#ffffff"
              />

              <div className="relative">
                <h3 className="text-white text-2xl font-bold leading-snug mb-4">
                  See The Platform In Action
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  Book a live walkthrough with our team and see how your
                  business could run on a single connected platform — no
                  slide deck, just the real product.
                </p>

                <div className="flex flex-col gap-3 mb-9">
                  {[
                    "30-minute guided walkthrough",
                    "Tailored to your call volume",
                    "No commitment required",
                    "Live Q&A with an engineer",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check size={15} style={{ color: "#22d3ee" }} className="mt-0.5 flex-shrink-0" />
                      <span className="text-slate-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="relative inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-white text-slate-900 text-sm font-semibold transition-transform hover:scale-[1.02]">
                Book A Demo
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}