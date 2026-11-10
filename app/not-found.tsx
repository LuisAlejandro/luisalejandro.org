import { SiteButton } from "@components/common/Site/SiteButton";
import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";

export default function NotFound() {
  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <section className="site-section site-wrap pb-24 min-h-[70svh]">
        <div className="site-section-head site-note">
          <h2>[404] Not found</h2>
          <div className="text-ink-muted">Nothing at this address</div>
        </div>

        <div className="flex flex-col items-start gap-8">
          <h1 className="site-display">404</h1>
          <p className="site-lead-type max-w-[34ch] text-ink-muted">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <SiteButton href="/" arrow>
              Return home
            </SiteButton>
            <SiteButton href="/blog" variant="ghost">
              Read the blog
            </SiteButton>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
