import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/lang";
import { events, ui } from "@/content/site";
import cosplay from "@/assets/event-cosplay.jpg";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "Events — OHAYO JAPAN" },
      {
        name: "description",
        content: "KL University × OHAYO JAPAN",
      },
      { property: "og:title", content: "Events — OHAYO JAPAN" },
      {
        property: "og:description",
        content: "KL University × OHAYO JAPAN",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-6xl px-5 pt-28">
      <Reveal className="text-center">
        <p className="font-jp text-sm tracking-[0.4em] text-primary">イベント</p>
        <h1 className="mt-3 gold-text font-display text-4xl sm:text-6xl">{t(ui.events)}</h1>
        <p className="mt-3 text-sm text-cream/60">{t(ui.eventsNote)}</p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e, i) => (
          <Reveal key={e.slug} delay={(i % 3) * 90}>
            <article className="glass lift group flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={e.image || cosplay}
                  alt={t(e.title)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--ink)_80%,transparent))]" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-lg text-cream">{t(e.title)}</h2>
                <p className="mt-2 flex-1 text-sm text-cream/65">{t(e.short)}</p>
                <Link
                  to="/events/$slug"
                  params={{ slug: e.slug }}
                  className="mt-5 inline-flex w-fit rounded-full border border-accent/60 px-5 py-2 text-xs tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-ink"
                >
                  {t(ui.viewDetails).toUpperCase()}
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
