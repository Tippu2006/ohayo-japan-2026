import { useEffect, useState } from "react";
import bamboo from "@/assets/gate-bamboo.jpg";
import { useLang } from "@/lib/lang";
import { useMusic } from "@/lib/music";
import { ui, festival } from "@/content/site";
import { Atmosphere } from "./Atmosphere";

/** Cinematic gate: bamboo forest + torii gate, camera fly-through on EXPLORE. */
export function Landing() {
  const { t } = useLang();
  const { start } = useMusic();
  const [open, setOpen] = useState(true);
  const [flying, setFlying] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("ohayo-entered") === "1") setOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const enter = () => {
    start();
    setFlying(true);
    window.sessionStorage.setItem("ohayo-entered", "1");
    window.setTimeout(() => setOpen(false), 1700);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#0d0a0b]">
      {/* Bamboo Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-[1700ms] ease-[cubic-bezier(0.7,0,0.3,1)]"
        style={{
          backgroundImage: `url(${bamboo})`,
          transform: flying ? "scale(4.5) translateY(-5%)" : "scale(1.06)",
          filter: flying ? "brightness(2.6) blur(8px)" : "brightness(0.9)",
          opacity: flying ? 0 : 1,
        }}
      />

      {/* Sunrise & Fog Gradients */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, color-mix(in oklab, var(--gold) 20%, transparent) 0%, transparent 60%), radial-gradient(circle at 50% 80%, color-mix(in oklab, var(--crimson) 35%, transparent) 0%, color-mix(in oklab, var(--ink) 92%, transparent) 75%)",
          opacity: flying ? 0.2 : 1,
        }}
      />

      {/* Torii Gate Silhouette Silhouette Overlay */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-[1700ms] ease-[cubic-bezier(0.7,0,0.3,1)]"
        style={{
          transform: flying ? "scale(6)" : "scale(1)",
          opacity: flying ? 0 : 0.85,
        }}
      >
        <svg
          viewBox="0 0 600 500"
          className="h-full max-h-[85vh] w-auto text-crimson/90 drop-shadow-[0_0_50px_rgba(200,16,46,0.6)]"
          fill="currentColor"
        >
          {/* Kasagi & Shimoki (Top Roof Beams) */}
          <path d="M 50 110 C 150 95, 450 95, 550 110 L 560 130 C 440 120, 160 120, 40 130 Z" />
          <path
            d="M 70 145 C 180 138, 420 138, 530 145 L 530 160 C 420 155, 180 155, 70 160 Z"
            opacity="0.9"
          />
          {/* Nuki (Tie Beam) */}
          <rect x="90" y="210" width="420" height="22" rx="3" />
          {/* Pillars (Hashira) */}
          <polygon points="150,145 185,145 175,480 140,480" />
          <polygon points="415,145 450,145 460,480 425,480" opacity="0.95" />
          {/* Struts (Gakuzuka) */}
          <rect x="285" y="160" width="30" height="50" fill="var(--gold)" opacity="0.8" />
        </svg>
      </div>

      {/* Particle & Falling Sakura Atmosphere */}
      <Atmosphere count={30} fireflies={true} />

      {/* Center Landing Prompt */}
      <div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-all duration-700"
        style={{ opacity: flying ? 0 : 1, transform: flying ? "scale(1.4)" : "none" }}
      >
        {/* Official Logo Emblem with Interactive Dragon Soar Trigger */}
        <div className="mb-6 flex justify-center cursor-pointer" onClick={enter}>
          <div className="rounded-full bg-[radial-gradient(circle_at_center,#1f080b_0%,#0c0608_60%,#000000_100%)] p-4 sm:p-5 border-2 border-gold/70 shadow-[0_0_40px_rgba(200,16,46,0.6),0_0_25px_rgba(255,215,0,0.5)] backdrop-blur-xl transition-transform duration-300 hover:scale-105">
            <img
              src="/logo.png"
              alt="OHAYO JAPAN Official Logo — Click for Dragon Entrance"
              className="h-40 w-40 object-contain sm:h-52 sm:w-52 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
            />
          </div>
        </div>

        <p className="font-jp text-3xl tracking-[0.5em] text-cream/90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-4xl">
          探索する
        </p>

        {/* EXPLORE Button with Glowing Brush-Stroke Aesthetics */}
        <button
          onClick={enter}
          className="group relative mt-10 px-14 py-6 font-display text-2xl tracking-[0.5em] text-cream sm:text-3xl"
          style={{ animation: "glow-pulse 3.5s ease-in-out infinite" }}
        >
          {/* Brush stroke border effect */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-md border-2 border-gold/70 transition-all duration-500 group-hover:scale-105 group-hover:border-gold group-hover:shadow-[0_0_50px_rgba(255,215,0,0.7)]"
            style={{
              background: "linear-gradient(135deg, rgba(200, 16, 46, 0.4), rgba(17, 17, 17, 0.7))",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 30px rgba(200, 16, 46, 0.5), inset 0 0 15px rgba(255, 215, 0, 0.3)",
            }}
          />

          {/* Golden floating particle ring */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-3 block rounded-lg border border-gold/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <span className="relative font-bold text-cream drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-gold transition-colors duration-300">
            {t(ui.explore)}
          </span>
        </button>

        <p className="mt-12 font-display text-sm tracking-[0.35em] text-cream/70 sm:text-base">
          {festival.name} {festival.year}
        </p>
      </div>

      {/* Ink Splash Reveal Overlay */}
      {flying && (
        <div
          className="absolute inset-0 z-20 bg-background"
          style={{ animation: "ink-open 1.1s 0.6s cubic-bezier(0.8,0,0.2,1) both" }}
        />
      )}
    </div>
  );
}
