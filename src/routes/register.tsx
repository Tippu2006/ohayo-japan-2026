import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/lang";
import { registrations, ui } from "@/content/site";
import lanterns from "@/assets/lanterns.jpg";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Registration — OHAYO JAPAN 2026" },
      {
        name: "description",
        content:
          "Register for OHAYO JAPAN 2026: Cosplay, Indo-Japanese Fusion Dance, J-Pop Karaoke, Cultural Workshops, and Stage Activities.",
      },
      { property: "og:title", content: "Registration — OHAYO JAPAN 2026" },
      { property: "og:description", content: "Reserve your place at the festival." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-5xl px-5 pt-28">
      <Reveal className="text-center">
        <p className="font-jp text-sm tracking-[0.4em] text-primary">登録</p>
        <h1 className="mt-3 gold-text font-display text-4xl sm:text-6xl">{t(ui.registration)}</h1>
        <p className="mt-3 text-sm text-cream/60">{t(ui.registrationNote)}</p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {registrations.map((r, i) => (
          <Reveal key={i} delay={(i % 2) * 90}>
            <article className="glass lift group flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/7] overflow-hidden">
                <img
                  src={r.image || lanterns}
                  alt={t(r.title)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--ink)_85%,transparent))]" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-xl text-cream">{t(r.title)}</h2>
                <p className="mt-2 flex-1 text-sm text-cream/65">{t(r.desc)}</p>
                <a
                  href={r.form}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit rounded-full px-7 py-3 font-display text-xs tracking-[0.3em] text-ink transition-transform duration-300 hover:scale-105"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  {t(ui.register).toUpperCase()}
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-16 text-center text-xs text-cream/40">
        Edit every form link, event and text in <code>src/content/site.ts</code>.
      </p>
    </div>
  );
}
