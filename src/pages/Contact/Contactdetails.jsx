import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Package,
  Timer,
  HardHat,
  ArrowRight,
} from "lucide-react";

// Some lucide-react versions (and the npm registry build the user installed)
// don't ship brand/social icons like Facebook, Twitter, Instagram, or
// LinkedIn. Defining them locally avoids the "not exported" build error
// regardless of the installed lucide-react version.
const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.5-1.5H16.5V4.3c-.26-.03-1.16-.11-2.2-.11-2.18 0-3.67 1.33-3.67 3.77V10.5H8v3h2.63V21h2.87Z" />
  </svg>
);

const TwitterIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 6.4c-.63.28-1.3.47-2 .55.72-.43 1.27-1.12 1.53-1.94-.67.4-1.42.68-2.22.84A3.5 3.5 0 0 0 12.2 9c0 .27.03.54.09.79A9.93 9.93 0 0 1 5 6.6a3.5 3.5 0 0 0 1.08 4.67c-.57-.02-1.1-.18-1.57-.43v.04a3.5 3.5 0 0 0 2.8 3.43c-.52.14-1.08.16-1.6.06a3.5 3.5 0 0 0 3.27 2.43A7.03 7.03 0 0 1 3 18.2 9.9 9.9 0 0 0 8.36 19.8c6.44 0 9.96-5.34 9.96-9.96l-.01-.45A7.1 7.1 0 0 0 21 6.4Z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.7" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.2a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.98c0-1.43-.03-3.26-1.99-3.26-1.99 0-2.3 1.55-2.3 3.15V20H9.4V8.5h3.24v1.57h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V20Z" />
  </svg>
);

// Animated telecom "network map" background — pulsing nodes connected by
// flowing dashed lines, plus two soft drifting glow blobs. Colors are
// pulled straight from the existing brand palette (no stock photo).
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
const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 py-4">
    <span className="shrink-0 w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
      <Icon size={18} className="text-white" />
    </span>
    <div>
      <div className="text-[11px] font-bold tracking-widest uppercase text-white/60">
        {label}
      </div>
      <div className="text-sm text-white font-medium mt-0.5 leading-relaxed">
        {value}
      </div>
    </div>
  </div>
);

// Each field now carries a `name` attribute — EmailJS's sendForm reads
// values straight off each input's `name`, matching your EmailJS template
// variables (e.g. {{user_name}}, {{user_email}}, {{message}}...).
const FIELDS_ROW_1 = [
  { name: "user_name", label: "Your Name *", type: "text", placeholder: "Ex. John Doe" },
  { name: "user_email", label: "Email *", type: "email", placeholder: "example@gmail.com" },
];
const FIELDS_ROW_2 = [
  { name: "company_name", label: "Company Name", type: "text", placeholder: "Ex. Acme Corp" },
  { name: "contact_person", label: "Contact Person", type: "text", placeholder: "Ex. Jane Smith" },
];
const FIELDS_ROW_3 = [
  { name: "phone_number", label: "Phone Number", type: "tel", placeholder: "Ex. +0123-456-789" },
  { name: "subject", label: "Subject *", type: "text", placeholder: "Enter Subject" },
];

const SOCIALS = [
  { icon: FacebookIcon, bg: "#101a30" },
  { icon: TwitterIcon, bg: "#101a30" },
  { icon: InstagramIcon, bg: "#101a30" },
  { icon: LinkedinIcon, bg: "#101a30" },
];

const FEATURES = [
  {
    icon: Package,
    title: "Premium VoIP Solutions",
    desc: "Reliable SIP Trunks, Wholesale VoIP, and global voice connectivity with crystal-clear call quality.",
  },
  {
    icon: Timer,
    title: "Rapid Deployment",
    desc: "Get your SIP Trunks, DIDs, and cloud telephony services activated within hours.",
  },
  {
    icon: HardHat,
    title: "24/7 VoIP Experts",
    desc: "Experienced telecom engineers providing continuous monitoring, optimization, and technical support.",
  },
];

const Field = ({ name, label, type, placeholder, textarea }) => (
  <div className={textarea ? "flex-1 flex flex-col" : ""}>
    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
      {label}
    </label>
    {textarea ? (
      <textarea
        name={name}
        placeholder={placeholder}
        className="w-full p-3.5 bg-white border border-slate-200 rounded-lg outline-none flex-1 min-h-[120px] text-sm transition-shadow focus:ring-2"
        style={{ "--tw-ring-color": "#22d3ee" }}
      />
    ) : (
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full p-3.5 bg-white border border-slate-200 rounded-lg outline-none text-sm transition-shadow focus:ring-2"
        style={{ "--tw-ring-color": "#22d3ee" }}
      />
    )}
  </div>
);

