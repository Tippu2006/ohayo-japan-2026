import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import heroFuji from "@/assets/hero-fuji.jpg";
import lanterns from "@/assets/lanterns.jpg";
import cosplay from "@/assets/event-cosplay.jpg";
import gateBamboo from "@/assets/gate-bamboo.jpg";
import { Reveal } from "@/components/Reveal";
import { WaveDivider } from "@/components/Atmosphere";
import { FloatingOrbGallery } from "@/components/FloatingOrbGallery";
import { useLang } from "@/lib/lang";
import { chapters, faculty, festival, sponsors, stats, team, ui } from "@/content/site";
import { Maximize2, X } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OHAYO JAPAN 2026 — Cinematic Japanese Cultural Journey at KL University" },
      {
        name: "description",
        content:
          "Anime, cosplay, language, dance, music, food and traditions. OHAYO JAPAN 2026, September 16–17 at KL University.",
      },
      { property: "og:title", content: "OHAYO JAPAN 2026 — Japanese Culture Festival" },
      {
        property: "og:description",
        content: "Two days of Japanese culture at KL University. September 16–17, 2026.",
      },
    ],
  }),
  component: Index,
});

function useCountdown(target: string) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const t = new Date(target).getTime();
    const tick = () => setLeft(Math.max(0, t - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);
  return left;
}

