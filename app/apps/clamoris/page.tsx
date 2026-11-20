import type { Metadata } from "next";

import { config } from "@constants/constants";
import { pageMeta } from "@lib/metadata";
import Link from "next/link";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Clamoris by LuisAlejandro",
    description:
      "A private SEO research tool operated by Luis Alejandro Martínez Faneyth.",
    path: "/apps/clamoris",
  }),
  alternates: { canonical: `${config.url}/apps/clamoris` },
};

export default function ClamorisPage() {
  return (
    <article className="space-y-8 text-neutral-800">
      <header className="space-y-3">
        <h1 className="text-4xl font-light">Clamoris by LuisAlejandro</h1>
        <p className="text-lg leading-relaxed">
          Clamoris is a private tool I use to research how websites appear in
          search results. I’m Luis Alejandro Martínez Faneyth, and I operate the
          app. There is no public sign-up.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-light">How Clamoris uses Google Ads</h2>
        <p>
          The Google Ads integration is designed to use Keyword Planner for
          keyword ideas and historical search-volume estimates. I use that data
          to compare search demand and decide which topics to research. The
          integration does not create or change ads, campaigns, bids, or
          budgets.
        </p>
      </section>

      <nav
        aria-label="Clamoris policies"
        className="flex flex-wrap gap-x-6 gap-y-2"
      >
        <Link className="underline" href="/apps/clamoris/privacy">
          Privacy policy
        </Link>
        <Link className="underline" href="/apps/clamoris/terms">
          Terms of use
        </Link>
        <Link className="underline" href="/contact">
          Contact Luis Alejandro
        </Link>
      </nav>
    </article>
  );
}
