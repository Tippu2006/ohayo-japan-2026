import { useEffect, useState } from "react";

export function DragonAnimation({
  active,
  onComplete,
}: {
  active: boolean;
  onComplete?: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [fireActive, setFireActive] = useState(false);

  useEffect(() => {
    if (active) {
      setVisible(true);
      setFireActive(false);

      // Trigger fire breath stage at 1.2s
      const fireTimer = setTimeout(() => {
        setFireActive(true);
      }, 1200);

      // Finish total animation sequence and reveal home page at 2.3s
      const endTimer = setTimeout(() => {
        setVisible(false);
        setFireActive(false);
        if (onComplete) onComplete();
      }, 2300);

      return () => {
        clearTimeout(fireTimer);
        clearTimeout(endTimer);
      };
    }
  }, [active, onComplete]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fade-in">
      {/* Dynamic Background Flash on Fire Breath */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          fireActive
            ? "bg-gradient-to-t from-crimson/95 via-amber-500/80 to-gold/90 mix-blend-screen opacity-95 animate-pulse"
            : "bg-black/80"
        }`}
      />

      {/* Realistic Chinese Dragon Roaming & Facing Camera Container */}
      <div className="relative flex items-center justify-center [animation:dragon-roam_2.3s_cubic-bezier(0.22,1,0.36,1)_forwards]">
        <svg
          viewBox="0 0 1000 1000"
          className="h-[650px] w-[650px] sm:h-[900px] sm:w-[900px] drop-shadow-[0_0_80px_rgba(200,16,46,0.95)]"
        >
          <defs>
            <linearGradient id="dragonScales" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="25%" stopColor="#F59E0B" />
              <stop offset="60%" stopColor="#C8102E" />
              <stop offset="100%" stopColor="#450a0a" />
            </linearGradient>

            <radialGradient id="dragonEyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#FF0000" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </radialGradient>

            <filter id="superGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Realistic Chinese Dragon Body & Features */}
          <g filter="url(#superGlow)">
            {/* Main Winding Serpentine Dragon Spine & Scales */}
            <path
              d="M 120 520 C 180 220, 420 120, 500 380 C 580 640, 820 620, 880 340 C 940 180, 680 80, 500 240 Z"
              fill="none"
              stroke="url(#dragonScales)"
              strokeWidth="28"
              strokeLinecap="round"
              className="[animation:dragon-stroke_2.2s_ease-in-out_infinite]"
            />
            {/* Secondary Scale Accent Line */}
            <path
              d="M 120 520 C 180 220, 420 120, 500 380 C 580 640, 820 620, 880 340 C 940 180, 680 80, 500 240 Z"
              fill="none"
              stroke="#FFD700"
              strokeWidth="6"
              strokeDasharray="12 18"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Dragon 5-Clawed Talons */}
            <g transform="translate(320, 240) rotate(-30)">
              <path
                d="M0,0 Q-20,30 -40,40 M0,0 Q0,40 -10,55 M0,0 Q20,35 15,55 M0,0 Q35,20 40,35"
                stroke="#FFD700"
                strokeWidth="5"
                fill="none"
              />
            </g>
            <g transform="translate(680, 460) rotate(40)">
              <path
                d="M0,0 Q-20,30 -40,40 M0,0 Q0,40 -10,55 M0,0 Q20,35 15,55 M0,0 Q35,20 40,35"
                stroke="#FFD700"
                strokeWidth="5"
                fill="none"
              />
            </g>

            {/* Realistic Chinese Dragon Head Facing Forward Towards Screen */}
            <g transform="translate(500, 380) scale(1.85)">
              {/* Antler Horns (Branching Stag Style) */}
              <path
                d="M-25,-75 C-45,-120 -85,-150 -105,-180 M-60,-135 C-40,-155 -30,-175 -35,-190"
                stroke="#FFD700"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M25,-75 C45,-120 85,-150 105,-180 M60,-135 C40,-155 30,-175 35,-190"
                stroke="#FFD700"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />

              {/* Mane & Back Spines */}
              <path d="M-60,-50 L-90,-80 L-50,-30 L-85,0 L-45,20" fill="#C8102E" />
              <path d="M60,-50 L90,-80 L50,-30 L85,0 L45,20" fill="#C8102E" />

              {/* Head Snout & Forehead Armor Structure */}
              <path
                d="M-55,-60 Q0,-100 55,-60 Q65,-10 45,40 Q0,85 -45,40 Q-65,-10 -55,-60 Z"
                fill="#1c0709"
                stroke="#FFD700"
                strokeWidth="4"
              />
              <path
                d="M-35,-40 Q0,-65 35,-40 Q40,-10 25,25 Q0,50 -25,25 Q-40,-10 -35,-40 Z"
                fill="#2d0a0e"
                stroke="#C8102E"
                strokeWidth="3"
              />

              {/* Piercing Glowing Eyes */}
              <ellipse cx="-24" cy="-22" rx="12" ry="7" fill="url(#dragonEyeGlow)" />
              <line x1="-24" y1="-28" x2="-24" y2="-16" stroke="#FFFF00" strokeWidth="3" />
              <ellipse cx="24" cy="-22" rx="12" ry="7" fill="url(#dragonEyeGlow)" />
              <line x1="24" y1="-28" x2="24" y2="-16" stroke="#FFFF00" strokeWidth="3" />

              {/* Nostrils & Snout Ridge */}
              <circle cx="-12" cy="10" r="4" fill="#FFD700" />
              <circle cx="12" cy="10" r="4" fill="#FFD700" />

              {/* Realistic Open Dragon Jaws & Sharp Fangs */}
              <path d="M-45,30 Q0,75 45,30" fill="none" stroke="#FFD700" strokeWidth="4" />
              <path
                d="M-38,32 L-28,60 L-18,32 M-8,32 L0,68 L8,32 M18,32 L28,60 L38,32"
                fill="#F7F3E8"
                stroke="#C8102E"
                strokeWidth="1"
              />

              {/* Flowing Fiery Dragon Whiskers (Long Serpentine Tendrils) */}
              <path
                d="M-45,15 C-110,0 -160,50 -200,20 C-150,80 -80,40 -35,30"
                fill="url(#dragonScales)"
              />
              <path d="M45,15 C110,0 160,50 200,20 C150,80 80,40 35,30" fill="url(#dragonScales)" />
            </g>
          </g>
        </svg>

        {/* Dragon Fire Breath Expanding Inferno Beam */}
        {fireActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle_at_center,#FFF_0%,#FFD700_25%,#FF4500_60%,#C8102E_85%,transparent_100%)] shadow-[0_0_150px_#FFD700,0_0_250px_#C8102E] [animation:fire-breathe-burst_1.1s_ease-out_forwards]" />
          </div>
        )}

        {/* Realistic Fiery Embers & Sparks Bursting Forward */}
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 32 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-4 w-4 rounded-full bg-gold shadow-[0_0_20px_#FFD700] [animation:spark_1.5s_ease-in-out_infinite]"
              style={{
                top: `${50 + 44 * Math.sin((i * Math.PI) / 16)}%`,
                left: `${50 + 44 * Math.cos((i * Math.PI) / 16)}%`,
                animationDelay: `${i * 0.04}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
