export default function AgorasPage() {
  return (
    <article className="space-y-8 text-neutral-800">
      <header className="space-y-3">
        <h1 className="text-4xl font-light">Agoras</h1>
        <p className="text-lg leading-relaxed">
          Agoras is a desktop app for creators. It runs on your computer as a
          command-line tool. Each creator posts their own original content to
          their own accounts. TikTok posting uses Share to TikTok: you
          authorize in the browser, then confirm each post on a localhost
          compose page before anything is uploaded.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-light">Install</h2>
        <p>Install Agoras from PyPI:</p>
        <pre className="overflow-x-auto rounded border border-neutral-200 bg-neutral-50 p-4">
          <code>pip install agoras</code>
        </pre>
        <p>
          Full setup, credentials, and network guides:{" "}
          <a className="underline" href="https://agoras.luisalejandro.org">
            agoras.luisalejandro.org
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-light">Share to TikTok</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            Create a TikTok for Developers app and run{" "}
            <code className="rounded bg-neutral-100 px-1">
              agoras tiktok authorize
            </code>
            . Your browser opens TikTok; the callback is{" "}
            <code className="rounded bg-neutral-100 px-1">
              https://localhost:3456/callback
            </code>
            .
          </li>
          <li>
            Publish with{" "}
            <code className="rounded bg-neutral-100 px-1">
              agoras tiktok video
            </code>{" "}
            or{" "}
            <code className="rounded bg-neutral-100 px-1">
              agoras tiktok post
            </code>
            . Agoras opens a localhost Share-to-TikTok page.
          </li>
          <li>
            Choose who can watch the post, set comments / Duet / Stitch, add
            commercial disclosure if needed, agree to TikTok&apos;s policies,
            and confirm. Upload starts only after that confirm.
          </li>
        </ol>
        <p>
          Media may be a local file path (Agoras 2.2.0 file upload) or a public
          HTTPS URL on a domain you verified with TikTok. Do not put your client
          secret on a public page.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-light">Example</h2>
        <pre className="overflow-x-auto rounded border border-neutral-200 bg-neutral-50 p-4 text-sm">
          <code>{`agoras tiktok video \\
  --video-url "/absolute/path/to/video.mp4" \\
  --title "My video"`}</code>
        </pre>
        <p>
          Interactive runs print a localhost URL for the compose page. Privacy
          is not chosen until you pick it there.
        </p>
      </section>
    </article>
  );
}
