import Image from "next/image";

/** Full-width band for the study's hero image. */
export function CaseStudyHero({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="site-wrap">
      <figure className="site-case-hero">
        <Image src={src} alt={alt} fill sizes="100vw" priority />
      </figure>
    </div>
  );
}

/**
 * Product clip. Muted autoplay matches how these were already shown; controls
 * stay available so anyone can stop it.
 */
export function CaseStudyVideo({ src, label }: { src: string; label: string }) {
  return (
    <figure className="site-case-video">
      <video
        aria-label={label}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        controls
      >
        <source src={src} type="video/mp4" />
      </video>
      <figcaption className="site-note text-ink-muted">{label}</figcaption>
    </figure>
  );
}

/** Static captioned gallery — the same choice made for blog figures. */
export function CaseStudyGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  return (
    <ul className="site-case-gallery" role="list">
      {images.map((src, index) => (
        <li key={src}>
          <figure>
            <div className="site-case-figure__frame">
              <Image
                src={src}
                alt={`${name} — screenshot ${index + 1}`}
                width={1080}
                height={800}
                sizes="(max-width: 767px) 90vw, 30vw"
              />
            </div>
          </figure>
        </li>
      ))}
    </ul>
  );
}

type BarPoint = { label: string; value: number };

/**
 * Replaces the old canvas charts. The numbers are already stated in the prose,
 * so this only has to show the comparison: real text, no chart runtime.
 */
export function CaseStudyBars({
  title,
  unit,
  points,
}: {
  title: string;
  unit: string;
  points: BarPoint[];
}) {
  const max = Math.max(...points.map((point) => point.value));

  return (
    <figure className="site-case-bars">
      <figcaption className="site-note">
        {title} <span className="text-ink-muted">({unit})</span>
      </figcaption>
      <ul role="list">
        {points.map((point) => (
          <li key={point.label}>
            <span className="site-case-bars__label">{point.label}</span>
            <span
              className="site-case-bars__track"
              aria-hidden="true"
              style={{ ["--bar" as string]: `${(point.value / max) * 100}%` }}
            >
              <span className="site-case-bars__fill" />
            </span>
            <span className="site-case-bars__value">{point.value}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
