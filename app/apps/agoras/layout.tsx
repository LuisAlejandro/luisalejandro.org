import type { Metadata } from "next";

import { config } from "@constants/constants";
import { pageMeta } from "@lib/metadata";

import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";

const title = "Agoras — a desktop app for creators";
const description =
  "Agoras is a desktop command-line app for creators. Authorize in the browser, then Share to TikTok from a localhost compose page before anything is uploaded.";

export const metadata: Metadata = {
  ...pageMeta({ title, description, path: "/apps/agoras" }),
  alternates: { canonical: `${config.url}/apps/agoras` },
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
