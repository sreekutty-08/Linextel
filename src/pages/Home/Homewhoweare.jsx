import React from "react";
import { BarChart3, Users, Trophy, Globe2 } from "lucide-react";



const STATS = [
  { icon: BarChart3, value: "10M+", label: "Calls Connected Monthly" },
  { icon: Users, value: "200+", label: "Support Specialists" },
  { icon: Trophy, value: "18", label: "Industry Awards" },
  { icon: Globe2, value: "120+", label: "Countries Served" },
];

export default function WhoWeAre() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 items-center">
          {/* Left: Image collage */}
          <div className="relative max-w-md mx-auto md:mx-0">
            {/* Decorative outline frame */}
            <div className="absolute -top-5 -left-5 w-40 h-40 border-2 border-slate-200 rounded-lg hidden " />

            {/* Bottom / larger image */}
            <div className="relative rounded-xl overflow-hidden  mt-16 ml-10">
              <img
                src="https://i.pinimg.com/1200x/a9/bb/b5/a9bbb559ef04cfe934b0049c2b9ac09c.jpg"
                alt="Support team collaborating"
                className="w-[550px] h-[540px] object-cover"
              />
            </div>

            {/* Top-right smaller image */}
           

            {/* Quote overlay box */}
           
          </div>

          {/* Right: Content */}
          <div>
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
              style={{ color: "#0891b2" }}
            >
              Who We Are
            </p>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Who We Are
            </h2>

            <p className="text-slate-500 text-base leading-relaxed mb-5 max-w-xl">
              We are a telecommunications company built for businesses that
              can't afford a dropped connection. What started as a small
              team routing calls out of a single office has grown into a
              full voice and messaging infrastructure trusted by thousands
              of businesses across the globe.
            </p>

            <p className="text-slate-500 text-base leading-relaxed mb-5 max-w-xl">
              Today, our network carries millions of conversations every
              month — spanning cloud calling, AI-powered automation,
              omnichannel messaging, and carrier-grade security. But
              underneath the technology, our purpose hasn't changed: making
              sure every call finds the person on the other end, clearly
              and reliably, every single time.
            </p>

            <p className="text-slate-500 text-base leading-relaxed max-w-xl">
              We work with the belief that great communication
              infrastructure should be invisible — it should simply work,
              so businesses can focus on the conversations that matter
              instead of the technology behind them. That belief drives
              every line of code we ship and every call we help complete.
            </p>
         

           
          </div>
        </div>
      </div>

      {/* Stats band */}
      <div
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#101a30" }}
      >
        {/* Subtle skyline decoration */}
        <svg
          className="absolute bottom-0 left-0 w-full h-full opacity-[0.06]"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          fill="#ffffff"
        >
          <rect x="20" y="90" width="50" height="110" />
          <rect x="90" y="60" width="35" height="140" />
          <rect x="140" y="110" width="45" height="90" />
          <rect x="210" y="40" width="30" height="160" />
          <rect x="260" y="80" width="55" height="120" />
          <rect x="340" y="100" width="40" height="100" />
          <rect x="400" y="55" width="35" height="145" />
          <rect x="460" y="120" width="50" height="80" />
          <rect x="900" y="70" width="40" height="130" />
          <rect x="960" y="100" width="55" height="100" />
          <rect x="1030" y="50" width="30" height="150" />
          <rect x="1080" y="90" width="45" height="110" />
          <rect x="1140" y="65" width="35" height="135" />
        </svg>

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`flex items-start gap-3 ${
                    i !== 0 ? "md:pl-8 md:border-l md:border-white/10" : ""
                  }`}
                >
                  <Icon size={26} style={{ color: "#facc15" }} className="mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white text-2xl md:text-3xl font-bold leading-none mb-1">
                      {stat.value}
                    </div>
                    <div className="text-slate-400 text-xs md:text-sm">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}