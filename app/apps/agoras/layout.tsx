import type { Metadata } from "next";
import Link from "next/link";

const title = "Agoras — a desktop app for creators";
const description =
  "Agoras is a desktop command-line app for creators. Authorize in the browser, then Share to TikTok from a localhost compose page before anything is uploaded.";
const canonical = "https://luisalejandro.org/apps/agoras";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: "Agoras",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function AgorasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-neutral-900">
      <header className="flex w-full flex-wrap items-center justify-between gap-4 border-b border-neutral-200 px-6 py-4">
        <Link href="/apps/agoras" className="text-lg font-medium">
          Agoras
        </Link>
        <nav className="flex gap-4 text-sm" aria-label="Agoras legal">
          <Link href="/apps/agoras/privacy">Privacy Policy</Link>
          <Link href="/apps/agoras/terms">Terms of Service</Link>
        </nav>
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-3xl flex-1 px-6 py-10"
      >
        {children}
      </main>
      <footer className="flex w-full flex-wrap gap-4 border-t border-neutral-200 px-6 py-4 text-sm">
        <Link href="/apps/agoras/privacy">Privacy Policy</Link>
        <Link href="/apps/agoras/terms">Terms of Service</Link>
        <a href="https://agoras.luisalejandro.org">Documentation</a>
      </footer>
    </div>
  );
}
