import type { Metadata } from "next";

import { config } from "@constants/constants";
import { pageMeta } from "@lib/metadata";
import Link from "next/link";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Clamoris Privacy Policy",
    description:
      "How Clamoris, a private SEO research app, handles Google Ads data and account information.",
    path: "/apps/clamoris/privacy",
  }),
  alternates: { canonical: `${config.url}/apps/clamoris/privacy` },
};

export default function ClamorisPrivacyPage() {
  return (
    <article className="space-y-8 text-neutral-800">
      <header className="space-y-3">
        <h1 className="text-4xl font-light">Clamoris Privacy Policy</h1>
        <p>
          I’m Luis Alejandro Martínez Faneyth, the operator of Clamoris. This
          policy describes data handled by the private research app. For the
          public website, see the{" "}
          <Link className="underline" href="/privacy">
            site privacy policy
          </Link>
          .
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-light">
          What the app sends to and receives from Google
        </h2>
        <p>
          For Keyword Planner, Clamoris sends Google Ads a customer ID,
          keywords, and location and language settings. Google can return
          keyword ideas, historical search volumes, and estimates such as
          advertising competition and cost per click. The app authenticates on
          the server with a service account granted access to the configured
          Google Ads account. Clamoris does not ask for a Google Ads password.
        </p>
        <p>
          If other Google integrations are configured, Clamoris can request
          search performance from authorized Search Console properties, reports
          from authorized Google Analytics properties, public place information
          from Google Places, and page performance measurements from PageSpeed
          Insights and the Chrome UX Report. Requests send Google the details
          needed for the report, such as a property ID, page URL, or place
          query.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-light">
          How the app uses and stores data
        </h2>
        <p>
          Clamoris uses the data to answer research requests, show results, and
          maintain internal project records. The app can cache responses and
          save selected metrics or reports in its project database so they can
          be compared over time. Saved records can remain until they or their
          project are deleted. Google credentials are kept on the server and are
          not displayed in reports.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-light">Who can access the data</h2>
        <p>
          Clamoris is restricted to authorized users. I do not sell data
          obtained from Google APIs or use it for ad targeting. Clamoris’s use
          of information from Google APIs follows the{" "}
          <a
            className="underline"
            href="https://developers.google.com/terms/api-services-user-data-policy"
          >
            Google API Services User Data Policy
          </a>
          , including its Limited Use requirements where applicable.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-light">
          Remove access or request deletion
        </h2>
        <p>
          An account administrator can stop future requests by removing the
          app’s access in the relevant Google service. Removing access does not
          delete records already saved in Clamoris.{" "}
          <Link className="underline" href="/contact">
            Contact me
          </Link>{" "}
          to ask what information Clamoris holds or to request correction or
          deletion.
        </p>
      </section>

      <Link className="underline" href="/apps/clamoris">
        Back to Clamoris
      </Link>
    </article>
  );
}
