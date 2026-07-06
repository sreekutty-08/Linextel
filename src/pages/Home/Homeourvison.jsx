import React from "react";
import { ArrowRight } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-20">
        {/* Top row: heading + intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start mb-12">
          <div>
            <p
              className="text-sm font-semibold mb-4"
              style={{ color: "#0891b2" }}
            >
              About Us
            </p>
            <h2 className="text-3xl md:text-[2.5rem] font-bold text-slate-900 leading-tight mb-8">
              Power Every Conversation, Effortlessly
            </h2>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: "#101a30" }}
            >
              Get Started
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="md:pt-14">
            <p className="text-slate-500 text-base leading-relaxed">
              Keep your business connected with reliable voice
              infrastructure that scales as you grow. From the first ring
              to the final report, we handle the technology so you can
              focus on the conversation — no dropped calls, no
              compromises, no complexity.
            </p>
          </div>
        </div>

        {/* Bottom row: image + mission/vision cards */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6">
          {/* Our Story image */}
          <div className="relative rounded-2xl overflow-hidden min-h-[420px]">
            <img
              src="https://i.pinimg.com/736x/e2/33/b0/e233b0258caed1f01cc820ff3fb9751e.jpg"
              alt="VoIP support team collaborating"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(16,26,48,0) 35%, rgba(16,26,48,0.85) 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 p-8 max-w-md">
              <h3 className="text-white text-xl font-semibold mb-3">
                Our Story
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                CallNova, a leading VoIP provider, is reshaping business
                communication with AI-driven automation, carrier-grade
                reliability, and connectivity built for teams worldwide.
              </p>
            </div>
          </div>

          {/* Mission + Vision cards */}
          <div className="flex flex-col gap-6">
            <div
              className="rounded-2xl p-8 flex-1 flex flex-col justify-center"
              style={{ backgroundColor: "#e0f7fa" }}
            >
              <h3 className="text-slate-900 text-lg font-semibold mb-3">
                Our Mission
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To deliver voice and messaging infrastructure that keeps
                every business reachable, reliable, and effortlessly
                connected.
              </p>
            </div>

            <div
              className="rounded-2xl p-8 flex-1 flex flex-col justify-center"
              style={{ backgroundColor: "#101a30" }}
            >
              <h3 className="text-white text-lg font-semibold mb-3">
                Our Vision
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                To lead the future of communication and shape a world where
                distance never disconnects a business from its customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}