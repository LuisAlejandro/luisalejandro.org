import { SiteMark } from "@components/common/Site/SiteMark";

/**
 * The opening panel: ink ground, the face mark plotting itself and a 0–100%
 * counter, lifting away after 1.2s. Pure CSS, so it also plays without
 * JavaScript; reduced motion removes it entirely.
 */
export function SitePreloader() {
  return (
    <div aria-hidden="true" className="site-preloader">
      <p className="site-preloader__meta site-note">
        <span>Luis Alejandro</span>
        <span>Fullstack AI engineer</span>
      </p>

      <div className="site-preloader__mark">
        <SiteMark />
      </div>

      <p className="site-preloader__meta site-note">
        <span>Maracay, Venezuela</span>
        <span className="site-preloader__count" />
      </p>
    </div>
  );
}
