import React from "react";
import {
  Award,
  Network,
  Volume2,
  Zap,
  Sliders,
  CloudCog,
  Tag,
  Users,
  LifeBuoy,
  TrendingUp,
  Headset,
  PhoneCall,
  HeartPulse,
  Landmark,
  ShieldCheck,
  Building2,
  Plane,
  ShoppingCart,
  Code2,
  GraduationCap,
} from "lucide-react";

const HERO_FEATURES = [
  {
    icon: LifeBuoy,
    heading: "24×7 Technical Support",
    description:
      "Our technical team is available around the clock to keep your communication systems running smoothly.",
  },
  {
    icon: TrendingUp,
    heading: "Scalable Infrastructure",
    description:
      "Our infrastructure grows with your business, so you're always ready for the next stage of growth.",
  },
];

const ICON_GRID = [
  { icon: PhoneCall, color: "#0891b2" },
  { icon: Headset, color: "#16a34a" },
  { icon: CloudCog, color: "#2563eb" },
  { icon: ShieldCheck, color: "#059669" },
  { icon: Network, color: "#0ea5e9" },
  { icon: Users, color: "#7c3aed" },
  { icon: Volume2, color: "#dc2626" },
  { icon: Award, color: "#ca8a04" },
  { icon: Zap, color: "#0d9488" },
];

const FEATURES = [
  {
    icon: Award,
    heading: "Industry Expertise",
    description:
      "Years of hands-on experience helping businesses build communication systems that actually work.",
  },
  {
    icon: Network,
    heading: "Reliable Network Infrastructure",
    description:
      "A resilient, carrier-grade network backbone that keeps you connected without interruption.",
  },
  {
    icon: Volume2,
    heading: "High Voice Quality",
    description:
      "Crystal-clear calls powered by optimized routing and quality-first network design.",
  },
  {
    icon: Zap,
    heading: "Fast Deployment",
    description:
      "Get up and running quickly with streamlined onboarding and setup processes.",
  },
  {
    icon: Sliders,
    heading: "Customized Solutions",
    description:
      "Communication solutions tailored to fit the exact needs of your business.",
  },
  {
    icon: CloudCog,
    heading: "Secure Cloud Environment",
    description:
      "Your data and calls are protected in a secure, compliant cloud environment.",
  },
  {
    icon: Tag,
    heading: "Competitive Pricing",
    description:
      "Transparent, competitive pricing designed to deliver strong value at every scale.",
  },
  {
    icon: Users,
    heading: "Experienced Technical Team",
    description:
      "A skilled technical team dedicated to supporting your systems and your success.",
  },
];

const INDUSTRIES = [
  {
    icon: Headset,
    heading: "BPO & Call Centers",
    description:
      "Communication tools built for high-volume, customer-facing call center operations.",
  },
  {
    icon: PhoneCall,
    heading: "Telecom Providers",
    description:
      "Robust voice infrastructure that helps telecom providers scale with confidence.",
  },
  {
    icon: HeartPulse,
    heading: "Healthcare",
    description:
      "Secure, reliable communication solutions built for healthcare providers.",
  },
  {
    icon: Landmark,
    heading: "Banking & Financial Services",
    description:
      "Compliant, secure communication systems for banking and financial institutions.",
  },
  {
    icon: ShieldCheck,
    heading: "Insurance",
    description:
      "Dependable voice solutions that keep insurance teams connected with clients.",
  },
  {
    icon: Building2,
    heading: "Real Estate",
    description:
      "Communication tools that help real estate teams stay responsive to clients.",
  },
  {
    icon: Plane,
    heading: "Travel & Hospitality",
    description:
      "Reliable voice solutions for travel and hospitality businesses worldwide.",
  },
  {
    icon: ShoppingCart,
    heading: "E-Commerce",
    description:
      "Scalable communication infrastructure to support growing e-commerce businesses.",
  },
  {
    icon: Code2,
    heading: "IT & Software Companies",
    description:
      "Flexible communication solutions built for fast-moving IT and software teams.",
  },
  {
    icon: GraduationCap,
    heading: "Education",
    description:
      "Communication solutions that support schools and educational institutions.",
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
                Why Businesses Trust Us
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#33422f" }}>
                We understand that communication is critical to business
                success. Our solutions are built to deliver reliability,
                scalability, and long-term performance.
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

        {/* Why Choose Our Services */}
        <div className="pt-10">
          <h3 className="text-white text-lg md:text-xl font-bold mb-8">
            Why Choose Our Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
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

        {/* Industries We Serve */}
        <div className="pt-16">
          <h3 className="text-white text-lg md:text-xl font-bold mb-2">
            Industries We Serve
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed mb-8 max-w-xl">
            We provide communication solutions for businesses across multiple
            industries.
          </p>
          <div className="flex flex-wrap gap-4">
            {INDUSTRIES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.heading}
                  className="flex items-center gap-2.5 rounded-full pl-2.5 pr-5 py-2.5"
                  style={{ backgroundColor: "#132030" }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#0b1220" }}
                  >
                    <Icon size={14} style={{ color: "#4ade80" }} />
                  </div>
                  <span className="text-white text-xs font-medium whitespace-nowrap">
                    {feature.heading}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}