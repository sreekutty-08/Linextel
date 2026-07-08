import React from "react";
import Homeservices from "../../Assets/Images/building-rocket-concept_52683-8282.jpg";
import {
  Star,
  Globe,
  PhoneCall,
  Building2,
  ArrowLeftRight,
  ShieldCheck,
  Disc3,
} from "lucide-react";

const SERVICES = [
  {
    icon: Globe,
    heading: "International Calling",
    description: "Reach any country with clear, low-latency connections.",
  },
  {
    icon: PhoneCall,
    heading: "Domestic Calling",
    description: "Unlimited local calling built for everyday business use.",
  },
  {
    icon: Building2,
    heading: "Office Phone Setup",
    description: "Full desk and softphone setup for your entire team.",
  },
  {
    icon: ArrowLeftRight,
    heading: "Number Porting",
    description: "Keep your existing numbers, switched over seamlessly.",
  },
  {
    icon: ShieldCheck,
    heading: "Secure Data Storage",
    description: "Encrypted storage for call logs and customer records.",
  },
  {
    icon: Disc3,
    heading: "Call Recording",
    description: "Automatic recording and transcripts for every call.",
  },
];

export default function TelecomServiceIntro() {
  return (
    <div className="w-full bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Left: image with rating badge */}
          <div className="relative max-w-md mx-auto md:mx-0">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={Homeservices}
                alt="Telecom support specialist"
                className="w-full h-[580px] md:h-[580px] object-cover"
              />
            </div>

            {/* Rating badge */}
            <div className="absolute top-6 left-0 md:-left-6 bg-white rounded-xl shadow-xl px-5 py-4 flex items-center gap-3">
              <span className="text-3xl font-bold text-slate-900">4.9</span>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="text-[11px] font-semibold text-slate-700 leading-tight">
                  From Google
                  <br />
                  Business
                </p>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug mb-4">
              Professional VoIP Service Ready For Your Business
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-10 max-w-lg">
              From the first dial tone to enterprise-scale calling, we
              provide the infrastructure and support your business needs to
              stay connected — reliable, secure, and ready to grow with
              you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.heading}>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: "#fef3e7" }}
                    >
                      <Icon size={18} style={{ color: "#ea580c" }} />
                    </div>
                    <h4 className="text-slate-900 text-sm font-semibold mb-1.5">
                      {service.heading}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed max-w-[13rem]">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}