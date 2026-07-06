import React, { useState } from "react";
import {
  Bot,
  MessagesSquare,
  Link2,
  BarChart3,
  ShieldCheck,
  TrendingUp,
  Tag,
  Rocket,
  Headset,
  X,
  ArrowRight,
  Check,
} from "lucide-react";

// Animated telecom "network map" background — pulsing nodes connected by
// flowing dashed lines, plus two soft drifting glow blobs. Matches the
// Contact page background exactly for a consistent site-wide feel.
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
    <div
      className="fixed inset-0 -z-20 overflow-hidden"
      style={{ backgroundColor: "#f6f8fb" }}
    >
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

const SERVICES = [
  {
    icon: Bot,
    image: "https://i.pinimg.com/1200x/f9/b9/e1/f9b9e10ba5260a6aa9fa6a341c366b27.jpg",
    heading: "AI Automation Capabilities",
    description: "Bots that qualify leads and route calls automatically.",
    longDescription:
      "Deploy intelligent voice bots and IVR flows that handle routine calls, qualify leads, and route conversations automatically — freeing your agents to focus on what actually needs a human.",
    features: [
      "Natural-language IVR flows",
      "Automated lead qualification",
      "Smart call routing rules",
    ],
  },
  {
    icon: MessagesSquare,
    image: "https://i.pinimg.com/736x/82/a8/57/82a8570401135007081e6843cc78a63f.jpg",
    heading: "Omnichannel Support",
    description: "Voice, chat, and SMS unified in a single thread.",
    longDescription:
      "Unify voice, SMS, WhatsApp, live chat, and email into a single thread, so every customer conversation carries its full history no matter which channel it started on.",
    features: [
      "One inbox for every channel",
      "Shared conversation history",
      "Seamless channel handoff",
    ],
  },
  {
    icon: Link2,
    image: "https://i.pinimg.com/736x/5d/df/46/5ddf463a15359ec30e50c1f8eba82d9e.jpg",
    heading: "CRM Integrations",
    description: "Synced in real time with the tools you already use.",
    longDescription:
      "Sync call logs, contact records, and dispositions in real time with Salesforce, HubSpot, Zoho, and more — no manual data entry, no lost context between systems.",
    features: [
      "Real-time two-way sync",
      "Automatic call logging",
      "Works with major CRMs",
    ],
  },
  {
    icon: BarChart3,
    image: "https://i.pinimg.com/736x/1a/18/cc/1a18ccc840020e086cd151dbf8076ffe.jpg",
    heading: "Call Analytics",
    description: "Live dashboards on every conversation and agent.",
    longDescription:
      "Track talk time, sentiment, drop-off rates, and agent performance with live dashboards and post-call reports that turn raw call data into decisions.",
    features: [
      "Real-time performance dashboards",
      "Sentiment and quality scoring",
      "Exportable custom reports",
    ],
  },
  {
    icon: ShieldCheck,
    image: "https://i.pinimg.com/736x/38/4c/6d/384c6da4e5c3d6bdfcd64f9184485034.jpg",
    heading: "Security & Compliance",
    description: "Encrypted calls, always compliant by default.",
    longDescription:
      "End-to-end encrypted calls, role-based access controls, and built-in compliance with GDPR, HIPAA, and PCI-DSS keep every conversation and record protected.",
    features: [
      "End-to-end call encryption",
      "Role-based access controls",
      "GDPR, HIPAA & PCI-DSS ready",
    ],
  },
  {
    icon: TrendingUp,
    image: "https://i.pinimg.com/736x/64/47/60/6447606c5e6465b2db6193ef6f39f176.jpg",
    heading: "Scalability",
    description: "Infrastructure that grows with your call volume.",
    longDescription:
      "Add ten lines or ten thousand without re-architecting anything. Elastic infrastructure scales with call volume during peak hours and seasonal spikes alike.",
    features: [
      "Elastic, on-demand capacity",
      "No re-platforming required",
      "Built for seasonal spikes",
    ],
  },
  {
    icon: Tag,
    image: "https://i.pinimg.com/1200x/5b/73/dd/5b73ddb96e81d2afd90ec43cc89182f8.jpg",
    heading: "Pricing Model",
    description: "Transparent, usage-based, no hidden charges.",
    longDescription:
      "Transparent, usage-based plans with no hidden per-minute surcharges. Pay for the lines and minutes you use, and scale spend up or down as your team changes.",
    features: [
      "Simple usage-based billing",
      "No hidden per-minute fees",
      "Scale spend up or down anytime",
    ],
  },
  {
    icon: Rocket,
    image: "https://i.pinimg.com/736x/7b/bb/e3/7bbbe32aaa8e0d388b0d03b0e0f19ae0.jpg",
    heading: "Ease of Deployment",
    description: "A full contact center running in hours.",
    longDescription:
      "Get a full contact center running in hours, not months. Pre-built templates, drag-and-drop call flows, and guided onboarding remove the need for a dev team.",
    features: [
      "Pre-built call flow templates",
      "Drag-and-drop configuration",
      "Guided, no-code onboarding",
    ],
  },
  {
    icon: Headset,
    image: "https://i.pinimg.com/1200x/c5/8f/fe/c58ffe27a9a31db0859d7568f97f40a1.jpg",
    heading: "Customer Support",
    description: "24/7 live support backed by a real SLA.",
    longDescription:
      "24/7 live support from onboarding through scale, backed by a dedicated success manager and a response-time SLA you can actually hold us to.",
    features: [
      "24/7 live human support",
      "Dedicated success manager",
      "Guaranteed response-time SLA",
    ],
  },
];