const ContactUs = () => {
  // Ref attached to the <form> below — EmailJS's sendForm needs the actual
  // form DOM node to read all named fields from.
  const form = useRef(null);
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    if (!form.current) return;

    setSending(true);

    // Replace these three placeholders with your real EmailJS values:
    // Service ID, Template ID, and Public Key from your EmailJS dashboard.
    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, "YOUR_PUBLIC_KEY")
      .then(
        () => {
          setSending(false);
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          setSending(false);
          alert("Failed to send: " + error.text);
        }
      );
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
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

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col">
        <div className="flex-grow max-w-8xl mx-auto w-full px-6 md:px-10 py-16">
          <div className="mb-10">
            <p
              className="font-bold tracking-widest text-xs uppercase mb-3"
              style={{ color: "#0891b2" }}
            >
              Contact Us
            </p>
            <h2 className="text-3xl md:text-4xl font-default text-slate-900">
              Get Your{" "}
              <span className="default" style={{ color: "#0891b2" }}>
                Free Quote Today!
              </span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Form */}
            <form
              ref={form}
              onSubmit={sendEmail}
              className="flex-1 flex flex-col space-y-5 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-2xl p-8 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {FIELDS_ROW_1.map((f) => (
                  <Field key={f.label} {...f} />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {FIELDS_ROW_2.map((f) => (
                  <Field key={f.label} {...f} />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {FIELDS_ROW_3.map((f) => (
                  <Field key={f.label} {...f} />
                ))}
              </div>
              <Field name="message" label="Your Message *" placeholder="Enter here..." textarea />

              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 text-white font-semibold py-3.5 px-8 rounded-full self-start transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                style={{ backgroundColor: "#101a30" }}
              >
                {sending ? "Sending..." : "Send Message"}
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Right Side: advertisement-style contact panel */}
            <div
              className="flex-1 flex flex-col relative overflow-hidden rounded-2xl p-8 text-white"
              style={{
                background: "linear-gradient(155deg, #101a30 0%, #0b3a4a 60%, #0891b2 130%)",
                boxShadow: "0 30px 60px -25px rgba(16,26,48,0.5)",
              }}
            >
              <div
                className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl"
                style={{ backgroundColor: "rgba(34,211,238,0.2)" }}
              />
              <div
                className="pointer-events-none absolute -bottom-20 -left-10 w-56 h-56 rounded-full blur-3xl"
                style={{ backgroundColor: "rgba(34,211,238,0.1)" }}
              />

              <div className="relative flex flex-col flex-1">
                <span
                  className="inline-block w-fit text-[11px] font-bold tracking-widest uppercase border rounded-full px-3 py-1 mb-4"
                  style={{ backgroundColor: "rgba(34,211,238,0.15)", borderColor: "rgba(34,211,238,0.3)" }}
                >
                  Get In Touch
                </span>
                <h3 className="text-2xl font-bold leading-snug mb-1">
                  We'd love to hear from you
                </h3>
                <p className="text-sm text-white/70 mb-2">
                  Reach out any time — our team responds fast.
                </p>

                <div className="divide-y divide-white/10">
                  <InfoRow
                    icon={MapPin}
                    label="Address"
                    value={
                      <>
                        Linxtel Ltd . 71-75 Shelton Street, covent Garden, London, WC2H 9JQ
                        <br />
                        united Kingdom
                      </>
                    }
                  />
                  <InfoRow icon={Phone} label="Phone" value="+919462719609" />
                  <InfoRow icon={Mail} label="Email" value="sales@linxtel.net" />
                  <InfoRow
                    icon={Clock}
                    label="Open Time"
                    value={
                      <>
                        Monday – Friday : 10:00 – 20:00
                        <br />
                        Saturday – Sunday : 11:00 – 18:00
                      </>
                    }
                  />
                </div>

                <div className="flex-1" />

                <h4 className="text-sm font-bold tracking-widest uppercase text-white/60 mb-3">
                  Stay Connected
                </h4>
                <div className="flex gap-3">
                  {SOCIALS.map(({ icon: Icon, bg }, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer transition-transform hover:scale-110 border border-white/15"
                      style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                    >
                      <Icon size={16} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAP — contained card, terrain view, with the location highlighted */}
        <div className="max-w-8xl mx-auto w-full px-6 md:px-10 pb-16">
  <div className="bg-white/90 backdrop-blur-sm border border-orange-500 squared-2xl overflow-hidden shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-orange-500">
      <div className="flex items-center gap-2">
        <MapPin size={16} style={{ color: "#0891b2" }} />
        <span className="text-sm font-semibold text-orange-500">Find Us</span>
      </div>

      <span
        className="text-xs font-medium px-3 py-1.5 rounded-full"
        style={{ backgroundColor: "#e0f7fa", color: "#0891b2" }}
      >
        71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom
      </span>
    </div>

    <div className="h-[400px] sm:h-[400px]">
      <iframe
        title="Office location map"
        src="https://maps.google.com/maps?q=71-75%20Shelton%20Street%2C%20Covent%20Garden%2C%20London%20WC2H%209JQ%2C%20United%20Kingdom&z=16&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0, display: "block" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
</div>

        {/* Feature strip */}
        <div className="bg-white/90 backdrop-blur-sm py-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-10">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#0b1220" }}
                  >
                    <Icon size={45} style={{ color: "#0891b2" }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-slate-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-500">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;