import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  HardHat,
  Globe2,
  Building2,
  Users,
  Droplet,
  ClipboardList,
  
  PhoneCall,
  Wifi,
  Signal,
} from "lucide-react";

// DATA
const stats = [
  { icon: HardHat, value: "18+", label: "YEARS OF EXCELLENCE" },
  { icon: Globe2, value: "32+", label: "COUNTRIES SERVED" },
  { icon: Building2, value: "250+", label: "MAJOR PROJECTS DELIVERED" },
  { icon: Users, value: "98%", label: "CLIENT SATISFACTION" },
];



const services = [
  {
    icon: Building2,
    title: "BRIDGE ENGINEERING",
    desc: "Design & construction of long-span and signature bridges.",
  },
  {
    icon: ArrowRight,
    title: "TRANSPORTATION INFRASTRUCTURE",
    desc: "Highways, expressways, tunnels, and urban mobility solutions.",
  },
  {
    icon: Building2,
    title: "STRUCTURAL ENGINEERING",
    desc: "Safe, efficient, and innovative structural design services.",
  },
  {
    icon: Droplet,
    title: "WATER & ENVIRONMENT",
    desc: "Sustainable water systems, dams, and environmental works.",
  },
  {
    icon: ClipboardList,
    title: "PROJECT MANAGEMENT",
    desc: "End-to-end project planning, execution, and monitoring.",
  },
  {
    icon: Users,
    title: "CONSULTING & PLANNING",
    desc: "Feasibility studies, surveying, and technical advisory.",
  },
];

// Fixed-height set for the waveform bars so the animation reads as a real voice trace
const waveformHeights = [35, 60, 45, 80, 55, 90, 40, 70, 50, 85, 60, 30, 75, 45, 65, 40, 55, 80, 35, 60];

