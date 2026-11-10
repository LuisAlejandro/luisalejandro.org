import Link from "next/link";

import { SiteButton } from "@components/common/Site/SiteButton";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";
import { contactAction } from "@constants/siteNavigation";

export default function NotFound() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <div className="px-gutter py-24 lg:py-36 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <span className="site-note text-signal mb-4">Error 404</span>
        <h1 className="text-step-5 font-medium tracking-tight text-ink mb-6">
          404
        </h1>
        <p className="text-step-1 text-ink-muted max-w-md mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <SiteButton href="/" arrow>
            Return Home
          </SiteButton>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-4 py-2.5 text-step-0 font-medium text-ink-muted hover:text-ink transition-colors"
          >
            Read the Blog
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
