import React from "react";
import { PhoneCall, Check, ArrowRight, Zap } from "lucide-react";

export default function VoipContentWithAd() {
  return (
    <div className="w-full bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-0 items-stretch relative">
          {/* Left: image (top) + content (bottom) */}
          <div className="flex flex-col gap-6 md:pr-10">
            <div className="rounded-2xl overflow-hidden flex-1 min-h-[260px]">
              <img
                src="https://i.pinimg.com/1200x/f2/9e/4a/f29e4a3ee0caf4882f054155ac7ac2da.jpg"
                alt="Team using VoIP calling platform"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <p
                className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
                style={{ color: "#0891b2" }}
              >
                Business Calling
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug mb-4">
                One Platform for Every Business Call
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                Replace scattered phone lines with a single VoIP platform
                that routes calls, tracks performance, and keeps your team
                reachable from anywhere — on any device, in any country.
              </p>
            </div>
          </div>

          {/* Connector: signal dots between columns (desktop only) */}
          <div className="hidden md:flex absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex-col items-center justify-center gap-2 z-10">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="rounded-full"
                style={{
                  width: i === 2 ? 8 : 4,
                  height: i === 2 ? 8 : 4,
                  backgroundColor: i === 2 ? "#22d3ee" : "#cbd5e1",
                }}
              />
            ))}
          </div>

          {/* Right: advertisement panel */}
          <div
            className="relative overflow-hidden rounded-3xl p-9 md:p-10 flex flex-col justify-between mt-10 md:mt-0 md:ml-10"
            style={{
              background: "linear-gradient(160deg, #101a30 0%, #0b3a4a 100%)",
            }}
          >
            {/* Decorative glow */}
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 mb-6">
                <Zap size={12} style={{ color: "#22d3ee" }} />
                <span className="text-[11px] font-semibold tracking-wide text-white">
                  Limited Time Offer
                </span>
              </div>

              <h3 className="text-white text-2xl md:text-[1.7rem] font-bold leading-snug mb-4">
                30 Days of Crystal-Clear Calling — On Us
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Try the full VoIP platform free. No hardware, no contracts,
                no risk — cancel anytime before day 30.
              </p>

              <div className="flex flex-col gap-3 mb-9">
                {[
                  "Unlimited calling across 120+ countries",
                  "AI call routing set up in minutes",
                  "Live support from day one",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <Check size={15} style={{ color: "#22d3ee" }} className="mt-0.5 flex-shrink-0" />
                    <span className="text-slate-200 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="relative inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-white text-slate-900 text-sm font-semibold transition-transform hover:scale-[1.02]">
              Claim Your Free Trial
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}