export default function NexusEngineersHero() {
  

  // Live call timer for the VoIP widget
  const [seconds, setSeconds] = useState(742);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="w-full min-h-screen bg-[#0b1220] font-sans">
      

      {/* HERO */}
      <div
        className="relative w-full min-h-screen flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1920&auto=format&fit=crop')",
        }}
      >
        {/* shadow gradient overlays above the background image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220] via-[#0b1220]/70 to-[#0b1220]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-[#0b1220]/40" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 w-full flex flex-col lg:flex-row items-center gap-10 relative z-10 ml-[60px]">
          <div className="max-w-xl lg:-ml-10">
            <p className="text-teal-400 text-xs md:text-sm font-default tracking-widest mb-4">
              BUILDING CONNECTIONS.{" "}
              <span className="text-white font-default">
                ENGINEERING TOMORROW.
              </span>
            </p>

            <h1 className="text-4xl md:text-5xl font-default text-white leading-tight mb-6">
              Engineering
              <br />
              <span className="text-teal-400">Stronger</span> Futures
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 max-w-md">
              NexusEngineers is a global civil engineering firm delivering
              iconic infrastructure with precision, innovation, and
              integrity. We build more than structures — we build lasting
              impact.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 bg-teal-400 hover:bg-teal-300 transition-colors text-slate-900 font-bold text-sm px-6 py-3.5 rounded-sm">
                OUR SERVICES
                <ArrowRight size={16} strokeWidth={3} />
              </button>

              <button className="flex items-center gap-2 border border-white/40 hover:border-white transition-colors text-white font-semibold text-sm px-6 py-3.5 rounded-sm">
                <Play size={16} fill="white" />
                WATCH OUR STORY
              </button>
            </div>
          </div>

          {/* VoIP Live Call Widget (replaces the tab panel) */}
          <div className="w-full ml-[380px] lg:w-[400px] bg-[#0f1b30]/80 p-6 rounded-md border border-white/10 backdrop-blur-sm relative overflow-hidden">
            <style>{`
              @keyframes voipWave {
                0%, 100% { transform: scaleY(0.35); }
                50% { transform: scaleY(1); }
              }
              @keyframes voipRipple {
                0% { transform: scale(1); opacity: 0.55; }
                100% { transform: scale(1.9); opacity: 0; }
              }
              @keyframes voipPulseDot {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.25; }
              }
            `}</style>

            {/* status row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
                    style={{ animation: "voipPulseDot 1.5s ease-in-out infinite" }}
                  />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-emerald-400 text-[10px] font-bold tracking-widest">
                  LIVE CALL
                </span>
              </div>
              <span className="text-slate-400 text-[11px] font-mono tracking-wider">
                {mm}:{ss}
              </span>
            </div>

            {/* caller row with ripple avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex items-center justify-center w-16 h-16 shrink-0">
                <span
                  className="absolute inline-flex h-full w-full rounded-full border border-teal-400/40"
                  style={{ animation: "voipRipple 2.2s ease-out infinite" }}
                />
                <span
                  className="absolute inline-flex h-full w-full rounded-full border border-teal-400/40"
                  style={{ animation: "voipRipple 2.2s ease-out infinite 0.7s" }}
                />
                <div className="relative w-12 h-12 rounded-full bg-teal-400 flex items-center justify-center">
                  <PhoneCall className="text-slate-900" size={20} />
                </div>
              </div>
              <div>
                <div className="text-white text-sm font-bold leading-tight">
                  Site Office — Doha
                </div>
                <div className="text-slate-400 text-xs mt-0.5">
                  VoIP · HD Voice · Encrypted
                </div>
              </div>
            </div>

            {/* animated waveform */}
            <div className="flex items-end justify-center gap-1 h-12 mb-6 bg-[#111d33] rounded p-3 border border-white/5">
              {waveformHeights.map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-teal-400 rounded-full origin-bottom"
                  style={{
                    height: `${h}%`,
                    animation: `voipWave ${0.6 + (i % 5) * 0.1}s ease-in-out infinite`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>

            {/* connection stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#111d33] rounded p-3 flex flex-col items-center gap-1 border border-white/5">
                <Wifi className="text-teal-400" size={18} />
                <span className="text-white text-xs font-bold">28ms</span>
                <span className="text-slate-500 text-[9px] font-semibold tracking-wide">
                  LATENCY
                </span>
              </div>
              <div className="bg-[#111d33] rounded p-3 flex flex-col items-center gap-1 border border-white/5">
                <Globe2 className="text-teal-400" size={18} />
                <span className="text-white text-xs font-bold">32</span>
                <span className="text-slate-500 text-[9px] font-semibold tracking-wide">
                  SITES LINKED
                </span>
              </div>
              <div className="bg-[#111d33] rounded p-3 flex flex-col items-center gap-1 border border-white/5">
                <Signal className="text-teal-400" size={18} />
                <span className="text-white text-xs font-bold">99.98%</span>
                <span className="text-slate-500 text-[9px] font-semibold tracking-wide">
                  UPTIME
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="max-w-8xl mx-auto px-6 md:px-10 -mt-16 relative z-20">
        <div className="bg-[#0f1b30] border-t border-white/5 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-white/10 shadow-2xl">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 md:px-8 py-5"
            >
              <s.icon
                className="text-teal-400 shrink-0"
                size={30}
                strokeWidth={1.75}
              />

              <div>
                <div className="text-white text-2xl font-extrabold leading-none">
                  {s.value}
                </div>

                <div className="text-slate-400 text-[11px] font-semibold tracking-wide mt-1">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          <div>
            <p className="text-teal-400 text-xs font-bold tracking-widest mb-3">
              OUR SERVICES
            </p>

            <h2 className="text-white text-3xl font-extrabold leading-snug mb-4">
              End-to-End Civil
              <br />
              Engineering Solutions
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              From concept to completion, we deliver intelligent,
              sustainable, and cost-effective engineering solutions.
            </p>

            <button className="flex items-center gap-2 bg-teal-400 hover:bg-teal-300 transition-colors text-slate-900 font-bold text-xs px-5 py-3 rounded-sm">
              VIEW ALL SERVICES
              <ArrowRight size={14} strokeWidth={3} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-[#111d33] hover:bg-[#162542] transition-colors rounded-md p-5 flex flex-col gap-4"
              >
                <s.icon
                  className="text-teal-400"
                  size={28}
                  strokeWidth={1.75}
                />

                <div>
                  <h3 className="text-white text-xs font-extrabold tracking-wide mb-2">
                    {s.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}