export default function ServicesGridWithDrawer() {
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;
  const active = isOpen ? SERVICES[activeIndex] : null;

  return (
    <div className="relative w-full py-20 px-6 overflow-hidden">
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

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ color: "#0891b2" }}
          >
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Everything Your Call Operations Need
          </h2>
        </div>

        {/* Balanced 3x3 grid — 9 services, no orphan row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <button
                key={service.heading}
                onClick={() => setActiveIndex(i)}
                className="group text-left rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.heading}
                    className="w-full h-36 object-cover"
                  />
                  <div
                    className="absolute left-1/2 -translate-x-1/2 rounded-full flex items-center justify-center shadow-md"
                    style={{
                      bottom: -24,
                      width: 52,
                      height: 52,
                      backgroundColor: "#101a30",
                    }}
                  >
                    <Icon size={22} style={{ color: "#22d3ee" }} />
                  </div>
                </div>

                <div className="px-6 pt-9 pb-6">
                  <h3 className="text-slate-900 font-semibold text-base mb-2 group-hover:text-[#0891b2] transition-colors">
                    {service.heading}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold"
                    style={{ color: "#0891b2" }}
                  >
                    Learn more
                    <ArrowRight
                      size={13}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setActiveIndex(null)}
        className={`fixed inset-0 bg-slate-900/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Right-side drawer */}
      <div
        className={`fixed top-1/2 right-4 sm:right-8 -translate-y-1/2 h-[88vh] max-h-[760px] w-[92%] sm:w-[420px] bg-white z-50 rounded-2xl shadow-2xl transition-transform duration-300 ease-in-out overflow-hidden ${
          isOpen ? "translate-x-0" : "translate-x-[120%]"
        }`}
      >
        {active && (
          <div className="flex flex-col h-full">
            <div className="relative">
              <img
                src={active.image}
                alt={active.heading}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setActiveIndex(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-white transition-colors"
              >
                <X size={16} className="text-slate-700" />
              </button>
              <div
                className="absolute left-8 rounded-full flex items-center justify-center shadow-md"
                style={{
                  bottom: -24,
                  width: 52,
                  height: 52,
                  backgroundColor: "#101a30",
                }}
              >
                <active.icon size={22} style={{ color: "#22d3ee" }} />
              </div>
            </div>

            <div className="px-8 pt-8 pb-7 flex-1 flex flex-col">
              <h3 className="text-slate-900 text-xl font-bold mb-3 leading-snug">
                {active.heading}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {active.longDescription}
              </p>

              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                style={{ color: "#0891b2" }}
              >
                Highlights
              </p>
              <div className="flex flex-col gap-2.5 mb-auto">
                {active.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#e0f7fa" }}
                    >
                      <Check size={11} style={{ color: "#0891b2" }} />
                    </div>
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className="w-full py-3.5 rounded-full text-white text-sm font-semibold transition-transform hover:scale-[1.02] mt-7"
                style={{ backgroundColor: "#101a30" }}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}