import type { Metadata } from "next";

import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";

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
  twitter: { card: "summary", title, description },
};

export default function AgorasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <div className="site-doc site-wrap">{children}</div>
    </SiteShell>
  );
}
