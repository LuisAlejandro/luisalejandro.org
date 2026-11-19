import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clamoris Terms of Use",
  alternates: { canonical: "https://luisalejandro.org/apps/clamoris/terms" },
};

export default function ClamorisTermsPage() {
  return (
    <article className="space-y-8 text-neutral-800">
      <header className="space-y-3">
        <h1 className="text-4xl font-light">Clamoris Terms of Use</h1>
        <p>
          Clamoris is a private SEO research tool operated by Luis Alejandro
          Martínez Faneyth. Access is limited to people I authorize for internal
          research. These pages do not grant access to the app.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-light">Authorized use</h2>
        <p>
          Use only accounts and properties you have permission to access. Do not
          share credentials, bypass access controls, or sell or redistribute
          data from the app without permission. Google data remains subject to
          the applicable Google terms, including the{" "}
          <a
            className="underline"
            href="https://developers.google.com/google-ads/api/terms"
          >
            Google Ads API Terms and Conditions
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-light">
          Research results and availability
        </h2>
        <p>
          Search-volume and cost figures are estimates. They do not guarantee
          traffic, ranking, or advertising results. Features may be unavailable
          when a provider changes its API or withdraws access. I may suspend app
          access to protect accounts and data or when these terms are violated.
        </p>
      </section>

      <p>
        See the{" "}
        <Link className="underline" href="/apps/clamoris/privacy">
          Clamoris Privacy Policy
        </Link>{" "}
        for data handling, or{" "}
        <Link className="underline" href="/contact">
          contact me
        </Link>{" "}
        with questions about these terms.
      </p>
      <Link className="underline" href="/apps/clamoris">
        Back to Clamoris
      </Link>
    </article>
  );
}
