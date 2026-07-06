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
  Globe,
} from "lucide-react";

const SERVICES = [
  {
    icon: Bot,
    heading: "AI Automation",
    description:
      "Deploy intelligent voice bots and IVR flows that qualify leads and route calls automatically, freeing agents for what needs a human.",
  },
  {
    icon: MessagesSquare,
    heading: "Omnichannel Support",
    description:
      "Unify voice, SMS, WhatsApp, live chat, and email into one thread so every conversation carries its full history.",
  },
  {
    icon: Link2,
    heading: "CRM Integrations",
    description:
      "Sync call logs, contacts, and dispositions in real time with Salesforce, HubSpot, Zoho, and more.",
  },
  {
    icon: BarChart3,
    heading: "Call Analytics",
    description:
      "Track talk time, sentiment, and agent performance with live dashboards and post-call reports.",
  },
  {
    icon: ShieldCheck,
    heading: "Security & Compliance",
    description:
      "End-to-end encrypted calls and role-based access, built-in compliant with GDPR, HIPAA, and PCI-DSS.",
  },
  {
    icon: TrendingUp,
    heading: "Scalability",
    description:
      "Add ten lines or ten thousand without re-architecting. Infrastructure scales with call volume automatically.",
  },
  {
    icon: Tag,
    heading: "Pricing Model",
    description:
      "Transparent, usage-based plans with no hidden per-minute surcharges. Scale spend up or down as you grow.",
  },
  {
    icon: Rocket,
    heading: "Ease of Deployment",
    description:
      "Get a full contact center running in hours with pre-built templates and drag-and-drop call flows.",
  },
  {
    icon: Headset,
    heading: "Customer Support",
    description:
      "24/7 live support from onboarding through scale, backed by a dedicated success manager and SLA.",
  },
  {
    icon: Globe,
    heading: "Global Coverage",
    description:
      "Local and toll-free numbers in over 100 countries with carrier-grade call quality everywhere.",
  },
];

export default function VoipServicesGrid() {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center p-6 md:p-16"
      style={{ backgroundColor: "#101a30" }}
    >
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="text-cyan-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Our Services
          </p>
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight tracking-tight">
            Unmatched Calling.
            <br />
            Unmatched Reliability.
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hovered === index;
            return (
              <div
                key={service.heading}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={`relative p-6 flex flex-col gap-4 transition-colors duration-300 ${
                  isHovered ? "bg-white/[0.06]" : "bg-transparent"
                }`}
                style={{ backgroundColor: isHovered ? undefined : "#101a30" }}
              >
                <span
                  className={`absolute top-0 left-0 h-0.5 w-full transition-colors duration-300 ${
                    isHovered ? "bg-cyan-400" : "bg-transparent"
                  }`}
                />
                <Icon
                  size={30}
                  strokeWidth={1.5}
                  className={`transition-colors duration-300 ${
                    isHovered ? "text-cyan-400" : "text-slate-400"
                  }`}
                />
                <div>
                  <h3 className="text-white text-xs font-bold tracking-[0.1em] uppercase mb-2">
                    {service.heading}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}