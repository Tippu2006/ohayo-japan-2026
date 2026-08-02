import { useEffect, useRef, useState } from "react";

interface PetalParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  opacity: number;
  color: string;
}

const PETAL_COLORS = [
  "#ffd1dc", // soft pink
  "#f7a8c4", // sakura pink
  "#ffb7c5", // cherry blossom pink
  "#ffe4e1", // misty rose
  "#ffd700", // gold accent petal
];

export function KunaiCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(-45);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [petals, setPetals] = useState<PetalParticle[]>([]);

  const lastPosRef = useRef({ x: 0, y: 0 });
  const petalsRef = useRef<PetalParticle[]>([]);

  useEffect(() => {
    // Hide default cursor on non-coarse pointer devices (desktop/laptops)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const style = document.createElement("style");
    style.id = "kunai-cursor-style";
    style.innerHTML = `
      body, a, button, input, textarea, select, [role="button"], article, .glass, .lift, .cursor-pointer {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.getElementById("kunai-cursor-style")?.remove();
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let id = 0;

    const spawnPetal = (x: number, y: number, isBurst = false) => {
      const count = isBurst ? 16 : 1;
      const newPetals: PetalParticle[] = [];

      for (let i = 0; i < count; i++) {
        const speed = isBurst ? Math.random() * 4 + 2 : Math.random() * 1.5 + 0.5;
        const dirAngle = isBurst
          ? Math.random() * Math.PI * 2
          : Math.PI / 2 + (Math.random() - 0.5) * 0.8;

        newPetals.push({
          id: id++,
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(dirAngle) * speed,
          vy: Math.sin(dirAngle) * speed + (isBurst ? 0 : 0.4),
          size: Math.random() * 12 + 7,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 10,
          opacity: 1,
          color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        });
      }

      petalsRef.current = [...petalsRef.current, ...newPetals].slice(-75);
      setPetals([...petalsRef.current]);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      const { clientX: x, clientY: y } = e;

      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;

      setPos({ x, y });
      lastPosRef.current = { x, y };

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(
        'a, button, input, textarea, select, [role="button"], article, .glass, .lift, .cursor-pointer'
      );
      setIsHovered(isInteractive);

      // Continuous Sakura trail when hovering or moving fast
      if (isInteractive || Math.hypot(dx, dy) > 18) {
        if (Math.random() > 0.35) {
          spawnPetal(x, y, false);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      spawnPetal(e.clientX, e.clientY, true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Particle animation loop
    let animFrame: number;
    const updateParticles = () => {
      if (petalsRef.current.length > 0) {
        petalsRef.current = petalsRef.current
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            rotation: p.rotation + p.vRot,
            opacity: p.opacity - 0.025,
            vy: p.vy + 0.04, // light gravity
          }))
          .filter((p) => p.opacity > 0);
        setPetals([...petalsRef.current]);
      }
      animFrame = requestAnimationFrame(updateParticles);
    };
    animFrame = requestAnimationFrame(updateParticles);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Interactive Sakura Petal Particles */}
      <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
        {petals.map((p) => (
          <svg
            key={p.id}
            className="absolute pointer-events-none drop-shadow-[0_0_8px_rgba(247,168,196,0.8)]"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
              opacity: p.opacity,
            }}
            viewBox="0 0 24 24"
            fill={p.color}
          >
            <path d="M12 2C8 2 4 6 4 10c0 5 8 12 8 12s8-7 8-12c0-4-4-8-8-8zm0 14c-1.5 0-3-1.5-3-3s1.5-3 3-3 3 1.5 3 3-1.5 3-3 3z" />
          </svg>
        ))}
      </div>

      {/* Kunai Cursor Graphic (Fixed & Stable Pointer Orientation) */}
      <div
        className="pointer-events-none fixed z-[9999] transition-transform duration-75 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-4px, -4px) scale(${
            isClicking ? 0.85 : isHovered ? 1.25 : 1
          })`,
        }}
      >
        <div className="relative">
          {/* Custom Ninja Kunai Dagger */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_14px_rgba(255,215,0,0.85)]"
          >
            <defs>
              <linearGradient id="kunaiBlade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
              <linearGradient id="kunaiGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#c8102e" />
              </linearGradient>
            </defs>

            {/* Sharp Kunai Spearhead */}
            <path
              d="M4 4L22 10L10 22L4 4Z"
              fill="url(#kunaiBlade)"
              stroke="#ffd700"
              strokeWidth="1.5"
            />
            {/* Center Ridge Spine */}
            <path
              d="M4 4L14 14"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Handle / Shaft */}
            <rect
              x="16"
              y="16"
              width="14"
              height="5"
              rx="2"
              transform="rotate(45 16 16)"
              fill="#0f172a"
              stroke="#ffd700"
              strokeWidth="1"
            />

            {/* Crimson Cord Wrapping */}
            <line x1="19" y1="19" x2="22" y2="22" stroke="#c8102e" strokeWidth="2.5" />
            <line x1="22" y1="22" x2="25" y2="25" stroke="#c8102e" strokeWidth="2.5" />

            {/* Ring Pommel */}
            <circle
              cx="33"
              cy="33"
              r="4.5"
              fill="none"
              stroke="url(#kunaiGlow)"
              strokeWidth="2"
            />

            {/* Sakura Tassel Ribbon */}
            <path
              d="M36 36C39 39 43 43 41 47C39 44 37 40 36 36Z"
              fill="#c8102e"
            />
          </svg>

          {/* Click Pulsing Ripple Ring */}
          {isClicking && (
            <span className="absolute -inset-3 animate-ping rounded-full border-2 border-gold bg-crimson/30" />
          )}
        </div>
      </div>
    </>
  );
}
