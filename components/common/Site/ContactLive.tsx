"use client";

import { useEffect, useState } from "react";

/** Copies the address and says so for a moment, for sight and for readers. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <>
      <button
        type="button"
        className="site-contact-copy site-note"
        aria-label="Copy email address"
        onClick={() =>
          navigator.clipboard
            ?.writeText(email)
            .then(() => setCopied(true))
            .catch(() => {})
        }
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied." : ""}
      </span>
    </>
  );
}

const ZONE = "America/Caracas";
// ponytail: fixed desk hours; move to config if they ever change by season.
const DESK = { from: 9, to: 18 };

/** The time in Maracay, and whether that is inside desk hours, Mon–Fri. */
function readClock(now: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: ZONE,
      hour: "2-digit",
      minute: "2-digit",
      weekday: "short",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((part) => [part.type, part.value])
  );
  const hour = Number(parts.hour);
  const weekday = !["Sat", "Sun"].includes(parts.weekday);
  return {
    time: `${parts.hour}:${parts.minute}`,
    on: weekday && hour >= DESK.from && hour < DESK.to,
  };
}

/**
 * Server output is the static zone; the live clock takes over after mount, so
 * the first paint never disagrees with the server.
 */
export function LocalTime() {
  const [clock, setClock] = useState<ReturnType<typeof readClock> | null>(null);

  useEffect(() => {
    const tick = () => setClock(readClock(new Date()));
    const first = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 30_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <>
      <span
        className="site-contact-live"
        data-on={clock?.on ?? false}
        aria-hidden="true"
      />
      <span>
        {clock
          ? `${clock.time} UTC−4 · ${clock.on ? "at the desk" : "off"}`
          : "Maracay · UTC−4"}
      </span>
    </>
  );
}
