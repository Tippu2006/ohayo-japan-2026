import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/lang";
import { schedule, ui, festival } from "@/content/site";
import lanterns from "@/assets/lanterns.jpg";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule — OHAYO JAPAN" },
      {
        name: "description",
        content: "KL University × OHAYO JAPAN",
      },
      { property: "og:title", content: "Schedule — OHAYO JAPAN" },
      { property: "og:description", content: "KL University × OHAYO JAPAN" },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  const { t } = useLang();
  const [day, setDay] = useState<"day1" | "day2">("day1");
  const items = schedule[day];

  return (
    <div className="mx-auto max-w-3xl px-5 pt-28">
      <Reveal className="text-center">
        <p className="font-jp text-sm tracking-[0.4em] text-primary">スケジュール</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl gold-text">{t(ui.schedule)}</h1>
        <p className="mt-1 text-xs text-accent">{t(festival.dates)}</p>

        {/* Schedule Timing Disclaimer Note */}
        <div className="mt-5 inline-block rounded-2xl glass px-5 py-2.5 border border-gold/40 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
          <p className="text-xs font-semibold text-gold tracking-wide">
            Note: Timings might be updated after official dates are announced.
            <span className="block text-[11px] font-jp text-cream/70 font-normal mt-0.5">
              ※ スケジュールおよび日時は、公式日程発表後に更新される場合があります。
            </span>
          </p>
        </div>
      </Reveal>

      <div className="mt-10 flex justify-center gap-3">
        {(["day1", "day2"] as const).map((d) => (
          <button
            key={d}
            onClick={() => setDay(d)}
            className={`rounded-full px-8 py-3 font-display text-sm tracking-[0.3em] transition-all duration-400 ${
              day === d ? "text-ink" : "glass text-cream/70 hover:text-cream"
            }`}
            style={
              day === d
                ? { background: "var(--gradient-gold)", boxShadow: "var(--shadow-glow)" }
                : undefined
            }
          >
            {t(d === "day1" ? ui.day1 : ui.day2)}
          </button>
        ))}
      </div>

      <div key={day} className="relative mt-14 pl-10">
        <div
          className="absolute bottom-0 left-3 top-0 w-px"
          style={{ background: "var(--gradient-gold)" }}
        />
        {items.map((it, i) => (
          <Reveal key={`${day}-${i}`} delay={i * 90}>
            <article className="glass lift relative mb-6 overflow-hidden rounded-2xl">
              <span
                className="absolute -left-[34px] top-8 h-3 w-3 rotate-45"
                style={{ background: "var(--crimson)", boxShadow: "0 0 16px var(--gold)" }}
              />
              <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 items-center sm:items-start">
                <div className="relative h-32 w-full sm:w-36 shrink-0 overflow-hidden rounded-xl border border-gold/40 shadow-md">
                  <img
                    src={it.image || lanterns}
                    alt={t(it.title)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />
                </div>
                <div className="min-w-0 w-full">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-2xl">{it.icon}</span>
                    <span className="font-display text-sm tracking-widest text-accent font-bold">
                      {it.time}
                    </span>
                    {it.venue && (
                      <span className="rounded-full bg-gold/15 px-3 py-0.5 text-xs font-semibold text-gold border border-gold/40 shadow-sm">
                        📍 {t(it.venue)}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 truncate font-display text-xl text-cream">{t(it.title)}</h2>
                  <p className="mt-1 text-sm text-cream/65">{t(it.desc)}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
