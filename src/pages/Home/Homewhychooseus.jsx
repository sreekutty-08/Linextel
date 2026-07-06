import React from "react";
import {
  Workflow,
  Smartphone,
  PhoneCall,
  Headset,
  Cloud,
  ShieldCheck,
  Globe,
  MessageCircle,
  Mic,
  Radio,
  PhoneForwarded,
  BarChart3,
  MessagesSquare,
  Disc3,
} from "lucide-react";

const HERO_FEATURES = [
  {
    icon: Workflow,
    heading: "Seamless Integrations",
    description:
      "Connect with your CRM, helpdesk, or any platform using powerful APIs and webhooks.",
  },
  {
    icon: Smartphone,
    heading: "Web & Mobile Ready",
    description:
      "Utilize web and mobile SDKs to manage calls and reach customers anywhere.",
  },
];

const ICON_GRID = [
  { icon: PhoneCall, color: "#0891b2" },
  { icon: Headset, color: "#16a34a" },
  { icon: Cloud, color: "#2563eb" },
  { icon: ShieldCheck, color: "#059669" },
  { icon: Globe, color: "#0ea5e9" },
  { icon: MessageCircle, color: "#7c3aed" },
  { icon: Mic, color: "#dc2626" },
  { icon: Radio, color: "#ca8a04" },
  { icon: PhoneForwarded, color: "#0d9488" },
];

const FEATURES = [
  {
    icon: PhoneForwarded,
    heading: "Smart Call Routing",
    description:
      "Route calls in real time using skill, availability, or IVR conditions, cutting wait time and missed calls.",
  },
  {
    icon: BarChart3,
    heading: "Real-Time Analytics",
    description:
      "Access live dashboards on talk time, sentiment, and agent performance across every line.",
  },
  {
    icon: ShieldCheck,
    heading: "Secure SIP Trunking",
    description:
      "Encrypted, carrier-grade SIP trunks keep every call private and compliant, without sacrificing call quality.",
  },
  {
    icon: MessagesSquare,
    heading: "Omnichannel Messaging",
    description:
      "Unify voice, SMS, and chat into a single thread so agents never lose context mid-conversation.",
  },
  {
    icon: Disc3,
    heading: "Auto Call Recording",
    description:
      "Every call is recorded and transcribed automatically for training, QA, and dispute resolution.",
  },
  {
    icon: Globe,
    heading: "Global Number Provisioning",
    description:
      "Spin up local and toll-free numbers in over 100 countries in minutes, no carrier contracts required.",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="w-full py-20 px-6 md:px-10" style={{ backgroundColor: "#0b1220" }}>
      <div className="max-w-6xl mx-auto">
        <p
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
          style={{ color: "#4ade80" }}
        >
          Why Choose Us
        </p>

        {/* Hero card */}
        <div
          className="relative overflow-hidden rounded-3xl p-8 md:p-12 mb-4"
          style={{ backgroundColor: "#e7fbcf" }}
        >
          {/* Decorative dot grid background */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(11,18,32,0.15) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: headline + features */}
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold leading-snug mb-4"
                style={{ color: "#0b1220" }}
              >
                Reliable Voice Infrastructure Your Business Will Love
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#33422f" }}>
                From call routing to real-time analytics, confidently connect
                every channel and tool you use to run and scale your
                business.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {HERO_FEATURES.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.heading}>
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                        style={{ backgroundColor: "#ffffff" }}
                      >
                        <Icon size={16} style={{ color: "#0b1220" }} />
                      </div>
                      <h4
                        className="text-sm font-semibold mb-1.5"
                        style={{ color: "#0b1220" }}
                      >
                        {feature.heading}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: "#4b5a45" }}>
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: floating VoIP icon grid */}
            <div className="relative hidden md:grid grid-cols-3 gap-4 justify-items-end">
              {ICON_GRID.map((item, i) => {
                const Icon = item.icon;
                const rotate = i % 2 === 0 ? "-rotate-3" : "rotate-2";
                return (
                  <div
                    key={i}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${rotate}`}
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 pt-10">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.heading}>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#132030" }}
                >
                  <Icon size={16} style={{ color: "#4ade80" }} />
                </div>
                <h4 className="text-white text-sm font-semibold mb-2">
                  {feature.heading}
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}