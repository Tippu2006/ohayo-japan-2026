import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Music2, Pause, Volume2, VolumeX } from "lucide-react";
import { useLang } from "@/lib/lang";
import { useMusic } from "@/lib/music";

/** Top-left logo header + Top-right language switch & music control. */
export function TopControls() {
  const { lang, setLang } = useLang();
  const { playing, muted, volume, toggle, setMuted, setVolume } = useMusic();
  const [openMixer, setOpenMixer] = useState(false);

  return (
    <>
      <div className="fixed left-3 top-3 z-50 flex items-center gap-3 sm:left-5 sm:top-5">
        {/* OHAYO JAPAN Official Logo Badge */}
        <Link
          to="/"
          className="glass flex items-center gap-2.5 rounded-full px-3.5 py-1.5 border border-gold/50 bg-black/60 backdrop-blur-md shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300 hover:scale-105 hover:border-gold"
        >
          <img
            src="/logo.png"
            alt="OHAYO JAPAN Logo"
            className="h-6 sm:h-7 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.4)] transition-transform duration-300 group-hover:scale-110"
          />
          <span className="hidden font-display text-xs font-bold tracking-wider text-cream group-hover:text-gold sm:inline">
            OHAYO JAPAN 2026
          </span>
        </Link>

        {/* KL University Official Logo Badge with Inverted High-Contrast Dark Mode Support */}
        <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 border border-gold/50 bg-black/60 backdrop-blur-md shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300 hover:scale-105 hover:border-gold">
          <img
            src="/kl_university_logo.png"
            alt="KL University Logo"
            className="h-6 sm:h-7 w-auto object-contain brightness-0 invert drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]"
          />
        </div>
      </div>

      <div className="fixed right-3 top-3 z-50 flex items-center gap-2 sm:right-5 sm:top-5">
        <div className="glass flex items-center rounded-full p-1 text-xs">
          {(["en", "jp"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                lang === l ? "text-ink" : "text-cream/70 hover:text-cream"
              } ${l === "jp" ? "font-jp" : ""}`}
              style={lang === l ? { background: "var(--gradient-gold)" } : undefined}
            >
              {l === "en" ? "English" : "日本語"}
            </button>
          ))}
        </div>

        <div className="glass relative flex items-center gap-1 rounded-full p-1">
          <button
            onClick={toggle}
            aria-label={playing ? "Pause music" : "Play music"}
            className="rounded-full p-2 text-cream/80 transition-colors hover:text-accent"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Music2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpenMixer((v) => !v)}
            aria-label="Volume"
            className="rounded-full p-2 text-cream/80 transition-colors hover:text-accent"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {openMixer && (
            <div className="glass absolute right-0 top-12 flex w-44 flex-col gap-3 rounded-xl p-3">
              <label className="flex items-center justify-between text-[11px] text-cream/70">
                <span>Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="accent-[var(--crimson)]"
              />
              <button
                onClick={() => setMuted(!muted)}
                className="rounded-md border border-border px-2 py-1.5 text-[11px] text-cream/80 transition-colors hover:border-accent hover:text-accent"
              >
                {muted ? "Unmute" : "Mute"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
