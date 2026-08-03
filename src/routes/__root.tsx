import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LangProvider, useLang } from "../lib/lang";
import { MusicProvider } from "../lib/music";
import { Landing } from "../components/Landing";
import { Dock } from "../components/Dock";
import { TopControls } from "../components/TopControls";
import { Atmosphere, KatanaProgress } from "../components/Atmosphere";
import { KunaiCursor } from "../components/KunaiCursor";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold gold-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This path leads away from the festival grounds.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "7E2aXlp44Hz81H8V2kq9feSF-NoHBIcj_lJKjC_kQ-s" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "googlebot", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { title: "OHAYO JAPAN" },
      {
        name: "description",
        content: "KL University × OHAYO JAPAN",
      },
      {
        name: "author",
        content: "KL University · Dept. of Foreign Languages & Dept. of International Relations",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "OHAYO JAPAN" },
      { property: "og:title", content: "OHAYO JAPAN" },
      { property: "og:description", content: "KL University × OHAYO JAPAN" },
      { property: "og:image", content: "https://ohayo-japan-2026.vercel.app/memories/student_delegation_logo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "OHAYO JAPAN" },
      { name: "twitter:description", content: "KL University × OHAYO JAPAN" },
      { name: "twitter:image", content: "https://ohayo-japan-2026.vercel.app/memories/student_delegation_logo.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;800&family=Poppins:wght@300;400;500;600&family=Zen+Old+Mincho:wght@400;700&family=Noto+Sans+JP:wght@300;500;700&display=swap",
      },
      { rel: "icon", href: "/memories/student_delegation_logo.jpg", type: "image/jpeg" },
      { rel: "apple-touch-icon", href: "/memories/student_delegation_logo.jpg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "OHAYO JAPAN",
              alternateName: ["Ohayo Japan", "OHAYO JAPAN KLU", "Ohayo Japan KLU"],
              url: "https://ohayo-japan-2026.vercel.app/",
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Shell() {
  const { fading } = useLang();
  return (
    <>
      <Landing />
      <KatanaProgress />
      <TopControls />
      <Atmosphere />
      <KunaiCursor />
      <main
        className="relative z-10 pb-28 transition-opacity duration-300"
        style={{ opacity: fading ? 0 : 1 }}
      >
        {/* Required: nested routes render here. */}
        <Outlet />
      </main>
      <Dock />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <MusicProvider>
          <Shell />
        </MusicProvider>
      </LangProvider>
    </QueryClientProvider>
  );
}
