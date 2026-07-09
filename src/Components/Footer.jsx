import React, { useEffect, useRef, useState } from "react";
import {
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import {
  Wifi,
  Globe2,
  Radio,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  ChevronRight,
} from "lucide-react";



const NODE_COUNT = 50;
const CONNECT_DIST = 170;
const COLORS = {
  signal: "34, 211, 238", // cyan — regular nodes + connections
  pulse: "224, 250, 255", // bright cyan-white — tower nodes
};

function NetworkMesh() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width, height, dpr;
    let nodes = [];
    let packets = [];

    function resize() {
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: Math.random() * 1.6 + 0.8,
        phase: Math.random() * Math.PI * 2,
        isTower: Math.random() < 0.14,
      }));
    }

    resize();
    initNodes();

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas.parentElement);

    function maybeSpawnPacket() {
      if (Math.random() < 0.04 && nodes.length > 1) {
        const a = nodes[Math.floor(Math.random() * nodes.length)];
        let b = nodes[Math.floor(Math.random() * nodes.length)];
        let tries = 0;
        while (b === a && tries < 5) {
          b = nodes[Math.floor(Math.random() * nodes.length)];
          tries++;
        }
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < CONNECT_DIST * 1.4) {
          packets.push({ a, b, t: 0, speed: 0.014 + Math.random() * 0.012 });
        }
      }
    }

    let t = 0;
    function draw() {
      t += 1;
      ctx.clearRect(0, 0, width, height);

      // update + draw nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.28;
            ctx.strokeStyle = `rgba(${COLORS.signal}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes themselves — shining points, brighter pulse on "towers"
      for (const n of nodes) {
        const pulse = 0.55 + 0.45 * Math.sin(t * 0.02 + n.phase);
        const baseColor = n.isTower ? COLORS.pulse : COLORS.signal;
        const radius = n.isTower ? n.r * 2.4 : n.r;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${baseColor}, ${0.55 + 0.45 * pulse})`;
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fill();

        if (n.isTower) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${baseColor}, ${0.35 * pulse})`;
          ctx.lineWidth = 1.2;
          ctx.arc(n.x, n.y, radius * 3.6 * pulse, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // traveling packets (data flashes along a connection)
      if (!prefersReduced) maybeSpawnPacket();
      packets = packets.filter((p) => p.t <= 1);
      for (const p of packets) {
        p.t += p.speed;
        const x = p.a.x + (p.b.x - p.a.x) * p.t;
        const y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `rgba(${COLORS.signal}, 0.5)`;
        ctx.arc(x, y, 5.5, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    if (prefersReduced) {
      // Draw a single static-ish frame, no animation loop
      draw();
      cancelAnimationFrame(rafRef.current);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-90"
      aria-hidden="true"
    />
  );
}

function SignalBars() {
  return (
    <span className="inline-flex items-end gap-[3px] h-4" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-cyan-400"
          style={{
            height: `${5 + i * 3}px`,
            animation: `signalRise 1.4s ease-in-out ${i * 0.15}s infinite`,
            opacity: 0.9,
          }}
        />
      ))}
    </span>
  );
}

// Main site navigation
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "FAQ", href: "/faq" },
];

// VoIP service/feature groups
const linkGroups = [
  {
    title: "Quick Links",
    icon: Radio,
    links: quickLinks,
  },
  {
    title: "Platform Features",
    icon: Globe2,
    links: [
      { label: "AI Automation Capabilities", href: "/services#ai-automation" },
      { label: "Omnichannel Support", href: "/services#omnichannel-support" },
      { label: "CRM Integrations", href: "/services#crm-integrations" },
      { label: "Call Analytics", href: "/services#call-analytics" },
      { label: "Global Coverage", href: "/services#global-coverage" },
    ],
  },
  {
    title: "Why Linxtel",
    icon: ShieldCheck,
    links: [
      { label: "Security & Compliance", href: "/services#security-compliance" },
      { label: "Scalability", href: "/services#scalability" },
      { label: "Pricing Model", href: "/services#pricing-model" },
      { label: "Ease of Deployment", href: "/services#ease-of-deployment" },
      { label: "Customer Support", href: "/services#customer-support" },
    ],
  },
];

const contactCards = [
  { name: "Head Office", ref: "London, UK" },
  { name: "Phone", ref: "+91 94627 19609" },
  { name: "Email", ref: "sales@linxtel.net" },
];

const socials = [
  { Icon: FaTwitter, label: "X (Twitter)" },
  { Icon: FaLinkedinIn, label: "LinkedIn" },
  { Icon: FaFacebookF, label: "Facebook" },
  { Icon: FaInstagram, label: "Instagram" },
];

export default function TelecomFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="relative overflow-hidden bg-[#101a30] text-slate-300">
      <style>{`
        @keyframes signalRise {
          0%, 100% { transform: scaleY(0.6); opacity: 0.55; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes livePulse {
          0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.55); }
          70% { box-shadow: 0 0 0 8px rgba(52, 211, 153, 0); }
          100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
        }
        .footer-heading {
          font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
        }
        .footer-mono {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-heading, .footer-mono { animation: none !important; }
        }
      `}</style>

      {/* animated signal-mesh background */}
      <NetworkMesh />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,211,238,0.14), transparent), linear-gradient(180deg, rgba(16,26,48,0) 0%, rgba(16,26,48,0.55) 60%, #101a30 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-8 sm:px-10">
        {/* top: brand + link groups + contact/newsletter */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr] lg:items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="footer-heading text-xl font-semibold tracking-tight text-white">
                Linxtel
              </span>
              <SignalBars />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Cloud VoIP and AI-powered contact center solutionss marter
              calling, omnichannel support, and enterprise-grade reliability
              for teams of any size.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-emerald-400">
              <span
                className="h-2 w-2 rounded-full bg-emerald-400"
                style={{ animation: "livePulse 2s infinite" }}
              />
              <span className="footer-mono">All network zones operational</span>
            </div>

            <div className="mt-6 flex items-center gap-3">
  {socials.map(({ Icon, label }) => (
    <button
      key={label}
      type="button"
      aria-label={label}
      onClick={() => {
        /* Handle your click logic here */
      }}
      className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all hover:border-cyan-400/50 hover:text-cyan-300"
    >
      <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
    </button>
  ))}
</div>
          </div>

          {/* Link groups */}
          {linkGroups.map(({ title, icon: Icon, links }) => (
            <div key={title}>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Icon className="h-4 w-4 text-cyan-400" />
                <span className="footer-heading">{title}</span>
              </div>
              <ul className="mt-4 space-y-3">
  {links.map((link) => (
    <li key={link.label}>
      <a
        href={link.href}
        className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-cyan-300 w-full text-left"
      >
        <ChevronRight className="h-3 w-3 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-400" />
        {link.label}
      </a>
    </li>
  ))}
</ul>
            </div>
          ))}

          {/* Contact details + Newsletter */}
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <FileText className="h-4 w-4 text-cyan-400" />
              <span className="footer-heading">Get In Touch</span>
            </div>
            <ul className="mt-4 space-y-3">
              {contactCards.map((p) => (
                <li
                  key={p.name}
                  className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 transition-colors hover:border-cyan-400/30"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-300">{p.name}</span>
                    <span className="footer-mono shrink-0 text-[10px] text-cyan-300/80">
                      {p.ref}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <p className="text-sm font-semibold text-white footer-heading">
                Get network updates
              </p>
              {subscribed ? (
                <p className="mt-3 text-sm text-emerald-400">
                  Subscribed — you'll hear from us.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40"
                  />
                  <button
                    type="submit"
                    className="flex shrink-0 items-center gap-1 rounded-md bg-cyan-400 px-3 py-2 text-sm font-medium text-[#101a30] transition-colors hover:bg-cyan-300"
                  >
                    Join
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* contact row */}
        <div className="grid grid-cols-1 gap-6 border-b border-white/10 py-8 sm:grid-cols-3">
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Phone className="h-4 w-4 text-cyan-400" />
            +91 94627 19609
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Mail className="h-4 w-4 text-cyan-400" />
            sales@linxtel.net
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <MapPin className="h-4 w-4 text-cyan-400" />
            2ND FLOOR COLLEGE HOUSE 17 KING EDWARDS ROAD,
RUISLIP,
LONDON,
UNITED KINGDOM HA4 7AE
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Linxtel Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
  <a href="/privacy-policy" className="hover:text-slate-300">Privacy Policy</a>
  <a href="/terms-of-service" className="hover:text-slate-300">Terms of Service</a>
  <a href="/faq" className="hover:text-slate-300">FAQ</a>

  <span className="footer-mono flex items-center gap-1 text-slate-600">
    <Wifi className="h-3 w-3" /> Uptime 99.98%
  </span>
</div>
        </div>

        {/*
          REQUIRED ATTRIBUTION — DO NOT REMOVE OR MODIFY
          This credit line is hardcoded and intentionally not sourced from any
          editable array/config in this file so it can't be accidentally
          stripped out during future content edits.
        */}
        <div className="flex items-center justify-center pt-4">
          <span className="footer-mono text-[11px] text-slate-500">
            Powered by <span className="text-cyan-300/90">Codostack</span>
          </span>
        </div>
      </div>
    </footer>
  );
}