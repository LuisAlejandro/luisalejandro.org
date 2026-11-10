/**
 * The opening panel: ink ground, the monogram and a 0–100% counter that lifts
 * away after 1.2s. Pure CSS, so it also plays without JavaScript; reduced
 * motion removes it entirely.
 */
export function SitePreloader() {
  return (
    <div aria-hidden="true" className="site-preloader">
      <p className="site-preloader__meta site-note">
        <span>Luis Alejandro</span>
        <span>Software engineer</span>
      </p>

      <p className="site-preloader__mark">Luis Alejandro</p>

      <p className="site-preloader__meta site-note">
        <span>Maracay, Venezuela</span>
        <span className="site-preloader__count" />
      </p>
    </div>
  );
}