function Countdown() {
  const { t } = useLang();
  const left = useCountdown(festival.startsAt);
  if (left === null) return <div className="h-40" />;

  if (left === 0) {
    return (
      <h3 className="gold-text text-center font-display text-3xl sm:text-5xl">{t(ui.begun)}</h3>
    );
  }

  const s = Math.floor(left / 1000);
  const cells = [
    { v: Math.floor(s / 86400), l: ui.days },
    { v: Math.floor((s % 86400) / 3600), l: ui.hours },
    { v: Math.floor((s % 3600) / 60), l: ui.minutes },
    { v: s % 60, l: ui.seconds },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {cells.map((c, i) => (
        <Reveal key={i} delay={i * 90}>
          <div
            className="glass lift relative overflow-hidden rounded-2xl border border-gold/30 px-4 py-7 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            style={{
              animation: "glow-pulse 4s ease-in-out infinite",
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <div className="gold-text font-display text-5xl tabular-nums drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-6xl">
              {String(c.v).padStart(2, "0")}
            </div>
            <div className="mt-3 font-display text-[11px] uppercase tracking-[0.35em] text-cream/70">
              {t(c.l)}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const num = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / 1600);
        setN(Math.round(num * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [num]);

  return (
    <span ref={ref} className="gold-text font-display text-4xl sm:text-5xl font-bold">
      {n}
      {suffix}
    </span>
  );
}

function SectionTitle({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <Reveal className="mb-12 text-center">
      {kicker && (
        <p className="font-jp text-sm tracking-[0.45em] text-crimson font-medium">{kicker}</p>
      )}
      <h2 className="mt-3 font-display text-3xl sm:text-5xl tracking-wide text-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-0.5 w-32" style={{ background: "var(--gradient-gold)" }} />
    </Reveal>
  );
}

function Index() {
  const { t } = useLang();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const memories = [
    "/memories/guest_arrival.jpg",
    "/memories/inauguration.jpg",
    "/memories/inauguration_wide.jpg",
    "/memories/discussion.jpg",
    "/memories/activities.jpg",
    "/memories/workshops.jpg",
    "/memories/workshop_tea.jpg",
    "/memories/workshop_origami.jpg",
    "/memories/workshop_chopsticks.jpg",
    "/memories/workshop_manga.jpg",
    "/memories/art_corner.jpg",
    "/memories/memento_presentation.jpg",
    "/memories/memento_tippu.jpg",
    "/memories/guests_hospitality.jpg",
    "/memories/award_stage1.jpg",
    "/memories/award_stage2.jpg",
    "/memories/award_stage3.jpg",
    "/memories/award_stage4.jpg",
    "/memories/award_stage5.jpg",
    "/memories/award_dancer.jpg",
    "/memories/team_finale.jpg",
    "/memories/award_yukata_team.jpg",
    "/memories/award_yukata_male.jpg",
    "/memories/kl_wall_group.jpg",
    "/memories/anime_movie_screening.jpg",
    "/memories/cosplay_competition.jpg",
    "/memories/indo_japanese_dance.jpg",
    "/memories/karaoke_competition.jpg",
    "/memories/origami_workshop.jpg",
    "/memories/calligraphy_workshop.jpg",
    "/memories/tea_ceremony.jpg",
  ];
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [modalPhoto, setModalPhoto] = useState<{
    photo: string;
    name: string;
    designation: string;
    department?: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightbox(null);
        setModalPhoto(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
      {/* HERO */}
      <header className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 text-center">
        <img
          src={heroFuji}
          alt="Mount Fuji at dawn behind cherry blossoms and a red torii gate"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: `translateY(${scrollY * 0.22}px) scale(1.1)` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0.75),rgba(17,17,17,0.55)_45%,var(--background))]" />

        <div className="relative z-10 mx-auto max-w-4xl py-20">
          {/* Main Official Emblem / Logo */}
          <div
            className="mx-auto mb-6 flex justify-center"
            style={{ animation: "fade-in 1.2s 0.1s both" }}
          >
            <div className="relative group">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-crimson via-gold to-crimson opacity-70 blur-3xl group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md p-4 sm:p-6 border-2 border-gold/60 shadow-[0_0_35px_rgba(255,215,0,0.35)] transition-transform duration-500 group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="OHAYO JAPAN Official Samurai Emblem Logo"
                  className="h-48 w-48 object-contain sm:h-64 sm:w-64 drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                />
              </div>
            </div>
          </div>

          <p
            className="font-jp text-sm tracking-[0.6em] text-gold font-medium sm:text-base"
            style={{ animation: "fade-in 1s 0.2s both" }}
          >
            おはよう ジャパン ２０２６
          </p>

          <h1 className="mt-6 font-display text-[14vw] leading-[0.88] sm:text-[7.5rem] tracking-wider">
            {["OHAYO", "JAPAN", festival.year].map((line, i) => (
              <span
                key={line}
                className="block gold-text font-extrabold"
                style={{
                  animation: `fade-in 1.1s ${0.25 + i * 0.22}s both`,
                  filter: "drop-shadow(0 10px 30px rgba(200, 16, 46, 0.6))",
                }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            className="mt-8 font-display text-lg tracking-[0.3em] text-cream font-semibold sm:text-2xl"
            style={{ animation: "fade-in 1s 1s both" }}
          >
            {t(festival.subtitle)}
          </p>

          <p
            className="mx-auto mt-4 max-w-2xl text-xs tracking-widest text-cream/80 sm:text-sm font-medium"
            style={{ animation: "fade-in 1s 1.2s both" }}
          >
            {t(festival.tagline)}
          </p>

          <div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 rounded-2xl glass p-6 max-w-xl mx-auto border border-gold/30 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
            style={{ animation: "fade-in 1s 1.4s both" }}
          >
            {/* KL University Logo with Dark Mode Inverted Contrast */}
            <div className="shrink-0 rounded-xl p-3 bg-black/60 border border-gold/40 shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-transform duration-300 hover:scale-105">
              <img
                src="/kl_university_logo.png"
                alt="KL University (Deemed to be University)"
                className="h-10 sm:h-12 w-auto object-contain brightness-0 invert drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]"
              />
            </div>
            <div className="text-center sm:text-left space-y-1">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90 font-medium">
                {t(festival.presenter)}
              </p>
              <p className="font-display text-xs sm:text-sm tracking-[0.15em] text-cream font-bold leading-relaxed">
                {t(festival.collabLine)}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* COMING SOON SECTION */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center">
        <SectionTitle kicker="近日公開" title="COMING SOON" />
        <Reveal>
          <div className="relative inline-block overflow-hidden rounded-3xl glass p-8 sm:p-14 border border-gold/40 shadow-[0_0_50px_rgba(200,16,46,0.35),0_0_30px_rgba(255,215,0,0.3)] backdrop-blur-xl">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-crimson/20 via-gold/30 to-crimson/20 blur-xl opacity-70" />
            <div className="relative z-10 space-y-5">
              <span className="inline-block rounded-full bg-crimson/30 px-5 py-2 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-gold border border-gold/40 shadow-sm animate-pulse">
                STAY TUNED FOR THE DATES
              </span>
              <h3 className="font-display text-3xl sm:text-5xl font-extrabold gold-text tracking-widest uppercase drop-shadow-[0_4px_20px_rgba(200,16,46,0.5)]">
                Grand Festival Returning Soon
              </h3>
              <p className="font-jp text-sm sm:text-base text-cream/80 max-w-md mx-auto font-medium leading-relaxed">
                KL University · ２日間の日本文化没入体験
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <WaveDivider />

      {/* FACULTY SECTION — 4 Auto Scrolling Marquee Lines for Advisors, Co-Advisors, Convenors, Faculty Mentors */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <SectionTitle kicker="特別感謝" title={t(ui.faculty)} />
        <p className="-mt-8 mb-16 text-center text-sm text-cream/70 max-w-2xl mx-auto font-medium">
          {t(ui.facultyNote)}
        </p>

        <div className="space-y-16">
          {/* 1ST LINE: ADVISORS — Single line continuous slow automatic marquee scroll */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_10px_var(--gold)]" />
              <h3 className="font-display text-base font-bold uppercase tracking-[0.2em] text-gold sm:text-lg">
                Advisors{" "}
                <span className="text-xs font-normal text-cream/50 ml-2 font-jp">顧問</span>
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
            </div>

            <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
              <div
                className="flex w-max gap-5 hover:[animation-play-state:paused]"
                style={{ animation: "marquee 32s linear infinite" }}
              >
                {[
                  ...faculty.filter((f) => f.category === "Advisor"),
                  ...faculty.filter((f) => f.category === "Advisor"),
                ].map((f, i) => (
                  <article
                    key={`adv-${f.name}-${i}`}
                    className="glass lift group relative w-48 shrink-0 overflow-hidden rounded-xl border border-gold/30 p-2.5 shadow-lg transition-all duration-500 hover:border-gold hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] cursor-pointer"
                    onClick={() =>
                      setModalPhoto({
                        photo: f.photo,
                        name: f.name,
                        designation: t(f.designation),
                        department: t(f.department),
                      })
                    }
                  >
                    <span className="pointer-events-none absolute right-2 top-2 z-10 block h-2 w-2 rounded-full bg-crimson shadow-[0_0_8px_var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative aspect-square overflow-hidden rounded-lg bg-white border border-gold/30">
                      <img
                        src={f.photo}
                        alt={f.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-50 pointer-events-none" />
                      <div className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Maximize2 className="h-5 w-5 text-gold drop-shadow-md" />
                      </div>
                    </div>

                    <div className="px-0.5 pb-0.5 pt-2.5 text-center">
                      <h3 className="truncate font-display text-xs font-bold text-cream group-hover:text-gold transition-colors duration-300 sm:text-sm">
                        {f.name}
                      </h3>
                      <p className="mt-0.5 truncate text-[10px] font-semibold text-gold/90 uppercase tracking-wider sm:text-[11px]">
                        {t(f.designation)}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[9px] leading-snug text-cream/70 sm:text-[10px]">
                        {t(f.department)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* 2ND LINE: CO-ADVISORS — 4 items (<= 5 frames: Uniform w-48 flex cards) */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-gold/80 shadow-[0_0_8px_var(--gold)]" />
              <h3 className="font-display text-base font-bold uppercase tracking-[0.2em] text-gold sm:text-lg">
                Co-Advisors{" "}
                <span className="text-xs font-normal text-cream/50 ml-2 font-jp">
                  副アドバイザー
                </span>
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
            </div>

            <div className="flex flex-wrap gap-5 py-2">
              {faculty
                .filter((f) => f.category === "Co-Advisor")
                .map((f, i) => (
                  <Reveal key={f.name} delay={i * 80}>
                    <article
                      className="glass lift group relative w-48 shrink-0 overflow-hidden rounded-xl border border-gold/30 p-2.5 shadow-lg transition-all duration-500 hover:border-gold hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] cursor-pointer"
                      onClick={() =>
                        setModalPhoto({
                          photo: f.photo,
                          name: f.name,
                          designation: t(f.designation),
                          department: t(f.department),
                        })
                      }
                    >
                      <span className="pointer-events-none absolute right-2 top-2 z-10 block h-2 w-2 rounded-full bg-crimson shadow-[0_0_8px_var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative aspect-square overflow-hidden rounded-lg bg-white border border-gold/30">
                        <img
                          src={f.photo}
                          alt={f.name}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-50 pointer-events-none" />
                        <div className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <Maximize2 className="h-5 w-5 text-gold drop-shadow-md" />
                        </div>
                      </div>

                      <div className="px-0.5 pb-0.5 pt-2.5 text-center">
                        <h3 className="truncate font-display text-xs font-bold text-cream group-hover:text-gold transition-colors duration-300 sm:text-sm">
                          {f.name}
                        </h3>
                        <p className="mt-0.5 truncate text-[10px] font-semibold text-gold/90 uppercase tracking-wider sm:text-[11px]">
                          {t(f.designation)}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-[9px] leading-snug text-cream/70 sm:text-[10px]">
                          {t(f.department)}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                ))}
            </div>
          </div>

          {/* 3RD LINE: CONVENOR — 1 item (<= 5 frames: Uniform w-48 flex card) */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-gold/80 shadow-[0_0_8px_var(--gold)]" />
              <h3 className="font-display text-base font-bold uppercase tracking-[0.2em] text-gold sm:text-lg">
                Convenor <span className="text-xs font-normal text-cream/50 ml-2 font-jp">コンベナー</span>
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
            </div>

            <div className="flex flex-wrap gap-5 py-2">
              {faculty
                .filter((f) => f.category === "Convenor")
                .map((f) => (
                  <article
                    key={f.name}
                    className="glass lift group relative w-48 shrink-0 overflow-hidden rounded-xl border border-gold/30 p-2.5 shadow-lg transition-all duration-500 hover:border-gold hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] cursor-pointer"
                    onClick={() =>
                      setModalPhoto({
                        photo: f.photo,
                        name: f.name,
                        designation: t(f.designation),
                        department: t(f.department),
                      })
                    }
                  >
                    <span className="pointer-events-none absolute right-2 top-2 z-10 block h-2 w-2 rounded-full bg-crimson shadow-[0_0_8px_var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative aspect-square overflow-hidden rounded-lg bg-white border border-gold/30">
                      <img
                        src={f.photo}
                        alt={f.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-50 pointer-events-none" />
                      <div className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Maximize2 className="h-5 w-5 text-gold drop-shadow-md" />
                      </div>
                    </div>

                    <div className="px-0.5 pb-0.5 pt-2.5 text-center">
                      <h3 className="truncate font-display text-xs font-bold text-cream group-hover:text-gold transition-colors duration-300 sm:text-sm">
                        {f.name}
                      </h3>
                      <p className="mt-0.5 truncate text-[10px] font-semibold text-gold/90 uppercase tracking-wider sm:text-[11px]">
                        {t(f.designation)}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[9px] leading-snug text-cream/70 sm:text-[10px]">
                        {t(f.department)}
                      </p>
                    </div>
                  </article>
                ))}
            </div>
          </div>

          {/* 4TH LINE: FACULTY MENTORS — 9 items (> 5 frames: Marquee Scroll) */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-crimson shadow-[0_0_8px_var(--gold)]" />
              <h3 className="font-display text-base font-bold uppercase tracking-[0.2em] text-gold sm:text-lg">
                Faculty Mentors <span className="text-xs font-normal text-cream/50 ml-2 font-jp">教員メンター</span>
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
            </div>

            <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
              <div
                className="flex w-max gap-5 hover:[animation-play-state:paused]"
                style={{ animation: "marquee 38s linear infinite" }}
              >
                {[
                  ...faculty.filter((f) => f.category === "Faculty Mentor"),
                  ...faculty.filter((f) => f.category === "Faculty Mentor"),
                ].map((f, i) => (
                  <article
                    key={`ment-${f.name}-${i}`}
                    className="glass lift group relative w-48 shrink-0 overflow-hidden rounded-xl border border-gold/30 p-2.5 shadow-lg transition-all duration-500 hover:border-gold hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] cursor-pointer"
                    onClick={() =>
                      setModalPhoto({
                        photo: f.photo,
                        name: f.name,
                        designation: t(f.designation),
                        department: t(f.department),
                      })
                    }
                  >
                    <span className="pointer-events-none absolute right-2 top-2 z-10 block h-2 w-2 rounded-full bg-crimson shadow-[0_0_8px_var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative aspect-square overflow-hidden rounded-lg bg-white border border-gold/30">
                      <img
                        src={f.photo}
                        alt={f.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-50 pointer-events-none" />
                      <div className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Maximize2 className="h-5 w-5 text-gold drop-shadow-md" />
                      </div>
                    </div>

                    <div className="px-0.5 pb-0.5 pt-2.5 text-center">
                      <h3 className="truncate font-display text-xs font-bold text-cream group-hover:text-gold transition-colors duration-300 sm:text-sm">
                        {f.name}
                      </h3>
                      <p className="mt-0.5 truncate text-[10px] font-semibold text-gold/90 uppercase tracking-wider sm:text-[11px]">
                        {t(f.designation)}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[9px] leading-snug text-cream/70 sm:text-[10px]">
                        {t(f.department)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORS / COLLABORATORS */}
      <section className="py-20 bg-black/40 border-y border-gold/20">
        <SectionTitle kicker="協力" title={t(ui.collaborators)} />
        <div className="relative overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max gap-8" style={{ animation: "marquee 28s linear infinite" }}>
            {[...sponsors, ...sponsors].map((s, i) => (
              <div
                key={i}
                className="glass grid h-24 w-64 shrink-0 place-items-center rounded-xl px-6 text-center font-display text-sm tracking-widest text-cream/50 grayscale transition-all duration-500 hover:scale-105 hover:text-gold hover:border-gold hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:grayscale-0 cursor-pointer"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORGANIZING TEAM SECTION — Marquee scroll if members > 5, Flex Row if <= 5 */}
      <section id="team" className="mx-auto max-w-6xl px-5 py-24">
        <SectionTitle kicker="実行委員会" title={t(ui.team)} />
        <p className="-mt-8 mb-12 text-center text-sm text-cream/70 max-w-2xl mx-auto font-medium">
          {t(ui.teamNote)}
        </p>

        <div className="space-y-16">
          {team.map((group, groupIdx) => {
            const isMarquee = group.members.length > 5;
            return (
              <div key={groupIdx} className="space-y-6">
                {/* Category Header Badge */}
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-crimson shadow-[0_0_8px_var(--gold)]" />
                  <h3 className="font-display text-base font-bold uppercase tracking-[0.2em] text-gold sm:text-lg">
                    {t(group.category)}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
                </div>

                {isMarquee ? (
                  <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
                    <div
                      className="flex w-max gap-5 hover:[animation-play-state:paused]"
                      style={{ animation: `marquee ${group.members.length * 6}s linear infinite` }}
                    >
                      {[...group.members, ...group.members].map((m, mIdx) => (
                        <article
                          key={`${m.name}-${mIdx}`}
                          className="glass lift group relative w-48 shrink-0 overflow-hidden rounded-xl border border-gold/30 p-2.5 shadow-xl transition-all duration-500 hover:border-gold hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] cursor-pointer"
                          onClick={() =>
                            setModalPhoto({
                              photo: m.photo,
                              name: m.name,
                              designation: t(m.role),
                              department: t(m.department),
                            })
                          }
                        >
                          <span className="pointer-events-none absolute right-2 top-2 z-10 block h-2 w-2 rounded-full bg-crimson shadow-[0_0_8px_var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="relative aspect-square overflow-hidden rounded-lg bg-white border border-gold/30">
                            <img
                              src={m.photo}
                              alt={m.name}
                              loading="lazy"
                              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-50 pointer-events-none" />
                            <div className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                              <Maximize2 className="h-5 w-5 text-gold drop-shadow-md" />
                            </div>
                          </div>

                          <div className="px-0.5 pb-0.5 pt-2.5 text-center">
                            <h4 className="truncate font-display text-xs font-bold text-cream group-hover:text-gold transition-colors duration-300 sm:text-sm">
                              {m.name}
                            </h4>
                            <p className="mt-0.5 truncate text-[10px] font-semibold text-gold/90 uppercase tracking-wider sm:text-[11px]">
                              {t(m.role)}
                            </p>
                            <p className="mt-0.5 line-clamp-2 text-[9px] leading-snug text-cream/70 sm:text-[10px]">
                              {t(m.department)}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-5 py-2">
                    {group.members.map((m, mIdx) => (
                      <Reveal key={m.name} delay={(mIdx % 5) * 60}>
                        <article
                          className="glass lift group relative w-48 shrink-0 overflow-hidden rounded-xl border border-gold/30 p-2.5 shadow-xl transition-all duration-500 hover:border-gold hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] cursor-pointer"
                          onClick={() =>
                            setModalPhoto({
                              photo: m.photo,
                              name: m.name,
                              designation: t(m.role),
                              department: t(m.department),
                            })
                          }
                        >
                          <span className="pointer-events-none absolute right-2 top-2 z-10 block h-2 w-2 rounded-full bg-crimson shadow-[0_0_8px_var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="relative aspect-square overflow-hidden rounded-lg bg-white border border-gold/30">
                            <img
                              src={m.photo}
                              alt={m.name}
                              loading="lazy"
                              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-50 pointer-events-none" />
                            <div className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                              <Maximize2 className="h-5 w-5 text-gold drop-shadow-md" />
                            </div>
                          </div>

                          <div className="px-0.5 pb-0.5 pt-2.5 text-center">
                            <h4 className="truncate font-display text-xs font-bold text-cream group-hover:text-gold transition-colors duration-300 sm:text-sm">
                              {m.name}
                            </h4>
                            <p className="mt-0.5 truncate text-[10px] font-semibold text-gold/90 uppercase tracking-wider sm:text-[11px]">
                              {t(m.role)}
                            </p>
                            <p className="mt-0.5 line-clamp-2 text-[9px] leading-snug text-cream/70 sm:text-[10px]">
                              {t(m.department)}
                            </p>
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-4xl px-5 py-24">
        <SectionTitle kicker="歩み" title={t(ui.timeline)} />
        <div className="relative pl-8 sm:pl-12">
          <div
            className="absolute bottom-0 left-3 sm:left-5 top-0 w-0.5"
            style={{ background: "var(--gradient-gold)" }}
          />
          {chapters.map((c, i) => (
            <Reveal key={c.year} delay={i * 120}>
              <div className="relative mb-16 glass p-6 sm:p-8 rounded-2xl border border-gold/30 shadow-xl">
                <span
                  className="absolute -left-[29px] sm:-left-[37px] top-8 h-4 w-4 rotate-45 border border-cream"
                  style={{ background: "var(--crimson)", boxShadow: "0 0 20px var(--gold)" }}
                />
                <p className="gold-text font-display text-4xl sm:text-5xl font-extrabold">
                  {c.year}
                </p>
                <h3 className="mt-2 font-display text-xl sm:text-2xl text-cream font-bold">
                  {t(c.title)}
                </h3>
                <p className="text-sm font-semibold text-gold mt-1">{t(c.dates)}</p>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-cream/80 font-medium">
                  {t(c.text)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MEMORIES GALLERY */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <SectionTitle kicker="思い出" title={t(ui.memories)} />
        <p className="-mt-8 mb-12 text-center text-sm text-cream/70 max-w-xl mx-auto">
          {t(ui.memoriesNote)}
        </p>

        <FloatingOrbGallery photos={memories} onSelect={setLightbox} />
      </section>

      {/* OFFICIAL HOST & FOOTER BANNER */}
      <footer className="mt-20 border-t border-gold/30 bg-black/60 py-16">
        <div className="mx-auto max-w-5xl px-5 text-center space-y-8">
          {/* KL University Official Logo with Dark Mode Inverted Contrast */}
          <div className="inline-block rounded-2xl p-4 bg-black/60 border border-gold/40 shadow-[0_0_30px_rgba(255,215,0,0.35)] transition-transform duration-300 hover:scale-105">
            <img
              src="/kl_university_logo.png"
              alt="Koneru Lakshmaiah Education Foundation (KL Deemed to be University)"
              className="h-12 sm:h-16 w-auto object-contain mx-auto brightness-0 invert drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-lg sm:text-xl font-bold gold-text uppercase tracking-widest">
              KLEF Deemed to be University
            </h3>
            <p className="text-xs sm:text-sm text-cream/70 max-w-xl mx-auto font-medium">
              Department of Foreign Languages & Department of International Relations
            </p>
          </div>

          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          <p className="text-xs text-cream/50 font-jp tracking-wider">
            © 2026 OHAYO JAPAN — 日本文化祭 · All Rights Reserved
          </p>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-6 backdrop-blur-md cursor-pointer animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl overflow-hidden rounded-2xl border-2 border-gold shadow-[0_0_60px_rgba(255,215,0,0.5)]">
            <img
              src={lightbox}
              alt="Memory lightbox view"
              className="max-h-[85vh] w-auto object-contain"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-crimson text-cream font-bold text-lg grid place-items-center shadow-lg hover:scale-110 transition-transform"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* PHOTO LIGHTBOX MODAL */}
      {modalPhoto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300 cursor-pointer"
          onClick={() => setModalPhoto(null)}
        >
          <div
            className="glass relative max-w-md w-full overflow-hidden rounded-3xl border border-gold/50 p-5 shadow-[0_0_60px_rgba(255,215,0,0.35)] bg-zinc-950/95 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3.5 top-3.5 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-gold hover:bg-gold hover:text-black transition-all border border-gold/40 shadow-lg cursor-pointer"
              onClick={() => setModalPhoto(null)}
              aria-label="Close photo preview"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative max-h-[62vh] w-full overflow-hidden rounded-2xl bg-white border border-gold/30 flex items-center justify-center shadow-inner">
              <img
                src={modalPhoto.photo}
                alt={modalPhoto.name}
                className="max-h-[62vh] w-full object-contain bg-zinc-950"
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="font-display text-base sm:text-lg font-bold text-cream">
                {modalPhoto.name}
              </h3>
              <p className="mt-1 text-xs font-semibold text-gold uppercase tracking-widest">
                {modalPhoto.designation}
              </p>
              {modalPhoto.department && (
                <p className="mt-0.5 text-xs text-cream/70">{modalPhoto.department}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
