"use client";

import Hero from "@components/Apps/Hero/Hero";
import { Section } from "@components/common/Layout/Section";
import Contact from "@components/Portfolio/Contact/Contact";
import Footer from "@components/Portfolio/Footer/Footer";
import Header from "@components/Portfolio/Header/Header";

export default function AgorasPage() {
  return (
    <div className="w-full mx-auto">
      <Header />
      <main>
        <style jsx global>{`
          h1 {
            font-weight: 200;
            font-size: 2.5em;
            margin: 40px auto;
            width: 100%;
            _max-width: 94%;
          }

          .termspriv {
            h2 {
              font-weight: 200;
              font-size: 1.5em;
              margin: 20px auto;
              width: 100%;
              _max-width: 94%;
            }

            h3 {
              font-weight: 200;
              font-size: 1.1em;
              margin: 20px auto;
              width: 100%;
              _max-width: 94%;
            }

            h4 {
              font-weight: 200;
              font-size: 1em;
              margin: 10px auto;
              width: 100%;
              _max-width: 94%;
            }

            p,
            li {
              font-size: 1em;
              line-height: 1.4em;
              font-weight: 200;
              margin: 5px auto;
              width: 100%;
              _max-width: 94%;
            }

            pre {
              background-color: #f5f5f5;
              border: 1px solid #ddd;
              border-radius: 4px;
              padding: 15px;
              overflow-x: auto;
              margin: 20px auto;
              width: 100%;
              max-width: 94%;
            }

            code {
              font-family: monospace;
              background-color: #f5f5f5;
              padding: 2px 4px;
              border-radius: 3px;
              font-size: 0.9em;
            }

            pre code {
              background-color: transparent;
              padding: 0;
            }

            ul,
            ol {
              margin: 15px auto;
              width: 100%;
              max-width: 94%;
            }

            li {
              margin: 5px 0;
            }

            table {
              width: 100%;
              max-width: 94%;
              margin: 20px auto;
              border-collapse: collapse;
            }

            table th,
            table td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }

            table th {
              background-color: #f5f5f5;
              font-weight: 400;
            }

            .note {
              background-color: #e7f3ff;
              border-left: 4px solid #2196f3;
              padding: 15px;
              margin: 20px auto;
              width: 100%;
              max-width: 94%;
            }

            .note strong {
              display: block;
              margin-bottom: 5px;
            }
          }
        `}</style>
        <Section overflowVisible>
          <Hero />
          <div className="termspriv">
            <h1>Usage for TikTok</h1>

            <p>
              TikTok is a short-form video social platform that allows users to
              create and share videos with various effects, filters, and music.
              Agoras can publish videos, photo slideshows, and schedule content
              on TikTok using the official{" "}
              <a
                href="https://developers.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok for Developers API
              </a>
              .
            </p>

            <p>
              <strong>Important</strong>: TikTok requires OAuth 2.0
              authentication and app approval. You must first create a TikTok
              for Developers app and get it approved before using these
              features. Like, share, and delete actions are not supported by the
              TikTok API.
            </p>

            <h2>Actions</h2>

            <ul>
              <li>
                <code>authorize</code> - Set up OAuth 2.0 authentication
                (required first step)
              </li>
              <li>
                <code>video</code> - Upload videos to TikTok
              </li>
              <li>
                <code>post</code> - Create photo slideshow posts
              </li>
            </ul>

            <h2>Authorization</h2>

            <p>
              <em>New in version 2.0</em>: OAuth 2.0 &quot;authorize first&quot;
              workflow
            </p>

            <p>
              Before you can publish content to TikTok, you must authorize
              Agoras to access your TikTok account. This is a one-time setup
              process that uses OAuth 2.0 authentication. You&apos;ll need your
              TikTok developer app credentials (read about how to get
              credentials <a href="/apps/agoras/credentials/tiktok">here</a>).
            </p>

            <pre>
              <code>
                {`agoras tiktok authorize \\
  --client-key "${"${"}TIKTOK_CLIENT_KEY}" \\
  --client-secret "${"${"}TIKTOK_CLIENT_SECRET}" \\
  --username "${"${"}TIKTOK_USERNAME}"`}
              </code>
            </pre>

            <p>This will:</p>

            <ol>
              <li>
                Open your browser to TikTok&apos;s OAuth authorization page
              </li>
              <li>Prompt you to grant permissions to Agoras</li>
              <li>Automatically capture the authorization code</li>
              <li>
                Store encrypted credentials in <code>~/.agoras/tokens/</code>
              </li>
            </ol>

            <p>
              After successful authorization, your refresh token will be stored
              locally and used for future requests. Credentials are
              automatically refreshed when needed.
            </p>

            <p>
              For CI/CD environments, see{" "}
              <a href="/apps/agoras/credentials/tiktok">credentials/tiktok</a>{" "}
              for unattended execution setup.
            </p>

            <h2>Publish a TikTok video</h2>

            <p>
              This command will upload and publish a video to TikTok.{" "}
              <code>--title</code> is required and will be the video&apos;s
              caption. <code>--video-url</code> must point to a downloadable
              video file in MP4, MOV, or WebM format.
            </p>

            <div className="note">
              <strong>Note:</strong> You must run{" "}
              <code>agoras tiktok authorize</code> first before using this
              command.
            </div>

            <p>
              <strong>New format</strong>:
            </p>

            <pre>
              <code>
                {`agoras tiktok video \\
  --username "${"${"}TIKTOK_USERNAME}" \\
  --video-url "${"${"}TIKTOK_VIDEO_URL}" \\
  --title "${"${"}TIKTOK_TITLE}" \\
  --privacy-status "${"${"}TIKTOK_PRIVACY_STATUS}"`}
              </code>
            </pre>

            <p>Optional parameters for video posts:</p>

            <ul>
              <li>
                <code>--allow-comments</code>: Allow comments on the video
                (default: true)
              </li>
              <li>
                <code>--allow-duet</code>: Allow other users to duet with your
                video (default: true)
              </li>
              <li>
                <code>--allow-stitch</code>: Allow other users to stitch your
                video (default: true)
              </li>
              <li>
                <code>--brand-organic</code>: Mark content as promotional
                (displays &quot;Promotional content&quot; label)
              </li>
              <li>
                <code>--brand-content</code>: Mark content as paid partnership
                (displays &quot;Paid partnership&quot; label)
              </li>
            </ul>

            <p>Privacy status options:</p>

            <ul>
              <li>
                <code>PUBLIC_TO_EVERYONE</code>: Public to everyone
              </li>
              <li>
                <code>MUTUAL_FOLLOW_FRIENDS</code>: Friends only
              </li>
              <li>
                <code>FOLLOWER_OF_CREATOR</code>: Followers only
              </li>
              <li>
                <code>SELF_ONLY</code>: Private (only you can see it)
              </li>
            </ul>

            <h2>Publish a TikTok photo slideshow</h2>

            <p>
              This command will create a photo slideshow post on TikTok. You can
              include up to 4 images using the <code>--image-X</code>{" "}
              parameters. TikTok will automatically add music to photo posts.
            </p>

            <div className="note">
              <strong>Note:</strong> You must run{" "}
              <code>agoras tiktok authorize</code> first before using this
              command.
            </div>

            <p>
              <strong>New format</strong>:
            </p>

            <pre>
              <code>
                {`agoras tiktok post \\
  --username "${"${"}TIKTOK_USERNAME}" \\
  --title "${"${"}TIKTOK_TITLE}" \\
  --image-1 "${"${"}IMAGE_URL_1}" \\
  --image-2 "${"${"}IMAGE_URL_2}" \\
  --image-3 "${"${"}IMAGE_URL_3}" \\
  --image-4 "${"${"}IMAGE_URL_4}" \\
  --privacy-status "${"${"}TIKTOK_PRIVACY_STATUS}"`}
              </code>
            </pre>

            <p>Optional parameters for photo posts:</p>

            <ul>
              <li>
                <code>--allow-comments</code>: Allow comments on the post
                (default: true)
              </li>
              <li>
                <code>--auto-add-music</code>: Automatically add music to the
                slideshow (default: false)
              </li>
              <li>
                <code>--brand-organic</code>: Mark content as promotional
              </li>
              <li>
                <code>--brand-content</code>: Mark content as paid partnership
              </li>
            </ul>

            <p>
              <strong>Note</strong>: Duet and stitch options are not available
              for photo posts.
            </p>

            <h2>Brand Content and Promotional Content</h2>

            <p>TikTok requires proper labeling of commercial content:</p>

            <p>
              <strong>Promotional Content</strong> (<code>--brand-organic</code>
              ):
            </p>
            <ul>
              <li>Use when featuring your own products/services</li>
              <li>Displays &quot;Promotional content&quot; label</li>
              <li>
                Requires agreement to TikTok&apos;s Music Usage Confirmation
              </li>
            </ul>

            <p>
              <strong>Paid Partnership</strong> (<code>--brand-content</code>):
            </p>
            <ul>
              <li>Use when content is sponsored by another brand</li>
              <li>Displays &quot;Paid partnership&quot; label</li>
              <li>
                Requires agreement to TikTok&apos;s Branded Content Policy and
                Music Usage Confirmation
              </li>
            </ul>

            <p>
              <strong>Combined</strong> (both flags):
            </p>
            <ul>
              <li>Displays &quot;Paid partnership&quot; label</li>
              <li>Requires agreement to both policies</li>
            </ul>

            <p>
              <strong>Important</strong>: You cannot use{" "}
              <code>--brand-content</code> with{" "}
              <code>--privacy-status SELF_ONLY</code> (private posts).
            </p>

            <h2>Limitations</h2>

            <ul>
              <li>
                <strong>File formats</strong>: Videos must be MP4, MOV, or WebM.
                Images must be JPEG or PNG.
              </li>
              <li>
                <strong>Video duration</strong>: Limited by your account&apos;s
                maximum video duration (varies by account type)
              </li>
              <li>
                <strong>No direct interactions</strong>: Like, share, and delete
                actions are not supported by the TikTok API
              </li>
              <li>
                <strong>OAuth required</strong>: All actions require going
                through the OAuth authorization flow
              </li>
              <li>
                <strong>App approval</strong>: Your TikTok developer app must be
                approved for production use
              </li>
            </ul>

            <h2>Getting your post ID</h2>

            <p>
              When you create a TikTok post with Agoras, it will print the
              publish ID (in JSON format) in the console:
            </p>

            <pre>
              <code>
                {`$ agoras tiktok video \\
      --username myusername \\
      --video-url "https://example.com/video.mp4" \\
      --title "My awesome video"
$ {"id":"NNNNNNNNNNN"}`}
              </code>
            </pre>

            <p>
              <code>NNNNNNNNNNN</code> is the publish ID that can be used to
              track the post status.
            </p>
          </div>
        </Section>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
