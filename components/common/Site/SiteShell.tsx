import type { ReactNode } from "react";

import { CommandPalette } from "@components/common/Site/CommandPalette";
import { geistMono, geistSans } from "@components/common/Site/fonts";
import { SmoothScroll } from "@components/common/Site/SmoothScroll";

type SiteShellProps = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

export function SiteShell({ children, header, footer }: SiteShellProps) {
  return (
    <div className={`site-shell ${geistSans.variable} ${geistMono.variable}`}>
      <SmoothScroll />
      {header}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      {footer}
      <CommandPalette />
    </div>
  );
}
