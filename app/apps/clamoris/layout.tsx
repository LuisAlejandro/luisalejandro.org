import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";

export default function ClamorisLayout({
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
