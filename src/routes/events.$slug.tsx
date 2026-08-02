import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/lang";
import { events, ui } from "@/content/site";
import cosplay from "@/assets/event-cosplay.jpg";
import lanterns from "@/assets/lanterns.jpg";
import heroFuji from "@/assets/hero-fuji.jpg";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = events.find((e) => e.slug === params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Event not found — OHAYO JAPAN 2026" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.event.title.en} — OHAYO JAPAN 2026`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.event.short.en },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.event.short.en },
      ],
    };
  },
  component: EventDetail,
});

function EventDetail() {
  const { event } = Route.useLoaderData();
  const { t } = useLang();

  return (
    <article>
      <header className="relative h-[60vh] min-h-80 overflow-hidden">
        <img
          src={event.image || cosplay}
          alt={t(event.title)}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--ink)_55%,transparent),var(--background))]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-5 pb-10">
          <Link to="/events" className="text-xs tracking-[0.3em] text-cream/60 hover:text-accent">
            ← {t(ui.back).toUpperCase()}
          </Link>
          <h1 className="mt-3 gold-text font-display text-4xl sm:text-6xl">{t(event.title)}</h1>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-12">
        <Reveal>
          <p className="text-base leading-relaxed text-cream/80">{t(event.description)}</p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[
            { l: ui.venue, v: t(event.venue) },
            { l: ui.time, v: t(event.time) },
          ].map((x, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="glass rounded-xl p-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{t(x.l)}</p>
                <p className="mt-2 text-sm text-cream">{x.v}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href={event.form}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full px-10 py-4 font-display text-sm tracking-[0.3em] text-ink transition-transform duration-300 hover:scale-105"
            style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-glow)" }}
          >
            {t(ui.register).toUpperCase()}
          </a>
        </div>
      </div>
    </article>
  );
}
