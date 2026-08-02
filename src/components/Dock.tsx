import { Link } from "@tanstack/react-router";
import { Home, CalendarDays, Ticket, PenLine } from "lucide-react";
import { useLang } from "@/lib/lang";
import { ui } from "@/content/site";

const items = [
  { to: "/", label: ui.home, Icon: Home },
  { to: "/schedule", label: ui.schedule, Icon: CalendarDays },
  { to: "/events", label: ui.events, Icon: Ticket },
  { to: "/register", label: ui.registration, Icon: PenLine },
] as const;

/** Always-visible floating dock. */
export function Dock() {
  const { t } = useLang();

  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <div className="glass flex items-center gap-1 rounded-full p-1.5 shadow-[var(--shadow-crimson)] sm:gap-2">
        {items.map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="group relative flex items-center gap-2 rounded-full px-3 py-2 text-xs tracking-wide text-cream/70 transition-colors hover:text-cream sm:px-4 sm:text-sm data-[status=active]:text-ink"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-glow)" }}
                  />
                )}
                <Icon className="relative h-4 w-4 shrink-0" />
                <span className="relative hidden sm:inline">{t(label)}</span>
              </>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
