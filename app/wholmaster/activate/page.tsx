"use client";

import { useState } from "react";

import { SiteFooter } from "@components/common/Site/SiteFooter";
import { SiteHeader } from "@components/common/Site/SiteHeader";
import { SiteShell } from "@components/common/Site/SiteShell";

/**
 * Offline activation page. The operator copies the request code from the desktop app (which has no
 * internet), submits it here from a device that does, and pastes the returned certificate back into
 * the app. Nothing here holds a secret: the certificate is signed server-side.
 */
export default function ActivatePage() {
  const [requestCode, setRequestCode] = useState("");
  const [responseCode, setResponseCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setError("");
    setResponseCode("");
    setBusy(true);
    try {
      let parsed: {
        key?: string;
        fp?: string[];
        label?: string;
        user?: string;
      };
      try {
        const normalized = requestCode
          .trim()
          .replace(/-/g, "+")
          .replace(/_/g, "/");
        parsed = JSON.parse(atob(normalized));
      } catch {
        setError(
          "That request code could not be read. Copy it again from the app."
        );
        return;
      }
      if (!parsed.key || !Array.isArray(parsed.fp)) {
        setError("That request code is incomplete.");
        return;
      }
      const response = await fetch("/api/wholmaster/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: parsed.key,
          fp: parsed.fp,
          label: parsed.label ?? "",
          user: parsed.user ?? "",
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(
          data.code === "seats_exhausted"
            ? "All seats for this license are in use. Release a computer first."
            : data.code === "not_active"
              ? "This license is no longer active."
              : data.code === "legacy_not_eligible"
                ? "This old license cannot be converted. Contact support."
                : "Activation was refused. Check the code and try again."
        );
        return;
      }
      setResponseCode(data.certificate ?? "");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteShell header={<SiteHeader />} footer={<SiteFooter />}>
      <section className="site-doc site-wrap">
        <h1 className="site-h2">Activate Wholmaster offline</h1>
        <p className="site-lead-type">
          On the computer running Wholmaster, choose Activate offline and copy
          the request code. Paste it below, then copy the response code back
          into the app.
        </p>

        <label className="site-note mt-10 block" htmlFor="request-code">
          Request code
        </label>
        <textarea
          id="request-code"
          className="site-doc__code"
          rows={4}
          value={requestCode}
          onChange={(event) => setRequestCode(event.target.value)}
        />

        <button
          type="button"
          className="site-btn mt-8"
          onClick={submit}
          disabled={busy || requestCode.trim() === ""}
        >
          {busy ? "Activating…" : "Activate"}
        </button>

        {error ? (
          <p className="site-contact-form__error" role="alert">
            {error}
          </p>
        ) : null}

        {responseCode ? (
          <>
            <label className="site-note mt-8 block" htmlFor="response-code">
              Response code — paste this into the app
            </label>
            <textarea
              id="response-code"
              className="site-doc__code"
              rows={4}
              readOnly
              value={responseCode}
            />
          </>
        ) : null}
      </section>
    </SiteShell>
  );
}
