import { useEffect, useMemo, useState } from "react";

const Petal = ({ i }: { i: number }) => {
  const style = useMemo(() => {
    const size = 8 + ((i * 7) % 12);
    return {
      left: `${(i * 6.37) % 100}%`,
      width: size,
      height: size * 0.8,
      animationDuration: `${9 + ((i * 3) % 11)}s`,
      animationDelay: `${-(i * 1.7) % 14}s`,
      "--drift": `${((i % 5) - 2) * 60}px`,
    } as React.CSSProperties;
  }, [i]);

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-0 block rounded-tl-full rounded-br-full opacity-70"
      style={{
        ...style,
        background: "linear-gradient(135deg, #ffd9e6, #f7a8c4)",
        animationName: "fall",
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
      }}
    />
  );
};

/** Falling sakura petals + drifting fog + fireflies. */
export function Atmosphere({
  count = 22,
  fireflies = true,
}: {
  count?: number;
  fireflies?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      <div
        className="absolute inset-x-[-20%] bottom-0 h-1/2 opacity-40"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, color-mix(in oklab, var(--cream) 22%, transparent), transparent 70%)",
          animation: "fog-drift 26s ease-in-out infinite alternate",
        }}
      />
      {Array.from({ length: count }, (_, i) => (
        <Petal key={i} i={i} />
      ))}
      {fireflies &&
        Array.from({ length: 12 }, (_, i) => (
          <span
            key={`f${i}`}
            className="absolute bottom-0 block h-1.5 w-1.5 rounded-full"
            style={{
              left: `${(i * 8.3 + 4) % 100}%`,
              background: "var(--gold)",
              boxShadow: "0 0 12px 3px color-mix(in oklab, var(--gold) 60%, transparent)",
              animation: `float-up ${14 + (i % 7)}s linear ${-i * 2}s infinite`,
              ["--drift" as string]: `${((i % 4) - 2) * 50}px`,
            }}
          />
        ))}
    </div>
  );
}

/** Cherry-blossom cursor trail (desktop only). */
export function CursorTrail() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let last = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 70) return;
      last = now;
      const el = document.createElement("span");
      el.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:9px;height:7px;pointer-events:none;z-index:60;border-radius:100% 0 100% 0;background:linear-gradient(135deg,#ffd9e6,#f28fb4);opacity:.9;transition:transform .9s ease-out,opacity .9s ease-out`;
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transform = `translate(${(Math.random() - 0.5) * 60}px, 70px) rotate(${Math.random() * 360}deg)`;
        el.style.opacity = "0";
      });
      window.setTimeout(() => el.remove(), 950);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}

/** Katana-shaped scroll progress indicator. */
export function KatanaProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div aria-hidden className="fixed left-0 right-0 top-0 z-50 h-[3px]">
      <div
        className="relative h-full origin-left"
        style={{
          width: `${p * 100}%`,
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--cream) 85%, transparent))",
        }}
      >
        <span
          className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45"
          style={{ background: "var(--crimson)", boxShadow: "0 0 12px var(--gold)" }}
        />
      </div>
    </div>
  );
}

/** Traditional seigaiha wave divider. */
export function WaveDivider() {
  return (
    <div
      aria-hidden
      className="h-10 w-full opacity-30"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20px 40px, transparent 18px, color-mix(in oklab, var(--gold) 45%, transparent) 19px, transparent 20px)",
        backgroundSize: "40px 40px",
      }}
    />
  );
}
