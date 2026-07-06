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

/**
 * TelecomFooter
 * Signature element: a canvas-based "signal mesh" — nodes that pulse like
 * cell towers, connected by lines that occasionally send a traveling
 * packet of light, visualizing a live data network rather than a
 * generic starfield. Recolored to the brand navy/cyan palette, with the
 * mesh tuned to be more visibly active.
 */

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

const linkGroups = [
  {
    title: "Network",
    icon: Radio,
    links: ["5G Coverage Map", "Fiber Broadband", "Enterprise SD-WAN", "IoT Connectivity"],
  },
  {
    title: "Solutions",
    icon: Globe2,
    links: ["Mobile Plans", "Business Bundles", "Cloud Voice (VoLTE)", "Roaming & Data Passes"],
  },
  {
    title: "Support",
    icon: ShieldCheck,
    links: ["Network Status", "Help Center", "SIM & eSIM Activation", "Report an Outage"],
  },
];

const partnerships = [
  { name: "National Regulatory Authority", ref: "MOA-2024-017", year: "2024" },
  { name: "State Digital Infra Board", ref: "MOA-2023-092", year: "2023" },
  { name: "Metro Smart City Initiative", ref: "MOA-2025-004", year: "2025" },
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
        {/* top: brand + link groups + MOA/newsletter */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="footer-heading text-xl font-semibold tracking-tight text-white">
                NEXOLINK
              </span>
              <SignalBars />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              National-grade fiber and 5G infrastructure connecting cities,
              carriers, and communities — built on public-private
              agreements you can verify.
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
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all hover:border-cyan-400/50 hover:text-cyan-300"
                >
                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
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
                  <li key={link}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-cyan-300"
                    >
                      <ChevronRight className="h-3 w-3 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-400" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* MOA / Partnerships + Newsletter */}
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <FileText className="h-4 w-4 text-cyan-400" />
              <span className="footer-heading">Strategic Partnerships (MOA)</span>
            </div>
            <ul className="mt-4 space-y-3">
              {partnerships.map((p) => (
                <li
                  key={p.ref}
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
            1800-NEXOLINK (24/7)
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <Mail className="h-4 w-4 text-cyan-400" />
            partnerships@nexolink.example
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <MapPin className="h-4 w-4 text-cyan-400" />
            Tower 3, Digital Infrastructure Park
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Nexolink Communications Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Regulatory Filings</a>
            <span className="footer-mono flex items-center gap-1 text-slate-600">
              <Wifi className="h-3 w-3" /> Uptime 99.98%
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}